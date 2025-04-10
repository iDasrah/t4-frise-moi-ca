import { PlayerData } from "../types.ts";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { Crown } from "lucide-react";

interface EndScreenProps {
    playersData: PlayerData[];
}

export function EndScreen({ playersData }: EndScreenProps) {
    const sortedRanking = [...playersData].sort((a, b) => b.points - a.points).slice(0, 3);
    const [heights, setHeights] = useState([0, 0, 0]);
    const [displayedPoints, setDisplayedPoints] = useState([0, 0, 0]);

    useEffect(() => {
        const targetHeights = [110, 70, 40];
        const delays = [1500, 1000, 500];

        sortedRanking.forEach((player, index) => {
            setTimeout(() => {
                setHeights(prev => {
                    const newHeights = [...prev];
                    newHeights[index] = targetHeights[index];
                    return newHeights;
                });

                let currentPoints = 0;
                const increment = Math.ceil(player.points / 100);
                const interval = setInterval(() => {
                    currentPoints += increment;
                    if (currentPoints >= player.points) {
                        currentPoints = player.points;
                        clearInterval(interval);
                    }
                    setDisplayedPoints(prev => {
                        const newPoints = [...prev];
                        newPoints[index] = currentPoints;
                        return newPoints;
                    });
                }, 100);
            }, delays[index]);
        });
    }, []);

    return (
        <div className="flex flex-col bg-darkBlue text-white items-center justify-around h-screen">
            <div className="flex flex-col items-center">
                <h2 className="text-2xl font-bold mb-4">Classement des joueurs</h2>
                <p className="text-sm text-gray-300 mb-6">Voici les trois meilleurs joueurs :</p>
                <div className="flex justify-center items-end gap-4 mt-6">
                    {sortedRanking.map((player, index) => {
                        const order = index === 0 ? "order-2" : index === 1 ? "order-1" : "order-3";
                        const crownColor =
                            index === 0
                                ? "fill-yellow-400"
                                : index === 1
                                    ? "fill-gray-500"
                                    : "fill-amber-900";

                        return (
                            <div key={index} className={`flex flex-col items-center text-sm ${order}`}>
                                <Crown color="#fdc700" className={crownColor} />
                                <div
                                    className="w-60 bg-white/10 border border-white rounded-xs transition-all duration-700"
                                    style={{ height: `${heights[index]*5}px` }}
                                ></div>
                                <span className="mt-2 font-bold">{player.name}</span>
                                <span>{displayedPoints[index]} points</span>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="flex justify-center gap-4">
                <Link to="/" className="btn btn-danger">Menu</Link>
            </div>
        </div>
    );
}
