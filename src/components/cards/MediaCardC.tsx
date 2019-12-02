import React from "react";
import { TdCSS, ImageCSS } from "../../css";
import { palette } from "@guardian/src-foundations";
import { Content } from "../../api";
import { formatImage } from "../../image";
import { Table, RowCell, TableRowCell } from "../../layout/Table";

const tdStyle: TdCSS = {
    backgroundColor: palette.neutral[100],
    padding: "0px 10px 20px 10px",
    borderLeft: `1px solid ${palette.neutral[20]}`,
    borderBottom: `1px solid ${palette.neutral[20]}`
};

const tdHeadlineStyle: TdCSS = {
    color: palette.neutral[20],
    fontSize: "22px",
    lineHeight: "26px",
    fontFamily: "'GH Guardian Headline', Georgia, serif",
    fontWeight: 400
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

interface Props {
    content: Content;
    salt: string;
}

const brazeParameter = "?##braze_utm##";

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

export const MediaCardC: React.FC<Props> = ({ content, salt }) => {
    const image =
        content.properties.maybeContent.trail.trailPicture.allImages[0];
    const formattedImage = formatImage(
        image.url,
        salt,
        579,
        content.card.starRating
    );

    const headline = content.header.headline;
    const webURL = content.properties.webUrl + brazeParameter;
    const imageURL = formattedImage;
    const imageAlt = image.fields.altText;

    return (
        <TableRowCell tdStyle={tdStyle}>
            <Table>
                <RowCell tdStyle={{ padding: "0" }}>
                    <Image
                        src={imageURL}
                        linkURL={webURL}
                        alt={imageAlt}
                        width={579}
                    />
                </RowCell>
                <RowCell tdStyle={tdHeadlineStyle}>{headline}</RowCell>
            </Table>
        </TableRowCell>
    );
};
