import {Card, CardsState} from "../types";

export function fill(cards: Card[]) {
    CardsState.setCards(cards);
}

export function isRightDate(activeCard: Card, leftCard?: Card, rightCard?: Card) {
    if (!leftCard && !rightCard) return false;

    if (rightCard) {
        if (activeCard.dates[0] > rightCard.dates[0] && rightCard.dates.length == 1) return false;
        if (rightCard.dates.length == 2 && !(activeCard.dates[0] > rightCard.dates[0] && activeCard.dates[0] < rightCard.dates[1])) return false;
    }

    if (leftCard) {
        if (activeCard.dates[0] < leftCard.dates[0] && leftCard.dates.length == 1) return false;
        if (leftCard.dates.length == 2 && !(activeCard.dates[0] < leftCard.dates[0] && activeCard.dates[0] > leftCard.dates[1])) return false;
    }
    return true;
}

export function getOne(id: number) {
    return CardsState.cards.find(card => card.id === id);
}

export function getAll() {
    return CardsState.cards;
}