import React from "react";
import { FontCSS, TdCSS } from "../../css";
import { palette } from "@guardian/src-foundations";
import sanitizeHtml from "sanitize-html";
import { Table, RowCell, TableRowCell, TableRow } from "../../layout/Table";
import { Headline } from "../../components/Headline";
import { Image } from "../../components/Image";
import { headline } from "../../styles/typography";

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

const trailTextStyle: TdCSS = {
    padding: "20px 10px 10px 10px",
    verticalAlign: "bottom"
};

const linkStyle: FontCSS = {
    textDecoration: "none"
};

const spanStyle: FontCSS = {
    ...headline({ level: 1 }),
    color: palette.neutral[7]
};

const columnStyleRight: TdCSS = {
    width: "30%",
    verticalAlign: "bottom",
    padding: "0"
};

const TrailText: React.FC<{
    text: string;
    linkTo: string;
    size: Size;
}> = ({ text, linkTo, size }) => (
    <td className="m-pad" style={trailTextStyle}>
        <a style={linkStyle} href={linkTo}>
            {" "}
            <span style={spanStyle}>{text}</span>
        </a>
    </td>
);

// TODO add alt text
const ContributorImage: React.FC<{
    src: string;
    width: number;
    alt: string;
}> = ({ src, width, alt }) => {
    if (!src) {
        return null;
    }
    return (
        <Image src={src} width={width} alt={alt} pillar="Opinion" ignoreWidth />
    );
};

// TODO make testable, and also separate layout logic from individual components
// TODO split into SupplementaryMetaLarge and Small
const SupplementaryMeta: React.FC<{
    trailText: string;
    linkTo: string;
    contributorImageSrc?: string;
    contributorImageAlt?: string;
    size: Size;
    width: number;
}> = ({
    trailText,
    contributorImageSrc,
    contributorImageAlt,
    linkTo,
    size,
    width
}) => {
    const contributorImage = (
        <td style={columnStyleRight}>
            <ContributorImage
                width={width}
                src={contributorImageSrc}
                alt={contributorImageAlt}
            />
        </td>
    );

    if (trailText && contributorImageSrc) {
        return (
            <RowCell tdStyle={{ padding: "0" }}>
                <TableRow>
                    <TrailText text={trailText} linkTo={linkTo} size={size} />
                    {contributorImage}
                </TableRow>
            </RowCell>
        );
    } else if (trailText) {
        return (
            <tr>
                <TrailText text={trailText} linkTo={linkTo} size={size} />
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

interface Props {
    headline: string;
    byline: string;
    trailText: string;
    cardUrl: string;
    isComment: boolean;
    imageSrc?: string;
    imageAlt?: string;
    imageRating?: number;
    contributorImageSrc?: string;
    contributorImageAlt?: string;
    size: "large" | "small";
    shouldShowImage?: boolean;
}

export const CommentCardB: React.FC<Props> = ({
    headline,
    byline,
    trailText,
    cardUrl,
    isComment = false,
    imageSrc,
    imageAlt,
    imageRating,
    contributorImageSrc,
    contributorImageAlt,
    size,
    shouldShowImage = false
}) => {
    const sanitisedTrailText = sanitizeHtml(trailText, {
        allowedTags: []
    });

    return (
        <TableRowCell tdStyle={tdStyle}>
            <Table>
                {shouldShowImage && (
                    <RowCell tdStyle={{ padding: "0" }}>
                        <Image
                            src={imageSrc}
                            alt={imageAlt}
                            linkTo={`${cardUrl}?##braze_utm##`}
                            width={size === "large" ? 600 : 294}
                            pillar="Opinion"
                        />
                    </RowCell>
                )}
                <tr>
                    <td className="m-pad" style={metaWrapperStyle(size)}>
                        <Headline
                            text={headline}
                            linkTo={`${cardUrl}?##braze_utm##`}
                            size={size}
                            pillar="Opinion"
                            byline={byline}
                            showQuotation={isComment}
                        />
                    </td>
                </tr>

                {size === "large" && (
                    <SupplementaryMeta
                        trailText={sanitisedTrailText}
                        linkTo={`${cardUrl}?##braze_utm##`}
                        contributorImageSrc={contributorImageSrc}
                        contributorImageAlt={contributorImageAlt}
                        size={size}
                        width={size === "large" ? 180 : 147}
                    />
                )}
            </Table>
        </TableRowCell>
    );
};

export const ContributorImageWrapper: React.FC<{
    contributorImageSrc: string;
    contributorImageAlt: string;
}> = ({ contributorImageSrc, contributorImageAlt }) => {
    if (!contributorImageSrc) {
        return null;
    }
    return (
        <ContributorImage
            src={contributorImageSrc}
            alt={contributorImageAlt}
            width={147}
        />
    );
};
