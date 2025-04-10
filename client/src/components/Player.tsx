import DraggableCard from "./DraggableCard.tsx";
import {CardData, Game, User} from "../types.ts";
import {Crown, Star} from "lucide-react";

interface PlayerProps {
    user: User;
    game: Game;
    card: Omit<CardData, "textDate"> | null;
}

export default function Player({ card, user, game } : PlayerProps) {
        return (
            <>
                <div className="relative bottom-1.5 flex flex-col items-center justify-center">
                    <div className="flex items-center gap-1">
                        {user.isHost && (
                            <Crown className="size-6 fill-yellow-400 text-yellow-400" />
                        )}
                        <span>{user.name}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <span>{user.points}/{game.minPoints}</span>
                        <Star className="size-6 fill-yellow-400 text-yellow-400" />
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