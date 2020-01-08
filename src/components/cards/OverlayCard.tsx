import React from "react";
import sanitizeHtml from "sanitize-html";
import { palette } from "@guardian/src-foundations";
import { FontCSS, TdCSS } from "../../css";
import { sanitizeOptions } from "../../utils/sanitizeOptions";
import { Pillar } from "../../api";
import { Headline } from "../../components/Headline";
import { Image } from "../../components/Image";
import { headline } from "../../styles/typography";
import { Table, TableRowCell } from "../../layout/Table";
import { pillarProps } from "../../utils/pillarProps";

const tdStyle = (backgroundColor: string): TdCSS => {
    return {
        backgroundColor: backgroundColor || "transparent"
    };
};

const headlineCellStyle = (isLive: boolean, pillar: Pillar): TdCSS => {
    return {
        width: "93%",
        backgroundColor: isLive
            ? pillarProps[pillar].colour
            : palette.neutral[7],
        padding: "3px 40px 20px 10px"
    };
};

const blankCellStyle = {
    width: "7%"
};

const trailTextStyle: FontCSS = {
    ...headline({ level: 1 })
};

const trailTextPadding = (isLive: boolean): TdCSS => {
    const padBottom = isLive ? "4px" : "20px";
    return {
        padding: `6px 10px ${padBottom} 10px`
    };
};

interface Props {
    headline: string;
    trailText: string;
    cardUrl: string;
    isComment?: boolean;
    pillar?: Pillar;
    kicker?: string;
    imageSrc?: string;
    imageAlt?: string;
    imageRating?: number;
    imageSalt?: string;
    backgroundColor?: string;
    layout?: "expanded" | "compact";
    isLive?: boolean;
}

export const OverlayCard: React.FC<Props> = ({
    headline,
    trailText,
    cardUrl,
    isComment = false,
    pillar,
    kicker,
    backgroundColor,
    imageSrc,
    imageAlt,
    imageRating = 1,
    imageSalt,
    layout = "compact",
    isLive = false
}) => (
    <TableRowCell tdStyle={tdStyle(backgroundColor)}>
        <Table>
            {imageSrc && (
                <tr>
                    {/*
                    // @ts-ignore as JSX expects 'colSpan' but HTML only validates if used as 'colspan' */}
                    <td
                        colspan={layout === "compact" ? null : 2}
                        style={{ padding: 0 }}
                    >
                        <Image
                            src={imageSrc}
                            alt={imageAlt}
                            width={600}
                            pillar={pillar}
                            linkTo={`${cardUrl}?##braze_utm##`}
                        />
                    </td>
                </tr>
            )}

            <tr>
                <td className="m-pad" style={headlineCellStyle(isLive, pillar)}>
                    <Headline
                        text={headline}
                        linkTo={`${cardUrl}?##braze_utm##`}
                        size="large"
                        pillar={pillar}
                        shouldUseWhite
                        kicker={kicker}
                        isLive={isLive}
                        showQuotation={isComment}
                    />
                </td>
                {layout !== "compact" && <td style={blankCellStyle}>&nbsp;</td>}
            </tr>

            {layout !== "compact" && (
                <tr>
                    {/*
                    // @ts-ignore as JSX expects 'colSpan' but HTML only validates if used as 'colspan' */}
                    <td
                        colspan={2}
                        className="m-col-pad"
                        style={trailTextPadding(isLive)}
                    >
                        {!isLive && (
                            <span
                                style={trailTextStyle}
                                dangerouslySetInnerHTML={{
                                    __html: sanitizeHtml(
                                        trailText,
                                        sanitizeOptions
                                    )
                                }}
                            />
                        )}
                    </td>
                </tr>
            )}
        </Table>
    </TableRowCell>
);
