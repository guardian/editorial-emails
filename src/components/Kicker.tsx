import React from "react";
import { FontCSS } from "../css";
import { Pillar } from "../api";
import { pillarProps } from "../utils/pillarProps";
import { palette } from "@guardian/src-foundations";

type Size = "small" | "large";

const fontSizes = {
    large: {
        fontSize: "22px",
        lineHeight: "26px"
    },
    small: {
        fontSize: "16px",
        lineHeight: "20px"
    }
};

const getKickerColour = (pillar: Pillar, colour: string) => {
    // If a colour is directly passed in, use it
    // Otherwise, if a valid pillar is passed in, use its colour
    // Default to the 'culture' pillar colour
    if (colour) {
        return colour;
    } else if (pillar && pillarProps[pillar]) {
        return pillarProps[pillar].colour;
    }

    return palette.culture.main;
};

const kickerStyle = (size: string, pillar: Pillar, colour: string): FontCSS => {
    const kickerSize = size === "large" ? size : "small";

    return {
        fontFamily: "'GH Guardian Headline', Georgia, serif",
        fontWeight: 700,
        color: getKickerColour(pillar, colour),
        ...fontSizes[kickerSize]
    };
};

interface Props {
    text: string;
    pillar?: Pillar;
    size?: Size;
    colour?: string;
}

export const Kicker: React.FC<Props> = ({ text, pillar, size, colour }) => {
    return (
        <span style={kickerStyle(size, pillar, colour)}>{`${text} / `}</span>
    );
};
