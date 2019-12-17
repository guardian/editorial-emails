import React from "react";
import { FontCSS } from "../css";
import { Pillar } from "../api";
import { pillarProps } from "../utils/pillarProps";
import { palette } from "@guardian/src-foundations";
import { headline } from "../styles/typography";

type Size = "small" | "large";

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
    const level = size === "large" ? 2 : 1;

    return {
        ...headline({ level, fontWeight: "bold" }),
        color: getKickerColour(pillar, colour)
    };
};

interface Props {
    text: string;
    pillar?: Pillar;
    size?: Size;
    colour?: string;
    isLive?: boolean;
}

export const Kicker: React.FC<Props> = ({
    text,
    pillar,
    size,
    colour,
    isLive
}) => {
    return (
        <span style={kickerStyle(size, pillar, colour)}>{`${text} / `}</span>
    );
};
