export type User = {
    id: string;
    name: string;
    gameCode: string;
    isHost: boolean;
    isActive: boolean;
    points: number;
}

export const UsersState = {
    users: [] as User[],
    setUsers: function (newUsers: User[]) {
        this.users = newUsers;
    }
}

export const GamesState = {
    games: [] as Game[],
    setGames: function (newGames: Game[]) {
        this.games = newGames;
    }
}

export type Game = {
    code: string;
    hasStarted: boolean;
    maxPlayers: number;
    minPoints: number;
}

export type Card = {
    id: number;
    title: string;
    type: string;
    thematic: string;
    description: string;
    textDate: string;
    dates: Date[];
}

export const CardsState = {
    cards: [] as Card[],
    setCards: function (newCards: Card[]) {
        this.cards = newCards;
    }
}

export type GameUtils = {
    gameCode: string;
    deck: Card[];
    timeline: Card[];
    activeCard: Card|null;
}

export const GamesUtilsState = {
    gamesUtils: [] as GameUtils[],
    setGamesUtils: function (newGamesUtils: GameUtils[]) {
        this.gamesUtils = newGamesUtils;
    }
}