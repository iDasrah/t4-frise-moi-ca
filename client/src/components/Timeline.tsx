import { CardData, CardSide } from "../types";
import Card from "./Card";
import DropSlot from "./DropSlot";
import {useEffect, useRef, useState} from "react";


interface TimelineProps {
    cardsData: (CardData|Omit<CardData, "textDate">)[];
    isDragging: boolean;
}

export default function Timeline({ cardsData, isDragging }: TimelineProps) {
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

    const [closestIndex, setClosestIndex] = useState<number | null>(null);
    const shouldShowEndDropSlot =
        isDragging &&
        closestIndex !== null &&
        (closestIndex === cardsData.length || cardsData.length === 0);

    const findClosestIndex = () => {
        const draggedEl = document.querySelector('[data-id="picked-card"]') as HTMLElement;
        if (!draggedEl) return null;

        const draggedRect = draggedEl.getBoundingClientRect();
        const draggedX = draggedRect.x + draggedRect.width / 2;

        let closest = 0;
        let minDiff = Infinity;
        let foundCloser = false;

        cardRefs.current.forEach((ref, i) => {
            if (!ref) return;
            const rect = ref.getBoundingClientRect();
            const centerX = rect.x + rect.width / 2;
            const diff = draggedX - centerX;

            if (diff < 0 && Math.abs(diff) < minDiff) {
                minDiff = Math.abs(diff);
                closest = i;
                foundCloser = true;
            }
        });

        return foundCloser ? closest : cardsData.length;
    };

    useEffect(() => {
        if (!isDragging) return;

        const interval = setInterval(() => {
            const index = findClosestIndex();
            if (index !== null) {
                setClosestIndex(index);
            }
        }, 100);

        return () => clearInterval(interval);
    }, [isDragging]);

    return (
        <div className="w-[95vw] flex flex-col items-center justify-center">
            <div className="w-full h-80 flex gap-5 items-center overflow-x-scroll p-3 border-2 border-black rounded-xl bg-cream min-h-[180px]">
                {cardsData.map((card, index) => (
                    <div
                        key={`wrapper-${index}`}
                        className="flex items-center gap-2"
                        ref={(el) => {
                            cardRefs.current[index] = el;
                        }}
                    >
                        {isDragging && closestIndex !== null && Math.abs(index - closestIndex) <= 1 && (
                            <DropSlot id={`slot-${index}`} />
                        )}
                        <Card key={`card-${index}`} data={card} initialSide={CardSide.FRONT} />
                    </div>
                ))}

                {shouldShowEndDropSlot && (
                    <DropSlot id={`slot-${cardsData.length}`} />
                )}
            </div>
        </div>
    );
}
