import {CardData, PlayerData} from "../types.ts";
import GameBoard from "../components/GameBoard.tsx";

interface GameProps {
    cardsData: CardData[];
    playersData: PlayerData[];
}

const Game = ({ cardsData, playersData }: GameProps) => {
    return (
        <div>
                <GameBoard cardsData={cardsData} playersData={playersData} />
        </div>
    )
}
export default Game
