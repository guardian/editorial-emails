import React from "react";
import sanitizeHtml from "sanitize-html";
import { FontCSS, TdCSS, TableCSS, ImageCSS } from "../../css";
import { sanitizeOptions } from "../../styles/sanitize-options";
import { pillarTheme, PillarType } from "../../styles/pillar-themes";
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
        fontWeight: 700,
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

    let pillar: PillarType = {};
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
                                    <span
                                        style={trailTextStyle}
                                        dangerouslySetInnerHTML={{
                                            __html: sanitizeHtml(
                                                trailText,
                                                sanitizeOptions
                                            )
                                        }}
                                    />
                                </td>
                            </tr>
                        )}
                    </table>
                </td>
            </tr>
        </table>
    );
};
