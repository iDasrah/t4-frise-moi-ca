import Pick from "./Pick.tsx";
import {CardData, CardSide, PlayerData} from "../types.ts";
import Timeline from "./Timeline.tsx";
import { Link } from "react-router";
import Player from "./Player.tsx";
import Card from "./Card.tsx";

interface GameBoardProps {
     cardsData: CardData[];
     playersData : PlayerData[];
}

const GameBoard = ({ cardsData, playersData }: GameBoardProps) => {
    return (
        <>
            <div className="bg-mainBlue h-screen text-white pt-5 flex flex-col justify-between gap-5">
                <div className="flex items-center justify-around">
                    {playersData.map((player) => (
                        <Player data={player}/>
                    ))}
                </div>
                <div>
                    <Pick data={cardsData} />
                </div>
                <div>
                    <Timeline data={cardsData} />
                </div>
                <div className="flex">
                    <div className="ml-2 text-3xl">
                        <Link to="/" className="btn text-red-500 hover:text-red-700 p-0">Leave</Link>
                    </div>
                    <div className="flex items-center justify-around">
                        <Player data={playersData[0]}/>
                    </div>
                </div>
            </div>
        </>
    );
};
export default GameBoard;
