export type CardData = {
    title: string;
    type: string;
    thematic: string;
    description: string;
    date: string;
}

export enum CardSide {
    FRONT = 'front',
    BACK = 'back',
}

export type User = {
    id: string;
    name: string;
    gameCode: string;
    isHost: boolean;
    points: number;
}

export type Game = {
    code: string;
    hasStarted: boolean;
    maxPlayers: number;
}

export type PlayerData = {
    name: string;
}