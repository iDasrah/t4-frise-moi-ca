import {useState} from "react";
import * as React from "react";

const JoinGame = () => {
    const [username, setUsername] = useState('')
    const [gameId, setGameId] = useState('')

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const gameData = {
            username: username,
            gameId: gameId
        };

        console.log(gameData);
    }

    return (
        <>
            <form onSubmit={handleSubmit} className="game-form">
                <h2 className="text-2xl font-bold">Créer une partie</h2>
                <label htmlFor="username">Entre ton nom</label>
                <input className="input-field" type="text" name="username" id="username"
                       value={username}
                       onChange={(e) => setUsername(e.target.value)}
                       placeholder="Ton p'tit nom"
                />
                <label htmlFor="nb_players">Code de la partie</label>
                <input className="input-field" type="text" name="gameId" id="gameId"
                       value={gameId}
                       onChange={(e) => setGameId(e.target.value)}
                       min={2}
                       max={10}
                />
                <button className="btn btn-primary" type="submit">Rejoindre une partie</button>
            </form>
        </>
    )
}
export default JoinGame
