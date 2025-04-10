import {FormEvent, useEffect, useState} from "react";
import {socket} from "../socket.ts";
import {useNavigate} from "react-router";

const JoinGame = () => {
    const [username, setUsername] = useState('')
    const [gameCode, setGameCode] = useState('')
    const navigate = useNavigate();

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        socket.emit('joinGame', {
            username,
            gameCode
        });
    }

    useEffect(() => {
            socket.on('joinGame', (data) => {
                if (data.error) {
                    alert(data.message);
                    return;
                }
                navigate(`/waiting-room/${data.gameCode}`);
            })

            return () => {
                socket.off('joinGame');
            };
        }
    );

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
                       value={gameCode}
                       onChange={(e) => setGameCode(e.target.value)}
                       min={2}
                       max={10}
                />
                <button className="btn btn-primary" type="submit">Rejoindre une partie</button>
            </form>
        </>
    )
}
export default JoinGame
