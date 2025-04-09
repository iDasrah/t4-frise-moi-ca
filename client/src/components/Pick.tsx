import Card from "./Card.tsx";
import { CardSide } from "../types.ts";
import {useState} from "react";

const data = {
    title: "Card Title",
    type: "Card Type",
    thematic: "Thematic",
    description: "Card Description",
    date: "2023-10-01",
}

export default function Pick() {
    const [cards, setCards] = useState();

    return <>
        <Card data={data} initialSide={CardSide.BACK} />
    </>
}