import React from "react";
import sanitizeHtml from "sanitize-html";
import { FontCSS, TdCSS, TableCSS } from "../../css";
import { sanitizeOptions } from "../../utils/sanitizeOptions";
import { pillarProps } from "../../utils/pillarProps";
import { palette } from "@guardian/src-foundations";
import { Content } from "../../api";
import { kickerText } from "../../kicker";
import { Headline } from "../../components/Headline";

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

const trailTextStyle: FontCSS = {
    fontFamily: "'GH Guardian Headline', Georgia, serif",
    fontWeight: 400,
    color: palette.neutral[7],
    ...fontSizes.small
};

interface Props {
    content: Content;
    backgroundColor?: string;
    showPillarColours?: boolean;
    showTrailText?: boolean;
    borderWidth?: "thin" | "thick";
    layout?: "expanded" | "compact";
    showUseWhite?: boolean;
    borderColor?: string;
}

const brazeParameter = "?##braze_utm##";

export const HeadlineCard: React.FC<Props> = ({
    content,
    backgroundColor,
    showPillarColours,
    borderWidth,
    layout,
    showUseWhite,
    borderColor
}) => {
    const { headline } = content.header;
    const { trailText } = content.card;
    const backfillURL = content.properties.webUrl + brazeParameter;
    const showQuotation = content.display.showQuotedHeadline;
    const curatedURL = content.properties.href + brazeParameter;

    const cardLink = content.properties.webUrl ? backfillURL : curatedURL;

    const pillar = content.properties.maybeContent
        ? content.properties.maybeContent.metadata.pillar.name
        : null;
    const pillarColour = pillar ? pillarProps[pillar].colour : null;

    const { showByline } = content.properties;
    const byline =
        showByline && content.properties.byline
            ? content.properties.byline
            : "";

    const kicker = content.header.kicker
        ? kickerText(content.header.kicker)
        : "";

    const size = layout === "expanded" ? "large" : "small";

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
                                <Headline
                                    text={headline}
                                    linkTo={cardLink}
                                    size={size}
                                    shouldUseWhite={showUseWhite}
                                    pillar={showPillarColours ? pillar : null}
                                    kicker={kicker}
                                    byline={byline}
                                    showQuotation={showQuotation}
                                />
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
