import express, { Request, Response, NextFunction } from 'express';
import {HttpError} from "./error";
import { StructError } from 'superstruct';
import cors from 'cors';
import { Server } from "socket.io"
import * as user from './entity/user';
import * as game from './entity/game';

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

app.use((err: HttpError|StructError, req: Request, res: Response, next: NextFunction) => {
  res.status(err.status ?? 500).send();
});

const server = app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

const io = new Server(server, {
    cors: {
        origin: '*'
    }
})

io.on('connection', socket => {
  console.log(`User ${socket.id} connected`)

  socket.on('joinGame', ({ username, gameCode }: { username: string, gameCode: string }) => {
    const existingUser = user.getOne(socket.id);
    if (existingUser && existingUser.gameCode !== gameCode) {
      socket.emit('joinGame', {
        error: true,
        message: 'You are already in a game. Leave it first'
      });
      return;
    } else if (existingUser?.gameCode === gameCode) {
      socket.emit('joinGame', {
        error: true,
        message: 'You are already in this game'
      });
      return;
    }

    if (!game.getOne(gameCode)) {
      socket.emit('joinGame', {
        error: true,
        message: 'Game does not exist'
      });
      return;
    }
    if (!game.canBeJoined(gameCode)) {
      socket.emit('joinGame', {
        error: true,
        message: 'Game is full or has already started'
      });
      return;
    }
    user.activate(socket.id, username, gameCode);
    socket.join(gameCode);
    socket.emit('joinGame', {
      error: false,
      gameCode
    });
    socket.to(gameCode).emit('newUser', {
      error: false,
      message: `${username} has joined the game`
    });
    io.to(gameCode).emit('usersInGame', user.getAllInGame(gameCode));
  })

  socket.on('createGame', ({ username, maxPlayers }: { username: string, maxPlayers: number }) => {
    let gameCode: string;

    while (true) {
      gameCode = Math.random().toString(36).substring(2, 8).toUpperCase();

      if (game.canActivate(gameCode)) {
        break;
      }
    }

    if (maxPlayers > 10) {
      socket.emit('createGame', {
        error: true,
        message: 'Too many users. Maximum is 10'
      });
      return;
    }
    if (maxPlayers < 2) {
      socket.emit('createGame', {
        error: true,
        message: 'Too few users. Minimum is 2'
      });
      return;
    }
    game.activate(gameCode, maxPlayers);
    user.activate(socket.id, username, gameCode, true);
    socket.join(gameCode);
    io.to(gameCode).emit('createGame', {
      error: false,
      gameCode
    });
  })

  socket.on('startGame', () => {
    const existingUser = user.getOne(socket.id);
    if (!existingUser) return;

    if (!existingUser.isHost) {
      socket.emit('startGame', {
        error: true,
        message: 'You are not the host'
      });
      return;
    }

    if (user.getAllInGame(existingUser.gameCode).length < 2) {
      socket.emit('startGame', {
        error: true,
        message: 'Not enough players'
      });
      return;
    }

    if (game.getOne(existingUser.gameCode)?.hasStarted) {
      socket.emit('startGame', {
        error: true,
        message: 'Game has already started'
      });
      return;
    }
    game.start(existingUser.gameCode);

    io.to(existingUser.gameCode).emit('startGame', {
      error: false,
      message: 'Game has started'
    });
  })

  socket.on('usersInGame', () => {
    const existingUser = user.getOne(socket.id);
    if (!existingUser) return;

    socket.emit('usersInGame', user.getAllInGame(existingUser.gameCode));
  })

  socket.on('game', () => {
    const existingGame = user.getGame(socket.id);
    if (!existingGame) return;

    socket.emit('game', existingGame);
  })

  socket.on('user', () => {
    const existingUser = user.getOne(socket.id);
    if (!existingUser) return;

    socket.emit('user', existingUser);
  })

  socket.on('disconnect', () => {
    const existingUser = user.getOne(socket.id);

    if (!existingUser) return;

    user.leave(socket.id);
    socket.leave(existingUser.gameCode);

    if (user.getAllInGame(existingUser.gameCode).length === 0) {
      game.deleteOne(existingUser.gameCode);
      return;
    }

    io.to(existingUser.gameCode).emit('message', `${existingUser.name} has left the game`);

    if (existingUser.isHost) {
      const newHost = user.getAllInGame(existingUser.gameCode).find(user => user.id !== existingUser.id);
      if (newHost) {
        user.updateOne(newHost.id, { isHost: true });
        io.to(existingUser.gameCode).emit('message', `${newHost.name} is now the host`);
      }
    }

    io.to(existingUser.gameCode).emit('usersInGame', user.getAllInGame(existingUser.gameCode))

    console.log(`User ${socket.id} disconnected`)
  })
})