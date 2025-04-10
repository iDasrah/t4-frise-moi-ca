import {useEffect, useState} from "react";
import * as React from "react";
import {socket} from "../socket.ts";
import {useNavigate} from "react-router";

const CreateGame = () => {
    const [username, setUsername] = useState('');
    const [maxPlayers, setMaxPlayers] = useState(0);
    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log('Creating game with username:', username, 'and max players:', maxPlayers);
        socket.emit('createGame', {
            username,
            maxPlayers
        });
    }

    useEffect(() => {
            socket.on('createGame', (data) => {
                if (data.error) {
                    alert(data.message);
                    return;
                }
                navigate(`/waiting-room/${data.gameCode}`);
            })

            return () => {
                socket.off('createGame');
            };
        }
    );

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
                       value={maxPlayers}
                       onChange={(e) => setMaxPlayers(Number(e.target.value))}
                       placeholder="Nombre de joueurs maximum" />
                <button className="btn btn-primary" type="submit">Créer une partie</button>
            </form>
        </>
    )
}
export default CreateGame
