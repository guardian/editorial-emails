import React from "react";
import { Pillar } from "../api";
import { ImageCSS } from "../css";
// import { pillarProps, PillarType } from "../utils/pillarProps";
// import { pillarProps } from "../utils/pillarProps";
// import { palette } from "@guardian/src-foundations";

interface Props {
    pillar?: Pillar;
    colour?: string;
}

const quoteIconStyle: ImageCSS = {
    height: "0.8em",
    display: "inline-block",
    border: "0"
};

// default arts/culture

export const QuotationMark: React.FC<Props> = ({ pillar, colour }) => {
    const imageSrc =
        "https://assets.guim.co.uk/images/email/icons/cc614106682d8de187a64eb222116f3a/quote-culture.png";

    return (
        <>
            <img
                height={"14"}
                style={quoteIconStyle}
                src={imageSrc}
                alt="quote icon"
            />{" "}
        </>
    );
};
