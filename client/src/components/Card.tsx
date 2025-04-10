import { useState } from "react";
import FrontCard from "./FrontCard.tsx";
import BackCard from "./BackCard.tsx";
import { CardData, CardSide } from "../types.ts";

interface CardProps {
    data: CardData;
    initialSide: CardSide;
    turnable?: boolean;
}

const Card = ({ data, initialSide, turnable }: CardProps) => {
    const [side, setSide] = useState<CardSide>(initialSide);
    const [rotation, setRotation] = useState(initialSide === CardSide.BACK ? 180 : 0);

    const handleClick = () => {
        if (!turnable) return;
        setSide((prev) =>
            prev === CardSide.FRONT ? CardSide.BACK : CardSide.FRONT
        );
        setRotation((prev) => prev + 540);
    };

    return (
        <div className="w-60 h-70 perspective ">
            <div
                className="relative w-full h-full transition-transform duration-1000 transform-style preserve-3d"
                style={{
                    transform: `rotateY(${rotation}deg)`,
                }}
                onClick={handleClick}
            >
                <div className="absolute w-full h-full backface-hidden z-[3]">
                    <BackCard onClick={handleClick} data={data} />
                </div>

                <div className="absolute w-full h-full backface-hidden rotate-y-180 z-[1]">
                    <FrontCard  onClick={handleClick} data={data} />
                </div>
            </div>
        </div>
    );
};

export default Card;
