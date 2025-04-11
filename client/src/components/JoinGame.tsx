import {FormEvent, useContext, useEffect, useState} from "react";
import {useNavigate, useSearchParams} from "react-router";
import {SocketContext} from "./SocketContext.tsx";

const JoinGame = () => {
    const [username, setUsername] = useState('')
    const [gameCode, setGameCode] = useState('')
    const navigate = useNavigate();
    const socket = useContext(SocketContext);

    const [searchParams] = useSearchParams();

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        socket.emit('joinGame', {
            username,
            gameCode
        });
    }

    useEffect(() => {
            const codeParam = searchParams.get('code');
            if (codeParam) {
                setGameCode(codeParam.toString());
            }

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
        }, [searchParams]
    );

    return (
        <>
            <form onSubmit={handleSubmit} className="game-form">
                <h2 className="text-2xl font-bold">Rejoindre une partie</h2>
                <label htmlFor="username">Entre ton nom</label>
                <input className="input-field" type="text" name="username" id="username"
                       value={username}
                       onChange={(e) => setUsername(e.target.value)}
                       placeholder="Nom d'utilisateur"
                />
                <label htmlFor="nb_players">Code de la partie</label>
                <input className="input-field" type="text" name="gameId" id="gameId"
                       value={gameCode}
                       onChange={
                            (e) => {
                                const value = e.target.value.toUpperCase(); // Majuscules auto
                                if (/^[A-Z0-9]{0,6}$/.test(value)) {
                                    setGameCode(value);
                                }
                            }
                       }
                       onPaste={(e) => {
                           let paste = e.clipboardData.getData('text').toUpperCase();
                           paste = paste.slice(0, 6);
                           if (!/^[A-Z0-9]{0,6}$/.test(paste)) {
                               e.preventDefault();
                           }
                       }}
                       placeholder="ABCDEF"
                />
                <button className="btn btn-primary" type="submit">Rejoindre une partie</button>
            </form>
        </>
    )
}
export default JoinGame
