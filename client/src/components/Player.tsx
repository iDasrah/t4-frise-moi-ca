import {PlayerData} from "../types.ts";
import DraggableCard from "./DraggableCard.tsx";
import {Star} from "lucide-react";

    interface PlayerProps {
        playerData: PlayerData;
    }

export default function Player({ playerData } : PlayerProps) {
        return (
            <>
                <div className="relative bottom-1.5 flex flex-col items-center justify-center">
                    <span>{playerData?.name}</span>
                    <div className="flex items-center gap-1">
                        <span>{playerData?.points}</span>
                        <Star className="size-6 fill-yellow-400 text-yellow-400" />
                    </div>

                    <div className="w-51 h-71 bg-white/10 border border-white rounded-md">
                        {playerData?.card && (
                            <div className="flex flex-col items-center gap-1">
                                <DraggableCard
                                    data={playerData.card}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </>
        );
    }