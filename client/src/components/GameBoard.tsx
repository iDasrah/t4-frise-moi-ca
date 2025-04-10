import {useContext, useEffect, useState} from "react";
import {DndContext, DragEndEvent} from "@dnd-kit/core";
import Pick from "./Pick";
import Timeline from "./Timeline";
import {CardData, Game, User} from "../types";
import {Link, useNavigate} from "react-router";
import Player from "./Player.tsx";
import {
    restrictToWindowEdges
} from "@dnd-kit/modifiers";
import {SocketContext} from "./SocketContext.tsx";
import PlayersList from "./PlayersList.tsx";

const GameBoard = () => {
    const [pickedCard, setPickedCard] = useState<Omit<CardData, "textDate"> | null>(null);
    const [cards, setCards] = useState<(CardData|Omit<CardData, "textDate">)[]>([]);
    const [isDragging, setIsDragging] = useState(false);
    const [user, setUser] = useState<User>({ id: "", name: "", gameCode: "", isHost: false, isActive: false, points: 0 });
    const [usersWithoutMe, setUsersWithoutMe] = useState<User[]>([]);
    const [game, setGame] = useState<Game>({ code: "", hasStarted: false, maxPlayers: 0, minPoints: 0 });
    const [message, setMessage] = useState<string | null>(null);
    const navigate = useNavigate();
    const socket = useContext(SocketContext);

    const handlePick = () => {
        socket.emit("pickCard");
    };

    const handleDragStart = () => {
        setIsDragging(true);
    };

    const handleDragEnd = (event: DragEndEvent) => {
        setIsDragging(false);

        if (!pickedCard || !event.over) return;

        const id = String(event.over.id);
        if (id.startsWith("slot-")) {
            const index = parseInt(id.split("-")[1], 10);
            handleDrop(pickedCard, index);
        }
    };

    const handleDrop = (card: Omit<CardData, "textDate">, index: number) => {
        const updated = [...cards];
        updated.splice(index, 0, card);
        setCards(updated);

        socket.emit("dropCardInTimeline", { index });
        socket.emit("user");
        socket.emit("usersInGameExcludeUser");

        setPickedCard(null);

        const updatedPlayer = {
            ...user,
            card: null,
        };
        setUser(updatedPlayer);
    };

    useEffect(() => {
        socket.emit("user");

        socket.emit("game");

        socket.emit("cardsTimeline");

        socket.emit("usersInGameExcludeUser");

        socket.on('message', (msg: string) => {
            setMessage(msg);
            setTimeout(() => {
                setMessage(null);
            }, 3000);
        }
        );

        socket.on("pickCard", (card: Omit<CardData, "textDate">) => {
            setPickedCard(card);
        });

        socket.on("cardsTimeline", (cards: (CardData | Omit<CardData, "textDate">)[]) => {
            setCards(cards);
            socket.emit("usersInGameExcludeUser");
        });

        socket.on("endGame", () => {
            navigate("/end");
        });

        socket.on("yourTurn", (nextUser: User) => {
            console.log(nextUser);

            setUser(nextUser);
        });

        socket.on("user", (socketUser: User) => {
            setUser(socketUser);
        });

        socket.on("game", (socketGame: Game) => {
            setGame(socketGame);
        });

        socket.on("usersInGameExcludeUser", (usersInGameExcludeUser: User[]) => {
            setUsersWithoutMe(usersInGameExcludeUser);
        });

        return () => {
            socket.off("pickedCard");
            socket.off("cardsTimeline");
            socket.off("endGame");
            socket.off("user");
            socket.off("yourTurn");
            socket.off("usersInGameExcludeUser");
        };
    }, [navigate]);

    return (
        <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd} modifiers={[restrictToWindowEdges]}>
            {message && (
                <div className="fixed top-0 left-0 right-0 bg-cream text-center p-4">
                    {message}
                </div>
            )}
            <div className="bg-mainBlue h-screen text-white pt-5 flex flex-col gap-5 items-center">
                <PlayersList users={usersWithoutMe} />
                <Timeline
                    cardsData={cards}
                    isDragging={isDragging}
                />

                <div className="flex gap-5">
                    <Player user={user} card={pickedCard} game={game} />
                    <Pick onPick={handlePick} />
                </div>

                {user.isActive && (
                    <div>
                        <h2 className="text-center text-2xl font-bold">C'est à votre tour !</h2>
                        <p className="text-center text-lg">Glissez et déposez votre carte sur la timeline.</p>
                    </div>
                )}

                <Link to="/" className="btn btn-danger absolute bottom-5 left-5">
                    Quitter
                </Link>
            </div>
        </DndContext>
    );
};

export default GameBoard;
