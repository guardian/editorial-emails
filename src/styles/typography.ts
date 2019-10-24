// Used to convert src-foundation font declarations, which are string-based,
// into objects we can use for style attributes

import { textSans as srcTextSans } from "@guardian/src-foundations";

interface Font {
    fontFamily: string;
    fontSize: string;
    lineHeight: string;
}

interface FontArgs {
    level: number;
    lineHeight?: "tight" | "regular" | "loose";
    fontWeight?: "light" | "regular" | "medium" | "bold";
}

export const textSans = ({ level, lineHeight, fontWeight }: FontArgs): Font => {
    const strProperties = srcTextSans({ level, lineHeight, fontWeight });

    const propsArray = strProperties
        .split(";")
        .slice(0, -1) // drop after last ';'
        .map(s => s.trim())
        .map(s => s.replace("\n", ""));

    let font = {
        fontFamily: "",
        fontSize: "",
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
        }
    });

    return font;
};
