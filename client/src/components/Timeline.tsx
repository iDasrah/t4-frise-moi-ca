import { CardData, CardSide } from "../types";
import Card from "./Card";
import DropSlot from "./DropSlot";

interface TimelineProps {
    cardsData: CardData[];
    isDragging: boolean;
}

export default function Timeline({ cardsData, isDragging }: TimelineProps) {

    return (
        <div className="flex flex-col items-center justify-center">
            <div className="flex gap-5 flex-wrap items-center overflow-hidden p-3 border-2 border-black rounded-xl bg-cream min-h-[180px]">
                {cardsData.map((card, index) => (
                    <div key={`wrapper-${index}`} className="flex items-center gap-2">
                        {isDragging && <DropSlot id={`slot-${index}`} />}
                        <Card key={`card-${index}`} data={card} initialSide={CardSide.FRONT} />
                    </div>
                ))}

                {isDragging && <DropSlot id={`slot-${cardsData.length}`} />}
            </div>
        </div>
    );
}
