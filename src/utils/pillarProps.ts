import { palette } from "@guardian/src-foundations";

export interface PillarType {
    colour?: string;
    quote?: string;
}

export const pillarProps = {
    News: {
        colour: palette.news.main,
        quote:
            "https://static.guim.co.uk/editorial-emails/quotes/quote-news.png",
        circle:
            "https://static.guim.co.uk/editorial-emails/circles/news-main.png"
    },
    Opinion: {
        colour: palette.opinion.main,
        quote:
            "https://static.guim.co.uk/editorial-emails/quotes/quote-opinion.png",
        circle:
            "https://static.guim.co.uk/editorial-emails/circles/opinion-main.png"
    },
    Sport: {
        colour: palette.sport.main,
        quote:
            "https://static.guim.co.uk/editorial-emails/quotes/quote-sport.png",
        circle:
            "https://static.guim.co.uk/editorial-emails/circles/sport-main.png"
    },
    Arts: {
        colour: palette.culture.main,
        quote:
            "https://static.guim.co.uk/editorial-emails/quotes/quote-culture.png",
        circle:
            "https://static.guim.co.uk/editorial-emails/circles/culture-main.png"
    },
    Lifestyle: {
        colour: palette.lifestyle.main,
        quote:
            "https://static.guim.co.uk/editorial-emails/quotes/quote-lifestyle.png",
        circle:
            "https://static.guim.co.uk/editorial-emails/circles/lifestyle-main.png"
    }
};
