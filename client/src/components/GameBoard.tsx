import {useEffect, useState} from "react";
import {DndContext, DragEndEvent} from "@dnd-kit/core";
import Pick from "./Pick";
import Timeline from "./Timeline";
import {CardData, User} from "../types";
import {Link, useNavigate} from "react-router";
import PlayersList from "./PlayersList.tsx";
import Player from "./Player.tsx";
import {
    restrictToWindowEdges
} from "@dnd-kit/modifiers";
import {socket} from "../socket.ts";

const GameBoard = () => {
    const [pickedCard, setPickedCard] = useState<Omit<CardData, "date"> | null>(null);
    const [cards, setCards] = useState<(CardData|Omit<CardData, "date">)[]>([]);
    const [isDragging, setIsDragging] = useState(false);
    const [user, setUser] = useState<User>({ id: "", name: "", gameCode: "", isHost: false, isActive: false, points: 0 });
    const navigate = useNavigate();

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

    const handleDrop = (card: Omit<CardData, "date">, index: number) => {
        const updated = [...cards];
        updated.splice(index, 0, card);
        setCards(updated);

        socket.emit("dropCardInTimeline", { index });
        socket.emit("user");

        setPickedCard(null);

        const updatedPlayer = {
            ...user,
            card: null,
        };
        setUser(updatedPlayer);
    };

    useEffect(() => {
        socket.emit("user");

        socket.emit("cardsTimeline");

        socket.on("pickCard", (card: Omit<CardData, "date">) => {
            setPickedCard(card);
        });

        socket.on("cardsTimeline", (cards: (CardData | Omit<CardData, "date">)[]) => {
            setCards(cards);
        });

        socket.on("endGame", () => {
            navigate("/end");
        });

        socket.on("user", (user: User) => {
            console.log(user);
            setUser(user);
        });

        socket.on("usersInGame", (users: User[]) => {
            console.log(users);
        });

        return () => {
            socket.off("pickedCard");
            socket.off("cardsTimeline");
            socket.off("endGame");
            socket.off("user");
            socket.off("usersInGame");
        };
    }, [navigate]);

    return (
        <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd} modifiers={[restrictToWindowEdges]}>
            <div className="bg-mainBlue h-screen text-white pt-5 flex flex-col gap-5 items-center">
                {/*<PlayersList playersData={playersData} />*/}
                <Timeline
                    cardsData={cards}
                    isDragging={isDragging}
                />

                <div className="flex gap-5">
                    <Player user={user} card={pickedCard} />
                    <Pick onPick={handlePick} />
                </div>

                <Link to="/" className="btn btn-danger absolute bottom-5 left-5">
                    Quitter
                </Link>
            </div>
        </DndContext>
    );
};

export default GameBoard;
