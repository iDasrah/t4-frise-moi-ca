import Card from "./Card.tsx";
import {CardData, CardSide} from "../types.ts";
import {useState} from "react";

interface PickProps {
    data: CardData[];
}

export default function Pick({ data } : PickProps) {
    const [cardsData] = useState<CardData[]>(data);

    return <>
        <div className="flex flex-col items-center justify-center">
            <h2 className="text-md mb-2">Pioche</h2>
            {cardsData[0] && (
                <Card data={cardsData[0]} initialSide={CardSide.BACK} turnable={false} />
            )}
        </div>
    </>
}