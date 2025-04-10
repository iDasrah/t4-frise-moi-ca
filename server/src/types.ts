export type User = {
    id: string;
    name: string;
    gameCode: string;
    isHost: boolean;
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
}