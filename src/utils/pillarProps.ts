import { palette } from "@guardian/src-foundations";

export interface PillarType {
    colour?: string;
    faded?: string;
    quote?: string;
    circle?: string;
}

export const pillarProps: any = {
    News: {
        colour: palette.news.main,
        faded: palette.news.faded,
        quote:
            "https://static.guim.co.uk/editorial-emails/quotes/quote-news.png",
        circle:
            "https://static.guim.co.uk/editorial-emails/circles/news-main.png"
    },
    Opinion: {
        colour: palette.opinion.main,
        faded: palette.opinion.faded,
        quote:
            "https://static.guim.co.uk/editorial-emails/quotes/quote-opinion.png",
        circle:
            "https://static.guim.co.uk/editorial-emails/circles/opinion-main.png"
    },
    Sport: {
        colour: palette.sport.main,
        faded: palette.sport.faded,
        quote:
            "https://static.guim.co.uk/editorial-emails/quotes/quote-sport.png",
        circle:
            "https://static.guim.co.uk/editorial-emails/circles/sport-main.png"
    },
    Arts: {
        colour: palette.culture.main,
        faded: palette.culture.faded,
        quote:
            "https://static.guim.co.uk/editorial-emails/quotes/quote-culture.png",
        circle:
            "https://static.guim.co.uk/editorial-emails/circles/culture-main.png"
    },
    Lifestyle: {
        colour: palette.lifestyle.main,
        faded: palette.lifestyle.faded,
        quote:
            "https://static.guim.co.uk/editorial-emails/quotes/quote-lifestyle.png",
        circle:
            "https://static.guim.co.uk/editorial-emails/circles/lifestyle-main.png"
    }
};
