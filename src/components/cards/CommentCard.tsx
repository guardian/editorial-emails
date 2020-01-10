import React, { useContext } from "react";
import { FontCSS, TdCSS } from "../../css";
import { palette } from "@guardian/src-foundations";
import { Pillar } from "../../api";
import sanitizeHtml from "sanitize-html";
import { Table, RowCell, TableRowCell, TableRow } from "../../layout/Table";
import { Headline } from "../../components/Headline";
import { Image } from "../../components/Image";
import { headline } from "../../styles/typography";
import { pillarProps } from "../../utils/pillarProps";

type Size = "small" | "large";

const tdStyle = (pillar: Pillar): TdCSS => {
    return {
        backgroundColor: palette.neutral[100],
        borderTop: `1px solid ${pillarProps[pillar].colour}`
    };
};

const metaWrapperStyle = (size: Size): TdCSS => {
    const rightPad = size === "large" ? "40px" : "10px";
    const bottomPad = size === "large" ? "0" : "15px";
    return {
        padding: `3px ${rightPad} ${bottomPad} 10px`
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
    fontSize: "0",
    width: "30%",
    verticalAlign: "bottom",
    padding: "0"
};

interface Props {
    headline: string;
    byline: string;
    cardUrl: string;
    isComment?: boolean;
    size?: "large" | "small";
    shouldShowProfileImage?: boolean;
    trailText?: string;
    pillar?: Pillar;
    imageSrc?: string;
    imageAlt?: string;
}

const TrailText: React.FC<{
    text: string;
    linkURL: string;
    size: Size;
}> = ({ text, linkURL }) => (
    <td className="m-pad" style={trailTextStyle}>
        <a style={linkStyle} href={linkURL}>
            <span style={spanStyle}>{text}</span>
        </a>
    </td>
);

const ContributorImage: React.FC<{
    src: string;
    width: number;
    alt: string;
}> = ({ src, width, alt }) => {
    if (!src) {
        return null;
    }

    return <Image src={src} width={width} alt={alt} ignoreWidth />;
};

// TODO make testable, and also separate layout logic from individual components
// TODO split into SupplementaryMetaLarge and Small
const SupplementaryMeta: React.FC<{
    trailText: string;
    linkURL: string;
    contributorImageSrc?: string;
    contributorImageAlt?: string;
    size: Size;
    width: number;
}> = ({
    trailText,
    linkURL,
    contributorImageSrc,
    contributorImageAlt,
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
            <RowCell>
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
            <RowCell>
                <Table>
                    <td style={{ width: "50%", padding: "0" }}></td>
                    {contributorImage}
                </Table>
            </RowCell>
        );
    }

    return null;
};

export const CommentCard: React.FC<Props> = ({
    headline,
    byline,
    trailText,
    cardUrl,
    isComment = false,
    size = "small",
    shouldShowProfileImage = false,
    pillar,
    imageSrc,
    imageAlt
}) => {
    const sanitisedTrailText = sanitizeHtml(trailText, {
        allowedTags: []
    });

    return (
        <TableRowCell tdStyle={tdStyle(pillar)}>
            <Table>
                <tr>
                    <td className="m-pad" style={metaWrapperStyle(size)}>
                        <Headline
                            text={headline}
                            linkTo={cardUrl}
                            size={size}
                            pillar={pillar}
                            byline={byline}
                            showQuotation={isComment}
                        />
                    </td>
                </tr>

                {size === "large" && shouldShowProfileImage && (
                    <SupplementaryMeta
                        trailText={sanitisedTrailText}
                        linkURL={cardUrl}
                        contributorImageSrc={imageSrc}
                        contributorImageAlt={imageAlt}
                        size={size}
                        width={size === "large" ? 180 : 147}
                    />
                )}
            </Table>
        </TableRowCell>
    );
};
