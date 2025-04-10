import {PlayerData} from "../types.ts";
import {useState} from "react";
import { Link } from "react-router";
import {Crown} from "lucide-react";

interface EndScreenProps {
    playersData: PlayerData[];
}

export function EndScreen({ playersData } : EndScreenProps) {
    const [ranking, setRanking] = useState<PlayerData[]>(playersData);

    return <>
        <div className="flex flex-col bg-darkBlue text-white items-center justify-around h-screen">
            <div className="flex flex-col items-center">
                <h2 className="text-2xl font-bold text-white mb-4">Classement des Joueurs</h2>
                <p className="text-sm text-gray-300 mb-6">Voici les trois meilleurs joueurs :</p>
                <div className="flex justify-center items-end gap-4 mt-6">
                    {ranking
                        .sort((a, b) => b.points - a.points) // Trier les joueurs par points décroissants
                        .slice(0, 3) // Prendre les 3 premiers joueurs
                        .map((player, index) => (
                            <div
                                key={index}
                                className={`flex flex-col items-center text-sm ${
                                    index === 0 ? "order-2" : index === 1 ? "order-1" : "order-3"
                                }`}
                            >
                                <Crown
                                    color="#fdc700"
                                    className={
                                        index === 0
                                            ? "fill-yellow-400"
                                            : index === 1
                                            ? "fill-gray-500"
                                            : "fill-amber-900"
                                    }
                                />
                                <div
                                    className="w-60 bg-white/10 border border-white rounded-xs"
                                    style={{
                                        height: `${player.points * 40}px`,
                                    }}
                                ></div>
                                <span className="mt-2 font-bold">{player.name}</span>
                                <span>{player.points} points</span>
                            </div>
                        ))}
                </div>
            </div>

            <div className="flex justify-center gap-4">
                <Link to="/" className="btn btn-danger">Menu</Link>
            </div>
        </div>
    </>


}