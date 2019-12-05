import React from "react";
import sanitizeHtml from "sanitize-html";
import { palette } from "@guardian/src-foundations";
import { FontCSS, TdCSS, TableCSS } from "../../css";
import { sanitizeOptions } from "../../utils/sanitizeOptions";
import { Content } from "../../api";
import { formatImage } from "../../image";
import { kickerText } from "../../kicker";
import { Headline } from "../../components/Headline";
import { Image } from "../../components/Image";

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

const tdStyle = (backgroundColor: string): TdCSS => {
    return {
        padding: "0",
        backgroundColor: backgroundColor || "transparent"
    };
};

const headlineCellStyle = {
    width: "93%",
    backgroundColor: palette.neutral[7],
    padding: "3px 40px 20px 10px"
};

const blankCellStyle = {
    width: "7%"
};

const trailTextStyle: FontCSS = {
    fontFamily: "'GH Guardian Headline', Georgia, serif",
    ...fontSizes.small,
    fontWeight: 400
};

const trailTextPadding: TdCSS = {
    padding: "6px 10px 20px 10px"
};

interface Props {
    content: Content;
    salt: string;
    backgroundColor?: string;
    layout?: "expanded" | "compact";
}

const brazeParameter = "?##braze_utm##";

export const OverlayCard: React.FC<Props> = ({
    content,
    salt,
    backgroundColor,
    layout
}) => {
    const image =
        content.properties.maybeContent.trail.trailPicture.allImages[0];
    const formattedImage = formatImage(
        image.url,
        salt,
        600,
        content.card.starRating
    );

    const { headline } = content.header;
    const { trailText } = content.card;

    const webURL = content.properties.webUrl + brazeParameter;
    const imageURL = formattedImage;
    const imageAlt = content.header.headline;
    const showQuotation = content.display.showQuotedHeadline;

    const pillar = content.properties.maybeContent
        ? content.properties.maybeContent.metadata.pillar.name
        : null;

    const kicker = content.header.kicker
        ? kickerText(content.header.kicker)
        : "";

    return (
        <table style={tableStyle}>
            <tr>
                <td style={tdStyle(backgroundColor)}>
                    <table style={tableStyle}>
                        {imageURL && (
                            <tr>
                                {/*
                    // @ts-ignore as JSX expects 'colSpan' but HTML only validates if used as 'colspan' */}
                                <td
                                    colspan={layout === "compact" ? null : 2}
                                    style={{ padding: 0 }}
                                >
                                    <Image
                                        src={imageURL}
                                        alt={imageAlt}
                                        width={600}
                                        pillar={pillar}
                                        linkTo={webURL}
                                    />
                                </td>
                            </tr>
                        )}

                        <tr>
                            <td className="m-pad" style={headlineCellStyle}>
                                <Headline
                                    text={headline}
                                    linkTo={webURL}
                                    size="large"
                                    shouldUseWhite
                                    kicker={kicker}
                                    showQuotation={showQuotation}
                                />
                            </td>
                            {layout !== "compact" && (
                                <td style={blankCellStyle}>&nbsp;</td>
                            )}
                        </tr>

                        {layout !== "compact" && (
                            <tr>
                                {/*
                    // @ts-ignore as JSX expects 'colSpan' but HTML only validates if used as 'colspan' */}
                                <td
                                    colspan={2}
                                    className="m-col-pad"
                                    style={trailTextPadding}
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
