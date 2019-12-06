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

export const headline = ({ level, lineHeight, fontWeight }: FontArgs): Font => {
    const strProperties = srcHeadline({ level, lineHeight, fontWeight });
    return fontAsObj(strProperties);
};

export const textBody = ({ level, lineHeight, fontWeight }: FontArgs): Font => {
    const strProperties = srcTextBody({ level, lineHeight, fontWeight });
    return fontAsObj(strProperties);
};

export const textSans = ({ level, lineHeight, fontWeight }: FontArgs): Font => {
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
