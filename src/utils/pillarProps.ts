import { palette } from "@guardian/src-foundations";

export interface PillarType {
    colour?: string;
    quote?: string;
}

export const pillarProps = {
    News: {
        colour: palette.news.main,
        quote:
            "https://static.guim.co.uk/editorial-emails/quotes/quote-news.png"
    },
    Opinion: {
        colour: palette.opinion.main,
        quote:
            "https://static.guim.co.uk/editorial-emails/quotes/quote-opinion.png"
    },
    Sport: {
        colour: palette.sport.main,
        quote:
            "https://static.guim.co.uk/editorial-emails/quotes/quote-sport.png"
    },
    Arts: {
        colour: palette.culture.main,
        quote:
            "https://static.guim.co.uk/editorial-emails/quotes/quote-culture.png"
    },
    Lifestyle: {
        colour: palette.lifestyle.main,
        quote:
            "https://static.guim.co.uk/editorial-emails/quotes/quote-lifestyle.png"
    }
};
