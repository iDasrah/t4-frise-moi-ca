import {GamesState} from "../types";
import * as user from './user';

export function activate(code: string, maxPlayers: number, minPoints: number) {
    const game = {
        code,
        maxPlayers,
        minPoints,
        hasStarted: false
    };
    GamesState.setGames([
        ...GamesState.games.filter(game => game.code !== code),
        game
    ]);
    return game;
}

export function canActivate(code: string) {
    return GamesState.games.find(game => game.code === code) === undefined;
}

export function canBeJoined(code: string) {
    return GamesState.games.find(game => game.code === code && !game.hasStarted && user.getAllInGame(code).length < game.maxPlayers) !== undefined;
}

export function getAll() {
    return GamesState.games;
}

export function getOne(code: string) {
    return GamesState.games.find(game => game.code === code);
}

export function deleteOne(code: string) {
    GamesState.setGames(GamesState.games.filter(game => game.code !== code));
}

export function start(code: string) {
    const game = getOne(code);
    if (game) {
        game.hasStarted = true;
        GamesState.setGames([...GamesState.games.filter(g => g.code !== code), game]);
    }
}

export function getActiveUser(code: string) {
    const game = getOne(code);
    if (game) {
        return user.getAllInGame(code).find(user => user.isActive);
    }
}

export function setNextActiveUser(code: string) {
    const game = getOne(code);
    if (game) {
        const users = user.getAllInGame(code);
        for (let i = 0; i < users.length; i++) {
            if (users[i].isActive) {
                user.updateOne(users[i].id, {isActive: false});
                user.updateOne(users[(i + 1) % users.length].id, {isActive: true});
                return user.getOne(users[(i + 1) % users.length].id);
            }
        }
    }
}

export function isGameEnded(code: string) {
    const game = getOne(code);
    if (game) {
        return game.hasStarted && user.getAllInGame(code).find(user => user.points >= game.minPoints) !== undefined;
    }
    return false;
}

export function getPodium(code: string) {
    const game = getOne(code);
    if (game) {
        const users = user.getAllInGame(code);
        return users.sort((a, b) => b.points - a.points).slice(0, 3).map(user => ({
            name: user.name,
            points: user.points
        }));
    }
    return null;
}