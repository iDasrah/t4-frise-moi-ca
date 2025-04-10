import Card from "./Card.tsx";
import { CardData, CardSide } from "../types.ts";

interface PickProps {
    cardsData: CardData[];
    onPick: () => void;
}

export default function Pick({ cardsData, onPick } : PickProps) {

    return (
        <div className="flex flex-col items-center justify-center">
            <h2 className="text-md mb-2">Pioche</h2>
            <div onClick={onPick}>
                <div className="w-51 h-71 bg-white/10 border border-white rounded-md mt-2">
                    {cardsData.length > 0 && (
                            <Card
                                data={cardsData[0]}
                                initialSide={CardSide.BACK}
                                turnable={false}
                            />
                        )}
                </div>
            </div>
        </div>
    );
}
