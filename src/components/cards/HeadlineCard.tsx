import React from "react";
import { FontCSS, TdCSS, TableCSS, ImageCSS } from "../../css";
import { palette } from "@guardian/src-foundations";
import { Content, Pillar } from "../../api";
import { kickerText } from "../../kicker";

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

const tableStyle: TableCSS = {
    borderSpacing: 0,
    borderCollapse: "collapse",
    width: "100%"
};

const tdStyle = (
    backgroundColor: string,
    pillarColour: string,
    borderWidth?: string
): TdCSS => {
    return {
        backgroundColor: backgroundColor || palette.culture.faded,
        borderTop: `${
            borderWidth === "thin" ? "1px" : "2px"
        } solid ${pillarColour || palette.culture.main}`,
        padding: "0"
    };
};

const metaWrapperStyle: TdCSS = {
    padding: `3px 10px 20px 10px`
};

const linkStyle: FontCSS = {
    textDecoration: "none"
};

const headlineStyle = (expandedLayout: boolean): FontCSS => {
    const fontSizeProp = expandedLayout ? "large" : "small";
    return {
        fontFamily: "'GH Guardian Headline', Georgia, serif",
        color: palette.neutral[7],
        ...fontSizes[fontSizeProp],
        fontWeight: 400
    };
};

const kickerStyle = (pillarColour: string): FontCSS => {
    return {
        fontFamily: "'GH Guardian Headline', Georgia, serif",
        color: pillarColour || palette.culture.main,
        ...fontSizes.small,
        fontWeight: 700
    };
};

const bylineStyle = (pillarColour: string): FontCSS => {
    return {
        fontFamily: "'GH Guardian Headline', Georgia, serif",
        color: pillarColour || palette.culture.main,
        ...fontSizes.small,
        fontStyle: "italic"
    };
};

const trailTextStyle: FontCSS = {
    fontFamily: "'GH Guardian Headline', Georgia, serif",
    fontWeight: 400,
    color: palette.neutral[7],
    ...fontSizes.small
};

const bottomPaddingStyle: TdCSS = {
    paddingBottom: "12px"
};

const quoteIconStyle: ImageCSS = {
    height: "0.8em",
    display: "inline-block",
    border: "0"
};

type PillarTheme = {
    colour?: string;
    quote?: string;
};

const pillarTheme = {
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

interface Props {
    content: Content;
    backgroundColor?: string;
    showPillarColours?: boolean;
    showTrailText?: boolean;
    borderWidth?: "thin" | "thick";
    expandedLayout?: boolean;
}

const brazeParameter = "?##braze_utm##";

export const HeadlineCard: React.FC<Props> = ({
    content,
    backgroundColor,
    showPillarColours,
    borderWidth,
    expandedLayout
}) => {
    const { headline } = content.header;
    const { byline } = content.properties;
    const { trailText } = content.card;
    const webURL = content.properties.webUrl + brazeParameter;
    const isComment = content.display.showQuotedHeadline;

    let pillar: PillarTheme = {};
    if (showPillarColours && content.properties.maybeContent) {
        const pillarName = content.properties.maybeContent.metadata.pillar.name;
        pillar = pillarTheme[pillarName];
    }

    const kicker = content.header.kicker
        ? kickerText(content.header.kicker)
        : "";

    return (
        <table style={tableStyle}>
            <tr>
                <td
                    style={tdStyle(backgroundColor, pillar.colour, borderWidth)}
                >
                    <table style={tableStyle}>
                        <tr>
                            <td className="m-col-pad" style={metaWrapperStyle}>
                                <a style={linkStyle} href={webURL}>
                                    {kicker && (
                                        <span
                                            style={kickerStyle(pillar.colour)}
                                        >
                                            {kicker + " / "}
                                        </span>
                                    )}
                                    <span style={headlineStyle(expandedLayout)}>
                                        {isComment && (
                                            <>
                                                <img
                                                    height={"14"}
                                                    style={quoteIconStyle}
                                                    src={
                                                        pillar.quote
                                                            ? pillar.quote
                                                            : pillarTheme.Arts
                                                                  .quote
                                                    }
                                                    alt="quote icon"
                                                />{" "}
                                            </>
                                        )}
                                        {headline}
                                    </span>
                                    <br />
                                    {content.properties.showByline && (
                                        <span
                                            style={bylineStyle(pillar.colour)}
                                        >
                                            {byline}
                                        </span>
                                    )}
                                </a>
                            </td>
                        </tr>
                        {expandedLayout && trailText && (
                            <tr>
                                <td
                                    className="m-col-pad"
                                    style={metaWrapperStyle}
                                >
                                    <span style={trailTextStyle}>
                                        {trailText}
                                    </span>
                                </td>
                            </tr>
                        )}
                    </table>
                </td>
            </tr>
        </table>
    );
};
