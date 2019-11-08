import React from "react";
import { FontCSS, TdCSS, TableCSS, ImageCSS } from "../css";
import { palette } from "@guardian/src-foundations";
import { Content } from "../api";
import { formatImage } from "../image";
import { kickerText } from "../kicker";

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

const linkStyle: FontCSS = {
    textDecoration: "none"
};

const headlineStyle = (size: Size): FontCSS => {
    return {
        color: palette.neutral[7],
        fontFamily: "'Guardian Egyptian Web Headline', Georgia, serif",
        fontWeight: 400,

        ...fontSizes[size]
    };
};

const kickerStyle: FontCSS = {
    ...headlineStyle,

    color: palette.culture.main
};

const bylineStyle = (size: Size): FontCSS => {
    return {
        color: palette.culture.main,
        fontFamily: "'Guardian Egyptian Web Headline Italic', Georgia, serif",

        ...fontSizes[size]
    };
};

const bottomPaddingStyle: TdCSS = {
    paddingBottom: "20px"
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

export const Card: React.FC<Props> = ({ content, salt, size }) => {
    const image =
        content.properties.maybeContent.trail.trailPicture.allImages[0];
    const formattedImage = formatImage(
        image.url,
        salt,
        size === "large" ? 600 : 300,
        content.card.starRating
    );

    const headline = content.properties.webTitle;
    const byline = content.properties.byline;
    const webURL = content.properties.webUrl + brazeParameter;
    const imageURL = formattedImage;
    const imageAlt = image.fields.altText;
    const isComment = content.header.isComment;

    const kicker = content.header.kicker
        ? kickerText(content.header.kicker)
        : "";

    return (
        <table style={tableStyle}>
            <tr>
                <td style={tdStyle}>
                    <table style={tableStyle}>
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
                            <td
                                className="m-pad"
                                style={metaWrapperStyle(size)}
                            >
                                <a style={linkStyle} href={webURL}>
                                    {kicker && (
                                        <span style={kickerStyle}>
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
                    </table>
                </td>
            </tr>
        </table>
    );
};
