import React from "react";
import { FontCSS } from "../css";
import { Pillar } from "../api";
import { pillarProps } from "../utils/pillarProps";
import { palette } from "@guardian/src-foundations";
import { Kicker } from "../components/Kicker";
import { QuotationMark } from "../components/QuotationMark";
import { headline } from "../styles/typography";

type Size = "small" | "large";

const linkStyle: FontCSS = {
    textDecoration: "none"
};

const headlineStyle = (size: Size, shouldUseWhite: boolean): FontCSS => {
    const level = size === "large" ? 2 : 1;
    return {
        ...headline({ level }),
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

    const level = size === "large" ? 2 : 1;
    return {
        ...headline({ level }),
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
