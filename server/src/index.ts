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

const io = new Server(server)

io.on('connection', socket => {
  console.log(`User ${socket.id} connected`)

  socket.on('joinGame', ({ name, gameCode }: { name: string, gameCode: string }) => {
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
    user.activate(socket.id, name, gameCode);
    socket.join(gameCode);
    socket.to(gameCode).emit('joinGame', {
      error: false,
      message: `${name} has joined the game`
    });
    io.to(gameCode).emit('usersInGame', {
        users: user.getAllInGame(gameCode)
    });
  })

  socket.on('createGame', ({ name, gameCode, maxPlayers }: { name: string, gameCode: string, maxPlayers: number }) => {
    if (!game.canActivate(gameCode)) {
      socket.emit('createGame', {
        error: true,
        message: 'Game already exists'
      });
      return;
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
    user.activate(socket.id, name, gameCode, true);
    socket.join(gameCode);
    socket.to(gameCode).emit('createGame', {
      error: false,
      message: 'Game created successfully'
    });
    io.to(gameCode).emit('usersInGame', {
      users: user.getAllInGame(gameCode)
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

    io.to(existingUser.gameCode).emit('usersInGame', {
      users: user.getAllInGame(existingUser.gameCode)
    })

    console.log(`User ${socket.id} disconnected`)
  })
})