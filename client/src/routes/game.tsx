import {useParams} from "react-router";
import GameBoard from "../components/GameBoard.tsx";

const Game = () => {
    const params = useParams<{ game_code: string }>();
    const gameCode = params.game_code;

    return (
        <div>
        </div>
    )
}
export default Game
