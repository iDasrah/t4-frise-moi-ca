import { useState } from "react";
import Card from "./Card.tsx";
import { CardData, CardSide } from "../types.ts";

interface PickProps {
    data: CardData[];
    canDraw: boolean;
    onClick: () => void;
}

export default function Pick({ data } : PickProps) {
    const [cardsData] = useState<CardData[]>(data);
    const [isRotating, setIsRotating] = useState(false);
    const [isCardDrawn, setIsCardDrawn] = useState(false); // Suivi si la carte a été piochée

    const handleCardClick = () => {
        if (canDraw && !isRotating) {
            setIsRotating(true);
            setTimeout(() => {
                setIsCardDrawn(true);
                onClick();
            }, 1000);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center">
            <h2 className="text-md mb-2">Pioche</h2>
            {cardsData[0] && (
                <div
                    onClick={handleCardClick}
                    className={`cursor-pointer ${
                        canDraw ? 'hover:scale-105 opacity-100 transition-transform' : 'opacity-100 cursor-not-allowed'
                    } ${isRotating ? 'animate-rotate-move' : ''}`}
                    style={{
                        transition: 'transform 1s ease-in-out',
                    }}
                >
                    <Card
                        data={cardsData[0]}
                        initialSide={CardSide.BACK}
                        turnable={false}
                    />
                </div>
            )}
        </div>
    );
}
