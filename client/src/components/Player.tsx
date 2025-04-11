import {CardData, User} from "../types.ts";
import DraggableCard from "./DraggableCard.tsx";

interface PlayerProps {
    user: User;
    card: Omit<CardData, "date"> | null;
}

export default function Player({ card, user } : PlayerProps) {
        return (
            <>
                <div className="relative bottom-1.5 flex flex-col items-center justify-center">
                    <span>{user.name}</span>
                    <div className="flex items-center gap-1">
                        <span className="text-yellow-400 text-xl">⭐</span>
                        <span>{user.points}/15</span>
                    </div>

                    <div className="w-51 h-71 bg-white/10 border border-white rounded-md">
                        {card && (
                            <div className="flex flex-col items-center gap-1">
                                <DraggableCard
                                    data={card}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </>
        );
    }