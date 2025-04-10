import {useState} from "react";
import {CardData, CardSide} from "../types.ts";
import Card from "./Card.tsx";

interface TimelineProps {
    data: CardData[];
}

const Timeline = ({ data }: TimelineProps) => {
    const [cards, setCards] = useState<CardData[]>(data)

    return <>
        <div className="flex flex-col items-center justify-center h-screen">
            <div className="flex">
                {cards.map((card, index) => (
                    <Card key={index} data={card} initialSide={CardSide.BACK} turnable={false} />
                ))}
            </div>
        </div>
    </>
}
export default Timeline
