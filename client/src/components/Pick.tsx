import {useState} from "react";
import Card from "./Card.tsx";
import { CardData } from "../types.ts";

export default function Pick() {
    const [cards, setCards] = useState<CardData[]>([]);
    
    

    return <>
        <Card/>
    </>
}