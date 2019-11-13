import React from "react";
import { FontCSS, TdCSS, TableCSS, ImageCSS } from "../../css";
import { palette } from "@guardian/src-foundations";
import { Content } from "../../api";
import { formatImage } from "../../image";
import { kickerText } from "../../kicker";
import { RowCellPadding } from "../../layout/RowCellPadding";
import sanitizeHtml from "sanitize-html";
import { Table, RowCell, TableRowCell } from "../../layout/Table";

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

const standfirstStyle: TdCSS = {
    padding: "3px 10px 5px 10px",
    verticalAlign: "bottom"
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

const spanStyle: FontCSS = {
    color: palette.neutral[7],
    fontFamily: "'GH Guardian Headline', Georgia, serif",
    fontWeight: 400,
    fontSize: "16px",
    lineHeight: "20px"
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

// const columnStyleRight = (size: Size): TdCSS => {
//     const width = size === "large" ? "30%" : "50%";
//     return {
//         width: `${width}`,
//         verticalAlign: "bottom"
//     };
// };

interface Props {
    content: Content;
    salt: string;
    size: "large" | "small";
}

const brazeParameter = "?##braze_utm##";

const Standfirst: React.FC<{
    text: string;
    linkURL: string;
    size: Size;
}> = ({ text, linkURL, size }) => {
    return (
        <td className="m-pad" style={standfirstStyle}>
            <a style={linkStyle} href={linkURL}>
                {" "}
                <span style={spanStyle}>{text}</span>
            </a>
        </td>
    );
};

// TODO add alt text
const ContributorImage: React.FC<{
    src: string;
    width: number;
}> = ({ src, width }) => {
    return (
        <td style={columnStyleRight}>
            <img width={width} src={src} alt="" />
        </td>
    );
};

const SupplementaryMeta: React.FC<{
    trailText: string;
    linkURL: string;
    contributorImageSrc: string;
    size: Size;
    width: number;
}> = ({ trailText, contributorImageSrc, linkURL, size, width }) => {
    let ignoreStandfirst = false;

    if (size === "small") {
        ignoreStandfirst = true;
    }

    if (!ignoreStandfirst && trailText && contributorImageSrc) {
        return (
            <RowCell>
                <Table>
                    <Standfirst
                        text={trailText}
                        linkURL={linkURL}
                        size={size}
                    />
                    <ContributorImage width={width} src={contributorImageSrc} />
                </Table>
            </RowCell>
        );
    } else if (!ignoreStandfirst && trailText) {
        return (
            <tr>
                <Standfirst text={trailText} linkURL={linkURL} size={size} />
            </tr>
        );
    } else if (contributorImageSrc) {
        return (
            <tr>
                <ContributorImage src={contributorImageSrc} width={width} />
            </tr>
        );
    }

    return null;
};

const Headline: React.FC<{
    size: Size;
    linkURL: string;
    isComment: boolean;
    kicker: string;
    headline: string;
    byline: string;
}> = ({ size, linkURL, isComment, kicker, headline, byline }) => {
    return (
        <tr>
            <td className="m-pad" style={metaWrapperStyle(size)}>
                <a style={linkStyle} href={linkURL}>
                    {kicker && (
                        <span style={kickerStyle}>{kicker + " / "}</span>
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
                    <span style={bylineStyle(size)}> {byline}</span>
                </a>
            </td>
        </tr>
    );
};

const Image: React.FC<{
    src?: string;
    linkURL: string;
    alt: string;
    width: number;
}> = ({ src, linkURL, alt, width }) => {
    if (!src) {
        return null;
    }

    return (
        <a href={linkURL}>
            <img width={width} style={imgStyle} alt={alt} src={src} />
        </a>
    );
};

export const CommentCard: React.FC<Props> = ({ content, salt, size }) => {
    const image =
        content.properties.maybeContent.trail.trailPicture.allImages[0];
    const formattedImage = formatImage(
        image.url,
        salt,
        size === "large" ? 600 : 300,
        content.card.starRating
    );

    const headline = content.header.headline;
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

    const trailText = sanitizeHtml(content.card.trailText, {
        allowedTags: []
    });

    return (
        <TableRowCell tdStyle={tdStyle}>
            <Table>
                <RowCell>
                    <Image
                        src={imageURL}
                        linkURL={webURL}
                        alt={imageAlt}
                        width={size === "large" ? 600 : 294}
                    />
                </RowCell>

                <Headline
                    size={size}
                    linkURL={webURL}
                    isComment={isComment}
                    kicker={kicker}
                    headline={headline}
                    byline={byline}
                />

                <RowCellPadding px={20}></RowCellPadding>

                <SupplementaryMeta
                    trailText={trailText}
                    linkURL={webURL}
                    contributorImageSrc={profilePic}
                    size={size}
                    width={size === "large" ? 180 : 147}
                />
            </Table>
        </TableRowCell>
    );
};
