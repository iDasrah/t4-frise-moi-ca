import {useState} from "react";
import {CardData, CardSide} from "../types.ts";
import Card from "./Card.tsx";

interface TimelineProps {
    data: CardData[];
}

const Timeline = ({ data }: TimelineProps) => {
    const [cards, setCards] = useState<CardData[]>(data)

    return <>
        <div className="flex flex-col items-center justify-center">
            <div className="flex gap-5" >
                {cards.map((card, index) => (
                    <Card key={index} data={card} initialSide={CardSide.FRONT} turnable={true} />
                ))}
            </div>
        </div>
    </>
}
export default Timeline
