import { palette } from "@guardian/src-foundations";

export type PillarType = {
    colour?: string;
    quote?: string;
};

export const pillarTheme = {
    News: {
        colour: palette.news.main,
        quote:
            "https://assets.guim.co.uk/images/email/icons/64855e3409f4927c771a5aca921997e4/quote-news.png"
    },
    Opinion: {
        colour: palette.opinion.main,
        quote:
            "https://assets.guim.co.uk/images/email/icons/cc614106682d8de187a64eb222116f3a/quote-opinion.png"
    },
    Sport: {
        colour: palette.sport.main,
        quote:
            "https://assets.guim.co.uk/images/email/icons/b4b9407f64d0305ff1cc9a9b95524411/quote-sport.png"
    },
    Arts: {
        colour: palette.culture.main,
        quote:
            "https://assets.guim.co.uk/images/email/icons/9682728db696148fd5a6b149e556df8c/quote-culture.png"
    },
    Lifestyle: {
        colour: palette.lifestyle.main,
        quote:
            "https://assets.guim.co.uk/images/email/icons/88c54a3c173085cf29899be2d60d1480/quote-lifestyle.png"
    }
};
