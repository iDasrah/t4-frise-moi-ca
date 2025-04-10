import {PlayerData} from "../types.ts";
import DraggableCard from "./DraggableCard.tsx";

    interface PlayerProps {
        playerData: PlayerData;
    }

export default function Player({ playerData } : PlayerProps) {
        return (
            <>
                <div className="relative bottom-1.5 flex flex-col items-center justify-center">
                    <span>{playerData?.name}</span>
                    <div className="flex items-center gap-1">
                        <span className="text-yellow-400 text-xl">⭐</span>
                        <span>{playerData?.points}/15</span>
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