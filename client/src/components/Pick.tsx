import { useState } from "react";
import Card from "./Card.tsx";
import { CardData, CardSide } from "../types.ts";

interface PickProps {
    data: CardData[];
    onPick: (card: CardData) => void;
}

export default function Pick({ data, onPick } : PickProps) {
    const [cardsData, setCardsData] = useState<CardData[]>(data);

    const handlePick = () => {
        const [picked, ...rest] = cardsData;
        setCardsData(rest);
        onPick(picked);
    };

    return (
        <div className="flex flex-col items-center justify-center">
            <h2 className="text-md mb-2">Pioche</h2>
            <div onClick={handlePick}>
                {cardsData[0] && (
                    <Card
                        data={cardsData[0]}
                        initialSide={CardSide.BACK}
                        turnable={false}
                    />
                )}
            </div>
        </div>
    );
}
