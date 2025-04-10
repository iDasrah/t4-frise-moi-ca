import QRCode from "react-qr-code";
import {useNavigate, useParams} from "react-router";
import {useEffect, useState} from "react";
import {User, Game} from "../types.ts";
import {Crown} from "lucide-react";
import {socket} from "../socket.ts";

const WaitingRoom = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [user, setUser] = useState<User>({ id: "", name: "", gameCode: "", isHost: false, points: 0 });
    const [game, setGame] = useState<Game>({ code: "", hasStarted: false, maxPlayers: 0 });
    const navigate = useNavigate();

    const params = useParams<{ game_code: string }>();
    const gameCode = params.game_code;

    function handleStartGame() {
        socket.emit('startGame');
    }

    function handleLeaveGame() {
        socket.disconnect();
        navigate("/");
    }

    useEffect(() => {
        socket.emit('user')
        socket.emit('game')
        socket.emit('usersInGame')

        socket.on('usersInGame', (data: User[]) => {
            setUsers(data);
        })

        socket.on('game', (data: Game) => {
            setGame(data);
            if (data.hasStarted) {
                navigate(`/game/${gameCode}`);
            }
        })

        socket.on('user', (data: User) => {
            setUser(data);
        })

        socket.on('startGame', (data) => {
            if (data.error) {
                alert(data.message);
                return;
            }
            navigate(`/game/${gameCode}`)
        })

        return () => {
            socket.off('usersInGame');
            socket.off('game');
            socket.off('user');
            socket.off('startGame');
        };
    })

    return (
        <div className="w-screen h-screen flex flex-col items-center justify-center bg-gray-800 text-white pt-3">
            <h2 className="text-white font-bold italic text-4xl mb-6">Waiting Room :</h2>

            <div className="w-full h-full flex flex-row gap-8 p-8 bg-gray-700 rounded-xl shadow-lg">
                <div className="bg-gray-300 text-black p-6 rounded-lg border-2 border-black w-1/4">
                    <h3 className="font-bold text-xl mb-3">Joueurs {users.length}/{game.maxPlayers}</h3>
                    <ul className="italic space-y-2 text-lg">
                        {users.map((user, index) => (
                            <li key={index} className="flex items-center">
                                <div className={"flex gap-2 items-center"}>
                                    <span className="font-semibold">{user.name}</span>
                                    {user.isHost && <Crown color="#fdc700" className={"fill-yellow-400"} />}
                                </div>

                            </li>
                        ))}
                        {users.length < game.maxPlayers && (
                            <li className="italic text-gray-500">En attente de joueurs...</li>
                        )}

                    </ul>
                    {users.length > 1 && !game.hasStarted && user.isHost && (
                        <button
                            className="btn btn-primary mt-4"
                            onClick={handleStartGame}
                        >
                            Démarrer la partie
                        </button>
                    )}
                    <button
                        className="btn btn-secondary mt-4"
                        onClick={handleLeaveGame}
                    >Quitter</button>
                </div>

                <div className="bg-gray-300 text-black p-6 rounded-lg flex flex-col justify-start w-3/4">
                    <div className="h-10 border border-black rounded-md flex items-center justify-center text-lg">
                        <span className="italic font-semibold">Réglages :</span>
                    </div>
                    <QRCode
                        size={256}
                        value={gameCode || ""}
                        viewBox={`0 0 256 256`}
                    />
                    <div className="italic font-semibold pt-4 text-center text-lg">
                        Code room : <span className="text-gray-800">{gameCode}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WaitingRoom;