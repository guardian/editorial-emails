import React from "react";
import sanitizeHtml from "sanitize-html";
import { FontCSS, TdCSS, ImageCSS } from "../../css";
import { sanitizeOptions } from "../../utils/sanitizeOptions";
import { pillarProps } from "../../utils/pillarProps";
import { palette } from "@guardian/src-foundations";
import { Content } from "../../api";
import { kickerText } from "../../kicker";
import { Headline } from "../../components/Headline";
import { headline } from "../../styles/typography";
import { Table, TableRowCell } from "../../layout/Table";

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
        } solid ${borderColor || pillarColour || palette.culture.main}`
    };
};

const metaWrapperStyle = (layout: string): TdCSS => {
    const sidePadding = layout === "compact" ? "0" : "10px";
    return {
        width: "100%",
        padding: `3px ${sidePadding} 20px ${sidePadding}`
    };
};

const expandedWrapperStyle: TdCSS = {
    padding: "3px 10px 20px 10px"
};

const trailTextStyle: FontCSS = {
    ...headline({ level: 1 }),
    color: palette.neutral[7]
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
    showArrow?: boolean;
}

const brazeParameter = "?##braze_utm##";

const imgStyles: ImageCSS = {
    verticalAlign: "middle",
    border: "0"
};

const arrowColStyles = {
    width: "23px",
    padding: "0 10px",
    verticalAlign: "middle"
};

export const HeadlineCard: React.FC<Props> = ({
    content,
    backgroundColor,
    showPillarColours,
    borderWidth,
    layout,
    showUseWhite,
    borderColor,
    showArrow
}) => {
    const { headline } = content.header;
    const { trailText } = content.card;
    const backfillURL = content.properties.webUrl + brazeParameter;
    const curatedURL = `https://www.theguardian.com${content.properties.href}${brazeParameter}`;

    const cardLink = content.properties.webUrl ? backfillURL : curatedURL;

    const showQuotation = content.display.showQuotedHeadline;
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
        <TableRowCell
            tdStyle={tdStyle(
                backgroundColor,
                pillarColour,
                borderWidth,
                borderColor
            )}
        >
            <Table>
                <tr>
                    <td className="m-col-pad" style={metaWrapperStyle(layout)}>
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
                    {showArrow && (
                        <td style={arrowColStyles}>
                            <a href={cardLink}>
                                <img
                                    style={imgStyles}
                                    src="https://cdn.braze.eu/appboy/communication/assets/image_assets/images/5dcebdcb9ae1683cc77465a5/original.png?1573830091"
                                    width="23"
                                    height="22"
                                    alt=""
                                />
                            </a>
                        </td>
                    )}
                </tr>
                {layout === "expanded" && trailText && (
                    <tr>
                        <td
                            className="m-col-pad"
                            style={expandedWrapperStyle}
                            colSpan={showArrow ? 2 : null}
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
            </Table>
        </TableRowCell>
    );
};
