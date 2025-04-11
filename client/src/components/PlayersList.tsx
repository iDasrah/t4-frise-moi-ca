import {PlayerData} from "../types.ts";
import {Star} from "lucide-react";

interface PlayersListProps {
    playersData: PlayerData[];
}

const PlayersList = ({ playersData }: PlayersListProps) => {
    return (
        <div className="flex justify-center gap-6 pt-4 flex-wrap">
            {playersData.map((player, index) => (
                <div key={index} className="flex flex-col items-center text-sm">
                    <span>{player.name}</span>
                    <div className="flex items-center gap-1">
                        <span>{player.points}</span>
                        <Star className="size-6 fill-yellow-400 text-yellow-400" />
                    </div>
                </div>
            ))}
        </div>
    )
}
export default PlayersList
