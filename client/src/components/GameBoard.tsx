import { useState } from "react";
import {DndContext, DragEndEvent} from "@dnd-kit/core";
import Pick from "./Pick";
import Timeline from "./Timeline";
import { CardData, PlayerData } from "../types";
import { Link } from "react-router";
import PlayersList from "./PlayersList.tsx";
import Player from "./Player.tsx";

interface GameBoardProps {
    cardsData: CardData[];
    playersData: PlayerData[];
}

const GameBoard = ({ cardsData, playersData }: GameBoardProps) => {
    const [pickedCard, setPickedCard] = useState<CardData | null>(null);
    const [remainingCards, setRemainingCards] = useState<CardData[]>(cardsData);
    const [cards, setCards] = useState<CardData[]>([]);
    const [isDragging, setIsDragging] = useState(false);
    const [currentPlayer, setCurrentPlayer] = useState<PlayerData>(playersData[0]);

    const handlePick = () => {
        const [nextCard, ...rest] = remainingCards;
        setPickedCard(nextCard);

        const currentPlayer = {
            ...playersData[0],
            card: nextCard,
        }

        setCurrentPlayer(currentPlayer);
        setRemainingCards(rest);
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

    const handleDrop = (card: CardData, index: number) => {
        const updated = [...cards];
        updated.splice(index, 0, card);
        setCards(updated);
        setPickedCard(null);

        const updatedPlayer = {
            ...currentPlayer,
            card: null,
        };
        setCurrentPlayer(updatedPlayer);
    };

    return (
        <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
            <div className="bg-mainBlue h-screen text-white pt-5 flex flex-col gap-5 items-center">
                <PlayersList playersData={playersData} />
                <Timeline
                    cardsData={cards}
                    isDragging={isDragging}
                />

                <div className="flex gap-5">
                    <Player playerData={currentPlayer} />
                    <Pick onPick={handlePick} data={cardsData} />
                </div>

                <Link to="/" className="btn btn-danger absolute bottom-5 left-5">
                    Quitter
                </Link>
            </div>
        </DndContext>
    );
};

export default GameBoard;
