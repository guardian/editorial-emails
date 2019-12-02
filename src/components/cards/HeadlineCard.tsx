import React from "react";
import sanitizeHtml from "sanitize-html";
import { FontCSS, TdCSS, TableCSS, ImageCSS } from "../../css";
import { sanitizeOptions } from "../../utils/sanitizeOptions";
import { pillarProps, PillarType } from "../../utils/pillarProps";
import { palette } from "@guardian/src-foundations";
import { Content, Pillar } from "../../api";
import { kickerText } from "../../kicker";
import { Kicker } from "../../components/Kicker";
import { QuotationMark } from "../../components/QuotationMark";

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
    borderWidth?: string,
    borderColor?: string
): TdCSS => {
    return {
        backgroundColor: backgroundColor || "transparent",
        borderTop: `${
            borderWidth === "thin" ? "1px" : "2px"
        } solid ${borderColor || pillarColour || palette.culture.main}`,
        padding: "0"
    };
};

const metaWrapperStyle = (layout: string): TdCSS => {
    const sidePadding = layout === "compact" ? "0" : "10px";
    return {
        padding: `3px ${sidePadding} 20px ${sidePadding}`
    };
};

const expandedWrapperStyle: TdCSS = {
    padding: "3px 10px 20px 10px"
};

const linkStyle: FontCSS = {
    textDecoration: "none"
};

const headlineStyle = (layout: string, color: string): FontCSS => {
    const fontSizeProp = layout === "expanded" ? "large" : "small";
    return {
        fontFamily: "'GH Guardian Headline', Georgia, serif",
        color: color || palette.neutral[7],
        ...fontSizes[fontSizeProp],
        fontWeight: 400
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
    layout?: "expanded" | "compact";
    colour?: string;
    borderColor?: string;
}

const brazeParameter = "?##braze_utm##";

export const HeadlineCard: React.FC<Props> = ({
    content,
    backgroundColor,
    showPillarColours,
    borderWidth,
    layout,
    colour,
    borderColor
}) => {
    const { headline } = content.header;
    const { byline } = content.properties;
    const { trailText } = content.card;
    const backfillURL = content.properties.webUrl + brazeParameter;
    const isComment = content.display.showQuotedHeadline;
    const curatedURL = content.properties.href + brazeParameter;

    const cardLink = content.properties.webUrl ? backfillURL : curatedURL;

    const pillar = content.properties.maybeContent
        ? content.properties.maybeContent.metadata.pillar.name
        : null;
    const pillarColour = pillar ? pillarProps[pillar].colour : null;
    // const pillarQuote = pillar ? pillarProps[pillar].quote : null;

    const kicker = content.header.kicker
        ? kickerText(content.header.kicker)
        : "";

    return (
        <table style={tableStyle}>
            <tr>
                <td
                    style={tdStyle(
                        backgroundColor,
                        pillarColour,
                        borderWidth,
                        borderColor
                    )}
                >
                    <table style={tableStyle}>
                        <tr>
                            <td
                                className="m-col-pad"
                                style={metaWrapperStyle(layout)}
                            >
                                <a style={linkStyle} href={cardLink}>
                                    {kicker && (
                                        <Kicker
                                            text={kicker}
                                            size="small"
                                            colour={colour}
                                            pillar={
                                                showPillarColours
                                                    ? pillar
                                                    : null
                                            }
                                        />
                                    )}

                                    <span style={headlineStyle(layout, colour)}>
                                        {/* {isComment && (
                                            <>
                                                <img
                                                    height={"14"}
                                                    style={quoteIconStyle}
                                                    src={
                                                        pillarQuote
                                                            ? pillarQuote
                                                            : pillarProps.Arts
                                                                  .quote
                                                    }
                                                    alt="quote icon"
                                                />{" "}
                                            </>
                                        )} */}
                                        {isComment && (
                                            <QuotationMark pillar={pillar} />
                                        )}
                                        {headline}
                                    </span>
                                    <br />
                                    {content.properties.showByline && (
                                        <span style={bylineStyle(pillarColour)}>
                                            {byline}
                                        </span>
                                    )}
                                </a>
                            </td>
                        </tr>
                        {layout === "expanded" && trailText && (
                            <tr>
                                <td
                                    className="m-col-pad"
                                    style={expandedWrapperStyle}
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
