import { CardData } from "../types.ts";
import GameBoard from "../components/GameBoard.tsx";

interface GameProps {
    data: CardData[];
}

const Game = ({ data }: GameProps) => {


    return (
        <div>

            <GameBoard data={data} />

        </div>
    )
}
export default Game
