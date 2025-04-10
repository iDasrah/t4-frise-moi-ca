import fetch from "node-fetch";
import { parse } from "csv-parse/sync";
import { CardData } from "./types";

const SPREADSHEET_ID = "1flhwZlPYWQPWKSotmz7wDzBZnBYAL5JJHu_-vY38zcg";
const GID = "1517720865";

const SHEETS_URL = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/export?format=csv&id=${SPREADSHEET_ID}&gid=${GID}`;

export const fetchData = async () => {
    const res = await fetch(SHEETS_URL);
    const csvText = await res.text();
    let cardsData: CardData[] = [];

    const json = parse(csvText, {
        columns: true,
        skip_empty_lines: true
    });

    const cleaned = json.filter((item: Record<string, string>) =>
        Object.entries(item).some(([key, value]) => key !== 'thematique' && (value as string).trim() !== '')
    );

    cleaned.forEach((item: Record<string, string>) => {
        const cardData: CardData = {
            title: item['titre'],
            type: item['type'],
            thematic: item['thematique'],
            description: item['description'],
            date: item['date']
        };

        cardsData.push(cardData);
    });

    return cardsData;
};