import React from "react";
import sanitizeHtml from "sanitize-html";
import { palette } from "@guardian/src-foundations";
import { FontCSS, TdCSS, TableCSS, ImageCSS } from "../../css";
import { sanitizeOptions } from "../../styles/sanitize-options";
import { Content } from "../../api";
import { formatImage } from "../../image";
import { kickerText } from "../../kicker";

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

const imgStyle: ImageCSS = {
    outline: "none",
    textDecoration: "none",
    maxWidth: "100%",
    clear: "both",
    display: "block",
    border: "0",
    width: "100%",
    fontFamily: "Georgia, serif",
    color: palette.culture.main
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

const linkStyle: FontCSS = {
    textDecoration: "none"
};

const headlineStyle = {
    color: palette.neutral[100],
    fontFamily: "'GH Guardian Headline', Georgia, serif",
    fontWeight: 400,
    ...fontSizes.large
};

const kickerStyle = {
    color: palette.neutral[100],
    fontFamily: "'GH Guardian Headline', Georgia, serif",
    fontWeight: 700,
    ...fontSizes.large
};

const trailTextStyle: FontCSS = {
    fontFamily: "'GH Guardian Headline', Georgia, serif",
    ...fontSizes.small,
    fontWeight: 400
};

const trailTextPadding: TdCSS = {
    padding: "10px 10px 20px 10px"
};

const quoteIconStyle: ImageCSS = {
    height: "0.8em",
    display: "inline-block",
    border: "0"
};

interface Props {
    content: Content;
    salt: string;
    backgroundColor?: string;
}

const brazeParameter = "?##braze_utm##";

export const OverlayCard: React.FC<Props> = ({
    content,
    salt,
    backgroundColor
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
    const imageAlt = image.fields.altText;
    const isComment = content.display.showQuotedHeadline;

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
                                <td style={{ padding: 0 }} colSpan={2}>
                                    <a href={webURL}>
                                        <img
                                            width={600}
                                            style={imgStyle}
                                            alt={imageAlt}
                                            src={imageURL}
                                        />
                                    </a>
                                </td>
                            </tr>
                        )}

                        <tr>
                            <td className="m-pad" style={headlineCellStyle}>
                                <a style={linkStyle} href={webURL}>
                                    {kicker && (
                                        <span style={kickerStyle}>
                                            {kicker + " / "}
                                        </span>
                                    )}
                                    <span style={headlineStyle}>
                                        {isComment && (
                                            <>
                                                <img
                                                    height={"14"}
                                                    style={quoteIconStyle}
                                                    src="https://assets.guim.co.uk/images/email/icons/9682728db696148fd5a6b149e556df8c/quote-culture.png"
                                                    alt="quote icon"
                                                />{" "}
                                            </>
                                        )}
                                        {headline}
                                    </span>
                                </a>
                            </td>
                            <td style={blankCellStyle}>&nbsp;</td>
                        </tr>
                        <tr>
                            <td
                                className="m-col-pad"
                                style={trailTextPadding}
                                colSpan={2}
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
                    </table>
                </td>
            </tr>
        </table>
    );
};
