import {useState} from "react";
import * as React from "react";

const CreateGame = () => {
    const [username, setUsername] = useState('');
    const [nbPlayers, setNbPlayers] = useState(0);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const gameData = {
            username: username,
            nb_players: nbPlayers
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
                <label htmlFor="nb_players">Nombre de joueurs maximum</label>
                <input className="input-field" type="number" name="nb_players" id="nb_players"
                       value={nbPlayers}
                       onChange={(e) => setNbPlayers(Number(e.target.value))}
                       min={2}
                       max={10}
                />
                <button className="btn btn-primary" type="submit">Créer une partie</button>
            </form>
        </>
    )
}
export default CreateGame
