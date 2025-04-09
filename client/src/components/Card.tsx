import {useState} from "react";
import FrontCard from "./FrontCard.tsx";
import BackCard from "./BackCard.tsx";
import {CardData} from "../types.ts";
import {CardSide} from "../types.ts";

interface CardProps {
    data: CardData;
    initialSide: CardSide;
}

const Card = ({ data, initialSide } : CardProps) => {
    const [side, setSide] = useState<CardSide>(initialSide)

    const handleClick = () => {
        setSide((prevSide) => (prevSide === CardSide.FRONT ? CardSide.BACK : CardSide.FRONT))
    }

    return (
        <>
            {side === CardSide.FRONT ? (
                <FrontCard onClick={handleClick} data={data} />
            ) : (
                <BackCard onClick={handleClick} data={data} />
            )}
        </>
    )
}
export default Card
