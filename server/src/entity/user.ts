import {UsersState} from "../types";
import * as game from './game';

export function activate(id: string, name: string, gameCode: string, isHost: boolean = false) {
    const user = {
        id,
        name,
        gameCode,
        isHost,
        isActive: isHost,
        points: 0
    };
    UsersState.setUsers([
        ...UsersState.users.filter(user => user.id !== id),
        user
    ]);
    return user;
}

export function canActivate(id: string) {
    if (getOne(id)) return false;
}

export function leave(id: string) {
    UsersState.setUsers(UsersState.users.filter(user => user.id !== id));
}

export function getOne(id: string) {
    return UsersState.users.find(user => user.id === id);
}

export function getAllInGame(gameCode: string) {
    return UsersState.users.filter(user => user.gameCode === gameCode);
}

export function getAll() {
    return UsersState.users;
}

export function updateOne(id: string, data: Partial<{ name: string, isHost: boolean, isActive: boolean, points: number }>) {
    UsersState.setUsers(UsersState.users.map(user => {
        if (user.id === id) {
            return {
                ...user,
                ...data
            };
        }
        return user;
    }));
}

export function getGame(id: string) {
    const user = getOne(id);
    if (user) {
        return game.getOne(user.gameCode);
    }
    return null;
}