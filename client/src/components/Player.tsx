import Card from "./Card.tsx";
import {CardData, CardSide, PlayerData} from "../types.ts";
import {useState} from "react";
import { cardsData } from "../data.ts";

interface PlayerProps {
    data: PlayerData;
}

export default function Player({ data } : PlayerProps) {
    const [cardData] = useState<CardData>(cardsData[0]);

    return <>
        <div className="flex-col items-center justify-center">
            <div className="flex justify-center">{data.name}</div>
            <div className="flex flex-col items-center justify-center">
                {cardData && (
                    <Card data={cardData} initialSide={CardSide.BACK} turnable={false} />
                )}
            </div>
        </div>
    </>
}