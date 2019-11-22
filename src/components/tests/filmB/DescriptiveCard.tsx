import React from "react";
import sanitizeHtml from "sanitize-html";
import { FontCSS, TdCSS, TableCSS, ImageCSS } from "../../../css";
import { ContinueButton } from "../../ContinueButton";
import { palette } from "@guardian/src-foundations";
import { Content } from "../../../api";
import { formatImage } from "../../../image";
import { kickerText } from "../../../kicker";

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

const tdStyle: TdCSS = {
    backgroundColor: palette.culture.faded,
    borderTop: `2px solid ${palette.culture.main}`,
    padding: "0"
};

const metaWrapperStyle = (size: Size): TdCSS => {
    const rightPad = size === "large" ? "40px" : "10px";
    return {
        padding: `3px ${rightPad} 5px 10px`
    };
};

const cellPadding: TdCSS = {
    padding: `6px 10px 10px 10px`
};

const bottomPadding: TdCSS = {
    padding: `6px 10px 20px 10px`
};

const linkStyle: FontCSS = {
    textDecoration: "none"
};

const headlineStyle = (size: Size): FontCSS => {
    return {
        color: palette.neutral[7],
        fontFamily: "'GH Guardian Headline', Georgia, serif",
        fontWeight: 400,

        ...fontSizes[size]
    };
};

const kickerStyle = (size: Size): FontCSS => {
    return {
        color: palette.culture.main,
        fontFamily: "'GH Guardian Headline', Georgia, serif",
        fontWeight: 400,

        ...fontSizes[size]
    };
};

const bylineStyle = (size: Size): FontCSS => {
    return {
        color: palette.culture.main,
        fontFamily: "'GH Guardian Headline', Georgia, serif",
        fontStyle: "italic",

        ...fontSizes[size]
    };
};

const trailTextStyle: FontCSS = {
    fontFamily: "'GH Guardian Headline', Georgia, serif",
    fontSize: "16px",
    lineHeight: "20px",
    fontWeight: 400
};

const bodyTextStyle: FontCSS = {
    fontFamily: "'Guardian Text Egyptian', Georgia, serif",
    fontSize: "16px",
    lineHeight: "20px",
    fontWeight: 400
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
    salt: string;
    size: "large" | "small";
}

const brazeParameter = "?##braze_utm##";

export const DescriptiveCard: React.FC<Props> = ({ content, salt, size }) => {
    const image =
        content.properties.maybeContent.trail.trailPicture.allImages[0];
    const formattedImage = formatImage(
        image.url,
        salt,
        size === "large" ? 600 : 300,
        content.card.starRating
    );

    const { headline } = content.header;
    const { byline } = content.properties;
    const webURL = content.properties.webUrl + brazeParameter;
    const imageURL = formattedImage;
    const imageAlt = image.fields.altText;
    const isComment = content.display.showQuotedHeadline;

    const kicker = content.header.kicker
        ? kickerText(content.header.kicker)
        : "";

    const { trailText } = content.card;

    const bodyText = content.properties.maybeContent.fields.body;
    const bodyParagraphs = bodyText.split("</p>");
    console.log("bodyParagraphs:");
    console.log(bodyParagraphs);

    const sanitizeOptions = {
        allowedTags: ["a"],
        allowedAttributes: {
            a: ["href"]
        }
    };

    return (
        <table style={tableStyle}>
            <tr>
                <td style={tdStyle}>
                    <table style={tableStyle}>
                        <tr>
                            <td
                                className="m-pad"
                                style={metaWrapperStyle(size)}
                            >
                                <a style={linkStyle} href={webURL}>
                                    {kicker && (
                                        <span style={kickerStyle(size)}>
                                            {kicker + " / "}
                                        </span>
                                    )}
                                    <span style={headlineStyle(size)}>
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
                                    <br />
                                    <span style={bylineStyle(size)}>
                                        {" "}
                                        {byline}
                                    </span>
                                </a>
                            </td>
                        </tr>
                        <tr>
                            <td
                                className="m-col-pad"
                                style={bottomPaddingStyle}
                            ></td>
                        </tr>
                        {imageURL && (
                            <tr>
                                <td style={{ padding: 0 }}>
                                    <a href={webURL}>
                                        <img
                                            width={
                                                size === "large" ? "600" : "294"
                                            }
                                            style={imgStyle}
                                            alt={imageAlt}
                                            src={imageURL}
                                        />
                                    </a>
                                </td>
                            </tr>
                        )}
                        <tr>
                            <td className="m-pad" style={cellPadding}>
                                <span style={trailTextStyle}>{trailText}</span>
                            </td>
                        </tr>
                        {bodyParagraphs.map((pText, pIndex) => {
                            if (pIndex < 2) {
                                if (pText) {
                                    const sanitizedText = sanitizeHtml(
                                        pText,
                                        sanitizeOptions
                                    );
                                    return (
                                        <tr>
                                            <td
                                                className="m-pad"
                                                style={cellPadding}
                                            >
                                                <span style={bodyTextStyle}>
                                                    {sanitizedText}
                                                </span>
                                            </td>
                                        </tr>
                                    );
                                }
                            }
                            return null;
                        })}

                        <tr>
                            <td className="m-pad" style={bottomPadding}>
                                <ContinueButton
                                    label="Continue reading"
                                    linkTo={webURL}
                                />
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    );
};
