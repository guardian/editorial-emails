import React from "react";
import { FontCSS, TdCSS, TableCSS, ImageCSS } from "../../css";
import { palette } from "@guardian/src-foundations";
import { Content } from "../../api";
import { formatImage } from "../../image";
import { kickerText } from "../../kicker";
import { ColumnPadding } from "../../layout/ColumnPadding";
import sanitizeHtml from "sanitize-html";

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
    color: palette.opinion.main
};

const tableStyle: TableCSS = {
    borderSpacing: 0,
    borderCollapse: "collapse",
    width: "100%"
};

const tdStyle: TdCSS = {
    backgroundColor: palette.opinion.faded,
    borderTop: `2px solid ${palette.opinion.main}`,
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
        fontFamily: "'GH Guardian Headline', Georgia, serif",
        fontWeight: 400,

        ...fontSizes[size]
    };
};

const kickerStyle: FontCSS = {
    ...headlineStyle,

    color: palette.opinion.main
};

const bylineStyle = (size: Size): FontCSS => {
    return {
        color: palette.opinion.main,
        fontFamily: "'GH Guardian Headline', Georgia, serif",
        fontStyle: "italic",

        ...fontSizes[size]
    };
};

const quoteIconStyle: ImageCSS = {
    height: "0.8em",
    display: "inline-block",
    border: "0"
};

const columnStyleLeft: TdCSS = {
    width: "70%",
    verticalAlign: "bottom"
};

const columnStyleRight: TdCSS = {
    width: "30%",
    verticalAlign: "bottom"
};

interface Props {
    content: Content;
    salt: string;
    size: "large" | "small";
}

const brazeParameter = "?##braze_utm##";

export const CommentCard: React.FC<Props> = ({ content, salt, size }) => {
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

    const contributor = content.properties.maybeContent.tags.tags.find(tag => {
        return tag.properties.tagType === "Contributor";
    });

    const profilePic = contributor
        ? contributor.properties.contributorLargeImagePath
        : null;

    const standfirst = sanitizeHtml(
        content.properties.maybeContent.fields.standfirst,
        {
            allowedTags: ["a"],
            allowedAttributes: {
                a: ["href"]
            } // strip *all* html
        }
    );

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
                                                    src="https://assets.guim.co.uk/images/email/icons/cc614106682d8de187a64eb222116f3a/quote-opinion.png"
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

                        <ColumnPadding px={20}></ColumnPadding>

                        <tr>
                            <td>
                                <table style={tableStyle}>
                                    <td style={columnStyleLeft}>
                                        <table style={tableStyle}>
                                            <tr>
                                                <td
                                                    className="m-col-pad"
                                                    style={{
                                                        paddingBottom: "30px"
                                                    }}
                                                ></td>
                                            </tr>
                                            <tr>
                                                <td
                                                    className="m-pad"
                                                    style={metaWrapperStyle(
                                                        size
                                                    )}
                                                >
                                                    <a
                                                        style={linkStyle}
                                                        href=""
                                                    >
                                                        {" "}
                                                        <span>
                                                            {standfirst}
                                                        </span>
                                                    </a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td
                                                    style={{
                                                        paddingBottom: "5px"
                                                    }}
                                                ></td>
                                            </tr>
                                        </table>
                                    </td>
                                    <td style={columnStyleRight}>
                                        <img
                                            width="100px"
                                            src={profilePic}
                                            alt=""
                                        />
                                    </td>
                                </table>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    );
};
