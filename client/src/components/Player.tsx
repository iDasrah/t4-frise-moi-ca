import {PlayerData} from "../types.ts";
import DraggableCard from "./DraggableCard.tsx";

    interface PlayerProps {
        playerData: PlayerData;
    }

export default function Player({ playerData } : PlayerProps) {
        return (
            <>
                <div className="flex flex-col items-center justify-center">
                    <span>{playerData?.name}</span>
                    <div className="flex items-center gap-1">
                        <span className="text-yellow-400 text-xl">⭐</span>
                        <span>{playerData?.points}/15</span>
                    </div>

                    {playerData?.card ? (
                        <DraggableCard data={playerData.card} />
                    ) : (
                        <div className="w-50 h-70 bg-white/10 border border-white rounded-md mt-2"></div>
                    )}
                </div>
            </>
        );
    }