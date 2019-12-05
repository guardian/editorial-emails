import React from "react";
import { FontCSS } from "../css";
import { Pillar } from "../api";
import { pillarProps } from "../utils/pillarProps";
import { palette } from "@guardian/src-foundations";
import { Kicker } from "../components/Kicker";
import { QuotationMark } from "../components/QuotationMark";

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

const linkStyle: FontCSS = {
    textDecoration: "none"
};

const headlineStyle = (size: Size, shouldUseWhite: boolean): FontCSS => {
    return {
        fontFamily: "'GH Guardian Headline', Georgia, serif",
        ...fontSizes[size],
        fontWeight: 500,
        color: shouldUseWhite ? palette.neutral[100] : palette.neutral[7]
    };
};

const bylineStyle = (
    size: Size,
    pillar: Pillar,
    shouldUseWhite: boolean
): FontCSS => {
    const bylineColour =
        pillar && pillarProps[pillar]
            ? pillarProps[pillar].colour
            : palette.culture.main;

    return {
        fontFamily: "'GH Guardian Headline', Georgia, serif",
        ...fontSizes[size],
        fontStyle: "italic",
        color: shouldUseWhite ? palette.neutral[100] : bylineColour
    };
};

interface Props {
    text: string;
    linkTo: string;
    pillar?: Pillar;
    size?: Size;
    shouldUseWhite?: boolean;
    kicker?: string;
    byline?: string;
    showQuotation?: boolean;
}

export const Headline: React.FC<Props> = ({
    text,
    linkTo,
    pillar,
    size,
    shouldUseWhite,
    kicker,
    byline,
    showQuotation
}) => {
    const textSize = size === "small" ? "small" : "large";
    return (
        <a style={linkStyle} href={linkTo}>
            {kicker && (
                <Kicker
                    text={kicker}
                    size={textSize}
                    pillar={pillar}
                    colour={shouldUseWhite ? palette.neutral[100] : null}
                />
            )}

            <span style={headlineStyle(textSize, shouldUseWhite)}>
                {showQuotation && <QuotationMark pillar={pillar} />}
                {text}
            </span>

            {byline && (
                <>
                    <br />
                    <span style={bylineStyle(textSize, pillar, shouldUseWhite)}>
                        {byline}
                    </span>
                </>
            )}
        </a>
    );
};
