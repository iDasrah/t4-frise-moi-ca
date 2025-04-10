import {PlayerData} from "../types.ts";

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
                        <span className="text-yellow-400 text-xl">⭐</span>
                        <span>{player.points}/15</span>
                    </div>
                </div>
            ))}
        </div>
    )
}
export default PlayersList
