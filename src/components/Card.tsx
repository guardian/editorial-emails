import React from "react";
import { FontCSS, TdCSS, TableCSS, ImageCSS } from "../css";
import { palette } from "@guardian/src-foundations";
import { Content } from "../api";
import { formatImage } from "../image";
import { kickerText } from "../kicker";

const imgStyle: ImageCSS = {
    outline: "none",
    textDecoration: "none",
    maxWidth: "100%",
    clear: "both",
    display: "block",
    border: "0",
    width: "100%"
};

const tableStyle: TableCSS = {
    borderSpacing: 0,
    borderCollapse: "collapse",
    width: "100%"
};

const tdStyle: TdCSS = {
    backgroundColor: palette.culture.faded,
    borderTop: `2px solid ${palette.culture.main}`
};

const metaWrapperStyle: TdCSS = {
    padding: "3px 65px 5px 12px"
};

const linkStyle: FontCSS = {
    textDecoration: "none"
};

const headlineStyle: FontCSS = {
    color: palette.neutral[7],
    fontFamily: "'Guardian Egyptian Web Headline', Georgia, serif",
    fontSize: "30px",
    lineHeight: "38px",
    fontWeight: 400
};

const kickerStyle: FontCSS = {
    ...headlineStyle,

    color: palette.culture.main
};

const bylineStyle: FontCSS = {
    color: palette.culture.main,
    fontFamily: "'Guardian Egyptian Web Headline Italic', Georgia, serif",
    fontSize: "30px",
    lineHeight: "38px",
    fontStyle: "italic"
};

const bottomPaddingStyle: TdCSS = {
    paddingBottom: "20px"
};

const quoteIconStyle: ImageCSS = {
    height: "0.8em",
    display: "inline-block"
};

interface Props {
    content: Content;
    salt: string;
}

const brazeParameter = "?##braze_utm##";

export const Card: React.FC<Props> = ({ content, salt }) => {
    const image =
        content.properties.maybeContent.trail.trailPicture.allImages[0];
    const formattedImage = formatImage(image.url, salt);

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
                                <td>
                                    <a href={webURL}>
                                        <img
                                            width="600"
                                            style={imgStyle}
                                            alt={imageAlt}
                                            src={imageURL}
                                        />
                                    </a>
                                </td>
                            </tr>
                        )}

                        <tr>
                            <td className="h-pad" style={metaWrapperStyle}>
                                <a style={linkStyle} href={webURL}>
                                    {kicker && (
                                        <span
                                            className="h-small"
                                            style={kickerStyle}
                                        >
                                            {kicker + " / "}
                                        </span>
                                    )}
                                    <span
                                        className="h-small"
                                        style={headlineStyle}
                                    >
                                        {isComment && (
                                            <>
                                                <img
                                                    style={quoteIconStyle}
                                                    src="https://assets.guim.co.uk/images/email/icons/9682728db696148fd5a6b149e556df8c/quote-culture.png"
                                                    alt="quote icon"
                                                />{" "}
                                            </>
                                        )}

                                        {headline}
                                    </span>
                                    <br className="m-hide" />
                                    <span
                                        className="h-small"
                                        style={bylineStyle}
                                    >
                                        {" "}
                                        {byline}
                                    </span>
                                </a>
                            </td>
                        </tr>

                        <tr>
                            <td style={bottomPaddingStyle}></td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    );
};
