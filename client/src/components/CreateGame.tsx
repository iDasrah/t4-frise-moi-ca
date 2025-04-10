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
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 justify-center text-white">
                <label htmlFor="username">Entre ton nom</label>
                <input className="" type="text" name="username" id="username"
                       value={username}
                       onChange={(e) => setUsername(e.target.value)}
                       placeholder="Ton p'tit nom" />
                <label htmlFor="nb_players">Nombre de joueurs maximum</label>
                <input className="" type="number" name="nb_players" id="nb_players"
                       value={nbPlayers}
                       onChange={(e) => setNbPlayers(Number(e.target.value))}
                       placeholder="Nombre de joueurs maximum" />
                <button className="btn btn-primary" type="submit">Créer une partie</button>
            </form>
        </>
    )
}
export default CreateGame
