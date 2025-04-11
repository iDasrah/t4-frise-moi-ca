import { useState } from "react";
import FrontCard from "./FrontCard.tsx";
import BackCard from "./BackCard.tsx";
import { CardData, CardSide } from "../types.ts";

interface CardProps {
    data?: CardData|Omit<CardData, "textDate">;
    initialSide: CardSide;
    turnable?: boolean;
}

const Card = ({ data, initialSide, turnable }: CardProps) => {
    const [side, setSide] = useState<CardSide>(initialSide);
    const [isFlipping, setIsFlipping] = useState(false);
    const [rotation, setRotation] = useState(0);

    const handleClick = () => {
        if (!turnable || isFlipping) return;

        setIsFlipping(true);
        setRotation(prev => prev + 540);

        setTimeout(() => {
            setSide(prev =>
                prev === CardSide.FRONT ? CardSide.BACK : CardSide.FRONT
            );
            setIsFlipping(false);
        }, 700);
    };

    return (
        <div className="w-50 h-70 perspective-distant">
            <div
                className="relative w-full h-full transition-transform duration-1000 transform-3d"
                style={{
                    transform: `rotateY(${rotation}deg)`,
                }}
                onClick={handleClick}
            >
                {side === CardSide.FRONT ? (
                    <FrontCard data={data} onClick={handleClick} />
                ) : (
                    <BackCard />
                )}
            </div>
        </div>
    );
};

export default Card;
