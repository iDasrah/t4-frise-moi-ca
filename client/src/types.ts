export type CardData = {
    id: number;
    title: string;
    type: string;
    thematic: string;
    description: string;
    textDate: string;
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
    isActive: boolean;
    points: number;
}

export type Game = {
    code: string;
    hasStarted: boolean;
    maxPlayers: number;
    minPoints: number;
}

export type PlayerData = {
    points: number;
    name: string;
    card?: Omit<CardData, "date"> | null;
}