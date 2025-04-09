import {useState} from "react";
import FrontCard from "./FrontCard.tsx";
import BackCard from "./BackCard.tsx";

const Card = () => {
    const [side, setSide] = useState('front')

    const handleClick = () => {
        setSide((prevSide) => (prevSide === 'front' ? 'back' : 'front'))
    }

    return (
        <>
            {side === 'front' ? (
                <FrontCard onClick={handleClick} />
            ) : (
                <BackCard onClick={handleClick} />
            )}
        </>
    )
}
export default Card
