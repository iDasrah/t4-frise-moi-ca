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

export type PlayerData = {
    name: string;
}