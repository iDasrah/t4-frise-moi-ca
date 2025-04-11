import fetch from "node-fetch";
import { parse } from "csv-parse/sync";
import { Card } from "./types";

const SPREADSHEET_ID = "1flhwZlPYWQPWKSotmz7wDzBZnBYAL5JJHu_-vY38zcg";
const GID = "1517720865";

const SHEETS_URL = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/export?format=csv&id=${SPREADSHEET_ID}&gid=${GID}`;

const monthsData = [
    { frenchName: "janvier", englishName: "january" },
    { frenchName: "fevrier", englishName: "february" },
    { frenchName: "mars", englishName: "march" },
    { frenchName: "avril", englishName: "april" },
    { frenchName: "mai", englishName: "may" },
    { frenchName: "juin", englishName: "june" },
    { frenchName: "juillet", englishName: "july" },
    { frenchName: "aout", englishName: "august" },
    { frenchName: "septembre", englishName: "september" },
    { frenchName: "octobre", englishName: "october" },
    { frenchName: "novembre", englishName: "november" },
    { frenchName: "decembre", englishName: "december" }
];

const seasonsData = [
    { frenchName: "printemps", englishMonths: ["march 20", "june 20"] },
    { frenchName: "ete", englishMonths: ["june 21", "september 21"] },
    { frenchName: "automne", englishMonths: ["september 22", "december 20"] },
    { frenchName: "hiver", englishMonths: ["december 21", "march 19"] }
];

function convertStringToDate(dateString: string): Date[] | null {
    dateString = dateString.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

    const fullFrenchDate = dateString.match(/(\d{1,2})[a-z]{0,3}\s([a-z]{3,9})\s(\d{4})/);
    if (fullFrenchDate) {
        const [_, day, frenchMonth, year] = fullFrenchDate;
        const month = monthsData.find((m) => m.frenchName === frenchMonth)?.englishName;
        const date = new Date(`${month} ${day} ${year}`);
        return [date];
    }

    const frenchPeriodDate = dateString.match(/([a-z]{3,9})\s(\d{4})/);
    if (frenchPeriodDate) {
        const [_, frenchPeriod, year] = frenchPeriodDate;
        const month = monthsData.find((m) => m.frenchName === frenchPeriod)?.englishName;
        if (!month) {
            const season = seasonsData.find((s) => s.frenchName === frenchPeriod);
            if (season) {
                return season.englishMonths.map((m) => new Date(`${m} ${year}`));
            }
            return null;
        }
        const date = new Date(`${month} ${year}`);
        return [date];
    }

    const rawYears = dateString.split("-");
    return rawYears.map(rawYear => {
        const yearRgx = rawYear.match(/\d{4}/);
        if (yearRgx) {
            const [year] = yearRgx;
            return new Date(year);
        }
        return;
    }).filter((date): date is Date => date instanceof Date);
}

export const fetchData = async () => {
    const res = await fetch(SHEETS_URL);
    const csvText = await res.text();
    let cardsData: Card[] = [];

    const json = parse(csvText, {
        columns: true,
        skip_empty_lines: true
    });

    const cleaned = json.filter((item: Record<string, string>) =>
        Object.entries(item).some(([key, value]) => key !== 'thematique' && (value as string).trim() !== '')
    );

    let id = 1;
    cleaned.forEach((item: Record<string, string>) => {
        const cardData: Card = {
            id,
            title: item['titre'],
            type: item['type'],
            thematic: item['thematique'],
            description: item['description'],
            textDate: item['date'],
            dates: convertStringToDate(item['date']) || []
        };

        cardsData.push(cardData);
        id++;
    });

    return cardsData;
};