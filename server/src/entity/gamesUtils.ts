import {CardsState, GamesUtilsState} from "../types";

export function shuffle(gameCode: string) {
    const gameUtils = getOne(gameCode);
    if (gameUtils) {
        const shuffledCards = gameUtils.deck.sort(() => Math.random() - 0.5);
        GamesUtilsState.setGamesUtils([
            ...GamesUtilsState.gamesUtils.filter(game => game.gameCode !== gameCode),
            { ...gameUtils, deck: shuffledCards }
        ]);
    }
}

export function fill(gameCode: string) {
    GamesUtilsState.setGamesUtils([
        ...GamesUtilsState.gamesUtils.filter(game => game.gameCode !== gameCode),
        { gameCode, deck: CardsState.cards, timeline: [], activeCard: null }
    ]);
}

export function getOne(gameCode: string) {
    return GamesUtilsState.gamesUtils.find(game => game.gameCode === gameCode);
}

export function getOneCardOfDeck(gameCode: string, cardId: number) {
    const gameUtils = getOne(gameCode);
    if (!gameUtils) return null;
    return gameUtils.deck.find(card => card.id === cardId);
}

export function deleteOneCardOfDeck(gameCode: string, cardId: number) {
    const gameUtils = getOne(gameCode);
    if (!gameUtils) return;
    const newDeck = gameUtils.deck.filter(card => card.id !== cardId);
    GamesUtilsState.setGamesUtils([
        ...GamesUtilsState.gamesUtils.filter(game => game.gameCode !== gameCode),
        { ...gameUtils, deck: newDeck }
    ]);
}

export function moveActiveCardInTimeline(gameCode: string) {
    const gameUtils = getOne(gameCode);
    if (!gameUtils) return;

    for (let i = 0; i < gameUtils.timeline.length; i++) {
        if (gameUtils.timeline[i].dates[0] > gameUtils.activeCard!.dates[0]) {
            const newTimeline = [...gameUtils.timeline];
            newTimeline.splice(i, 0, gameUtils.activeCard!);
            GamesUtilsState.setGamesUtils([
                ...GamesUtilsState.gamesUtils.filter(game => game.gameCode !== gameCode),
                { ...gameUtils, timeline: newTimeline, activeCard: null }
            ]);
            return;
        }
    }

    GamesUtilsState.setGamesUtils([
        ...GamesUtilsState.gamesUtils.filter(game => game.gameCode !== gameCode),
        {...gameUtils, timeline: [...gameUtils.timeline, gameUtils.activeCard!], activeCard: null}
    ]);
    return;
}

export function getTimeline(gameCode: string) {
    const gameUtils = getOne(gameCode);
    if (!gameUtils) return null;
    return gameUtils.timeline;
}

export function pickCard(gameCode: string) {
    const gameUtils = getOne(gameCode);
    if (!gameUtils) return null;
    const card = gameUtils.deck[0];
    GamesUtilsState.setGamesUtils([
        ...GamesUtilsState.gamesUtils.filter(game => game.gameCode !== gameCode),
        {...gameUtils, activeCard: card, deck: gameUtils.deck.slice(1)}
    ]);
    return card;
}

export function getCardsAroundActive(gameCode: string, index: number) {
    const gameUtils = getOne(gameCode);
    if (!gameUtils) return undefined;
    let leftCard = index > 0 ? gameUtils.timeline[index - 1] : undefined;
    let rightCard = index < gameUtils.timeline.length - 1 ? gameUtils.timeline[index + 1] : undefined;
    if (index === 0) {
        leftCard = undefined;
        rightCard = gameUtils.timeline[0];
    }
    if (index === gameUtils.timeline.length - 1) {
        leftCard = gameUtils.timeline[gameUtils.timeline.length - 1];
        rightCard = undefined;
    }
    return { leftCard, rightCard };
}