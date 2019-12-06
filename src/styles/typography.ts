// Used to convert src-foundation font declarations, which are string-based,
// into objects we can use for style attributes

import {
    headline as srcHeadline,
    body as srcTextBody,
    textSans as srcTextSans
} from "@guardian/src-foundations";

interface Font {
    fontFamily: string;
    fontSize: string;
    lineHeight: string;
    fontWeight: number;
}

interface FontArgs {
    level: number;
    lineHeight?: "tight" | "regular" | "loose";
    fontWeight?: "light" | "regular" | "medium" | "bold";
}

// Export a local replacement for typography helpers in @src-foundations until we've agreed to standardise
// our font sizes and line heights with theirs.
// We're keeping all these 3 helpers as separate functions to mirror how @src-foundations exposes them,
// enventually making it simple to just delete all our helpers and revert back to using the design system's.
export const headline = ({
    level = 1,
    fontWeight = "regular"
}: FontArgs): Font => {
    return {
        fontFamily: "GH Guardian Headline, Georgia, serif",
        ...getLevelStyles({ level }),
        ...fontWeightStyles[fontWeight]
    };
};

export const textBody = ({
    level = 1,
    fontWeight = "regular"
}: FontArgs): Font => {
    return {
        fontFamily: "Guardian Text Egyptian, Georgia, serif",
        ...getLevelStyles({ level }),
        ...fontWeightStyles[fontWeight]
    };
};

export const textSans = ({
    level = 1,
    fontWeight = "regular"
}: FontArgs): Font => {
    return {
        fontFamily: "Guardian Text Sans",
        ...getLevelStyles({ level }),
        ...fontWeightStyles[fontWeight]
    };
};

// Locally map a fontWeight to an actual value
const fontWeightStyles = {
    light: {
        fontWeight: "300"
    },
    regular: {
        fontWeight: "500"
    },
    medium: {
        fontWeight: "500"
    },
    bold: {
        fontWeight: "700"
    }
};

// Locally map a fontSize & lineHeight to actual values
const getLevelStyles = ({ level }: FontArgs): any => {
    switch (level) {
        case 2:
            return {
                fontSize: "22px",
                lineHeight: "26px"
            };
        default:
            return {
                fontSize: "16px",
                lineHeight: "20px"
            };
    }
};

// Export Design System headline/textBody/textSans under a different name
// Makes it clear when using a local typography helper or a @src-foundations helper
export const guHeadline = ({
    level,
    lineHeight,
    fontWeight
}: FontArgs): Font => {
    const strProperties = srcHeadline({ level, lineHeight, fontWeight });
    return fontAsObj(strProperties);
};

export const guTextBody = ({
    level,
    lineHeight,
    fontWeight
}: FontArgs): Font => {
    const strProperties = srcTextBody({ level, lineHeight, fontWeight });
    return fontAsObj(strProperties);
};

export const guTextSans = ({
    level,
    lineHeight,
    fontWeight
}: FontArgs): Font => {
    const strProperties = srcTextSans({ level, lineHeight, fontWeight });
    return fontAsObj(strProperties);
};

const fontAsObj = (str: string): Font => {
    const propsArray = str
        .split(";")
        .slice(0, -1) // drop after last ';'
        .map(s => s.trim())
        .map(s => s.replace("\n", ""));

    const font = {
        fontFamily: "",
        fontSize: "",
        fontWeight: 400,
        lineHeight: ""
    };

    propsArray.map(property => {
        const [key, value] = property.split(":");
        const trValue = value.trim();
        switch (key.trim()) {
            case "font-family":
                font.fontFamily = trValue;
            case "font-size":
                font.fontSize = trValue;
            case "line-height":
                font.lineHeight = trValue;
            case "font-weight":
                font.fontWeight = parseInt(trValue, 10);
        }
    });

    return font;
};
