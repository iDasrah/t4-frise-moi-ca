import {GamesState} from "../types";
import * as user from './user';

export function activate(code: string, maxPlayers: number) {
    const game = {
        code,
        maxPlayers,
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