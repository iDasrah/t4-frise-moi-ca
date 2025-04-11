import {Card, CardsState} from "../types";

export function fill(cards: Card[]) {
    CardsState.setCards(cards);
}

export function isRightDate(activeCard: Card, leftCard?: Card, rightCard?: Card) {
    if (!leftCard && !rightCard) return false;

    if (rightCard) {
        for (const date of activeCard.dates) {
            if (date > rightCard.dates[0] && rightCard.dates.length == 1) return false;
        }
    }

    if (leftCard) {
        for (const date of activeCard.dates) {
            if (date < leftCard.dates[0] && leftCard.dates.length == 1) return false;
        }
    }
    return true;
}

export function getOne(id: number) {
    return CardsState.cards.find(card => card.id === id);
}

export function getAll() {
    return CardsState.cards;
}