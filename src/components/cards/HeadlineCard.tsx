import React from "react";
import sanitizeHtml from "sanitize-html";
import { FontCSS, TdCSS, ImageCSS } from "../../css";
import { sanitizeOptions } from "../../utils/sanitizeOptions";
import { pillarProps } from "../../utils/pillarProps";
import { Pillar } from "../../api";
import { palette } from "@guardian/src-foundations";
import { Headline } from "../../components/Headline";
import { headline } from "../../styles/typography";
import { Table, TableRowCell } from "../../layout/Table";

const tdStyle = (
    backgroundColor: string,
    pillar: string,
    borderWidth?: string,
    borderColor?: string
): TdCSS => {
    const pillarColour = pillar ? pillarProps[pillar].colour : null;

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

const imgStyles: ImageCSS = {
    verticalAlign: "middle",
    border: "0"
};

const arrowColStyles = {
    width: "23px",
    padding: "0 10px",
    verticalAlign: "middle"
};

interface Props {
    headline: string;
    trailText: string;
    cardUrl: string;
    isComment?: boolean;
    pillar?: Pillar;
    byline?: string;
    kicker?: string;
    backgroundColor?: string;
    showPillarColours?: boolean;
    showTrailText?: boolean;
    borderWidth?: "thin" | "thick";
    layout?: "expanded" | "compact";
    showUseWhite?: boolean;
    borderColor?: string;
    showArrow?: boolean;
}

export const HeadlineCard: React.FC<Props> = ({
    headline,
    trailText,
    cardUrl,
    isComment = false,
    pillar,
    byline,
    kicker,
    backgroundColor,
    showPillarColours,
    borderWidth = "thin",
    layout = "compact",
    showUseWhite = false,
    borderColor,
    showArrow = false
}) => {
    const size = layout === "expanded" ? "large" : "small";
    return (
        <TableRowCell
            tdStyle={tdStyle(backgroundColor, pillar, borderWidth, borderColor)}
        >
            <Table>
                <tr>
                    <td className="m-col-pad" style={metaWrapperStyle(layout)}>
                        <Headline
                            text={headline}
                            linkTo={`${cardUrl}?##braze_utm##`}
                            size={size}
                            shouldUseWhite={showUseWhite}
                            pillar={showPillarColours ? pillar : null}
                            kicker={kicker}
                            byline={byline}
                            showQuotation={isComment}
                        />
                    </td>
                    {showArrow && (
                        <td style={arrowColStyles}>
                            <a href={`${cardUrl}?##braze_utm##`}>
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
