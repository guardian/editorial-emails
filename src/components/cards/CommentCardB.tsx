import React from "react";
import { FontCSS, TdCSS } from "../../css";
import { palette } from "@guardian/src-foundations";
import { Content, Tag } from "../../api";
import { formatImage } from "../../image";
import sanitizeHtml from "sanitize-html";
import { Table, RowCell, TableRowCell, TableRow } from "../../layout/Table";
import { Headline } from "../../components/Headline";
import { Image } from "../../components/Image";

type Size = "small" | "large";

const tdStyle: TdCSS = {
    backgroundColor: palette.opinion.faded,
    borderTop: `2px solid ${palette.opinion.main}`,
    padding: "0"
};

const metaWrapperStyle = (size: Size): TdCSS => {
    const rightPad = size === "large" ? "40px" : "10px";
    return {
        padding: `3px ${rightPad} 10px 10px`
    };
};

const standfirstStyle: TdCSS = {
    padding: "20px 10px 10px 10px",
    verticalAlign: "bottom"
};

const linkStyle: FontCSS = {
    textDecoration: "none"
};

const spanStyle: FontCSS = {
    color: palette.neutral[7],
    fontFamily: "'GH Guardian Headline', Georgia, serif",
    fontWeight: 400,
    fontSize: "16px",
    lineHeight: "20px"
};

const columnStyleRight: TdCSS = {
    width: "30%",
    verticalAlign: "bottom",
    padding: "0"
};

interface Props {
    content: Content;
    salt: string;
    size: "large" | "small";
    shouldShowImage: boolean;
}

const brazeParameter = "?##braze_utm##";

const TrailText: React.FC<{
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
    salt: string;
    width: number;
    alt: string;
}> = ({ src, salt, width, alt }) => {
    if (!src) {
        return null;
    }

    const formattedImage = formatImage(src, salt, width);
    return (
        <Image src={formattedImage} width={width} alt={alt} pillar="Opinion" />
    );
};

// TODO make testable, and also separate layout logic from individual components
// TODO split into SupplementaryMetaLarge and Small
const SupplementaryMeta: React.FC<{
    trailText: string;
    linkURL: string;
    contributorImageSrc?: string;
    contributirImageAlt?: string;
    size: Size;
    width: number;
    salt: string;
}> = ({
    trailText,
    contributorImageSrc,
    linkURL,
    size,
    width,
    contributirImageAlt,
    salt
}) => {
    const contributorImage = (
        <td style={columnStyleRight}>
            <ContributorImage
                width={width}
                salt={salt}
                src={contributorImageSrc}
                alt={contributirImageAlt}
            />
        </td>
    );

    if (trailText && contributorImageSrc) {
        return (
            <RowCell tdStyle={{ padding: "0" }}>
                <TableRow>
                    <TrailText text={trailText} linkURL={linkURL} size={size} />
                    {contributorImage}
                </TableRow>
            </RowCell>
        );
    } else if (trailText) {
        return (
            <tr>
                <TrailText text={trailText} linkURL={linkURL} size={size} />
            </tr>
        );
    } else if (contributorImageSrc) {
        return (
            <RowCell tdStyle={{ padding: "0" }}>
                <Table>
                    <td style={{ width: "50%" }}></td>
                    {contributorImage}
                </Table>
            </RowCell>
        );
    }

    return null;
};

export const CommentCardB: React.FC<Props> = ({
    content,
    salt,
    size,
    shouldShowImage
}) => {
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
    const imageAlt = content.header.headline;
    const showQuotation = content.header.isComment;

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
                {shouldShowImage && (
                    <RowCell tdStyle={{ padding: "0" }}>
                        <Image
                            src={imageURL}
                            linkTo={webURL}
                            alt={imageAlt}
                            width={size === "large" ? 600 : 294}
                            pillar="Opinion"
                        />
                    </RowCell>
                )}
                <tr>
                    <td className="m-pad" style={metaWrapperStyle(size)}>
                        <Headline
                            text={headline}
                            linkTo={webURL}
                            size={size}
                            pillar="Opinion"
                            byline={byline}
                            showQuotation={showQuotation}
                        />
                    </td>
                </tr>

                {size === "large" && (
                    <SupplementaryMeta
                        salt={salt}
                        trailText={trailText}
                        linkURL={webURL}
                        contributorImageSrc={profilePic}
                        contributirImageAlt={
                            contributor && contributor.properties.webTitle
                        }
                        size={size}
                        width={size === "large" ? 180 : 147}
                    />
                )}
            </Table>
        </TableRowCell>
    );
};

export const getContributor = (content: Content): Tag => {
    return content.properties.maybeContent.tags.tags.find(tag => {
        return tag.properties.tagType === "Contributor";
    });
};

export const ContributorImageWrapper: React.FC<{
    content: Content;
    salt: string;
}> = ({ content, salt }) => {
    const contributor = getContributor(content);
    const profilePic = contributor.properties.contributorLargeImagePath || null;

    return (
        <ContributorImage
            salt={salt}
            width={147}
            src={profilePic}
            alt={contributor.properties.webTitle}
        />
    );
};
