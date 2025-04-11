import {FormEvent, useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router";
import {SocketContext} from "./SocketContext.tsx";

const CreateGame = () => {
    const [username, setUsername] = useState('');
    const [maxPlayers, setMaxPlayers] = useState(2);
    const [minPoints, setMinPoints] = useState(5);
    const navigate = useNavigate();
    const socket = useContext(SocketContext);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        socket.emit('createGame', {
            username,
            maxPlayers,
            minPoints
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
        }, []
    );

    return (
        <>
            <form onSubmit={handleSubmit} className="game-form">
                <h2 className="text-2xl font-bold">Créer une partie</h2>
                <label htmlFor="username">Entre ton nom</label>
                <input className="input-field" type="text" name="username" id="username"
                       value={username}
                       onChange={(e) => setUsername(e.target.value)}
                       placeholder="Nom d'utilisateur" />
                <label htmlFor="nb_players">Nombre de joueurs maximum</label>
                <input className="input-field" type="number" name="nb_players" id="nb_players"
                       value={maxPlayers}
                       onChange={(e) => setMaxPlayers(Number(e.target.value))}
                       placeholder="Nombre de joueurs maximum"
                       min={2}
                       max={10}
                />
                <label htmlFor="points">Nombre de points pour gagner</label>
                <input className="input-field" type="number" name="points" id="points"
                       value={minPoints}
                       onChange={(e) => setMinPoints(Number(e.target.value))}
                       placeholder="Nombre de points pour gagner"
                       min={5}
                       max={15}

                />
                <button className="btn btn-primary" type="submit">Créer une partie</button>
            </form>
        </>
    )
}
export default CreateGame
