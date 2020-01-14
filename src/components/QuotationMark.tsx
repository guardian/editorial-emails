import React from "react";
import { Pillar } from "../api";
import { ImageCSS } from "../css";
import { pillarProps } from "../utils/pillarProps";

interface Props {
    pillar?: Pillar;
    shouldUseWhite?: boolean;
}

const quoteIconStyle: ImageCSS = {
    height: "0.8em",
    display: "inline-block",
    border: "0"
};

// Compute which image source to use;
// 'shouldUseWhite' takes precedence over pillar
// With 'culture' (i.e. 'Arts') being the fallback when no pillar available
const getQuotationImgSrc = (pillar: Pillar, shouldUseWhite: boolean) => {
    if (shouldUseWhite) {
        return "https://static.guim.co.uk/editorial-emails/quotes/white-quote-3x.png";
    }

    if (pillar && pillarProps[pillar]) {
        return pillarProps[pillar].quote;
    }

    return pillarProps.Arts.quote;
};

export const QuotationMark: React.FC<Props> = ({ pillar, shouldUseWhite }) => (
    <>
        <img
            height={"14"}
            style={quoteIconStyle}
            src={getQuotationImgSrc(pillar, shouldUseWhite)}
            alt="quote icon"
        />{" "}
    </>
);
