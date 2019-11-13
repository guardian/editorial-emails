import React from "react";
import { FontCSS, TdCSS, TableCSS, ImageCSS } from "../../css";
import { palette } from "@guardian/src-foundations";
import { Content } from "../../api";
import { formatImage } from "../../image";
import { Table, RowCell, TableRowCell } from "../../layout/Table";

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
            <img width={width} style={{}} alt={alt} src={src} />
        </a>
    );
};

export const MediaCard: React.FC<Props> = ({ content, salt }) => {
    const image =
        content.properties.maybeContent.trail.trailPicture.allImages[0];
    const formattedImage = formatImage(
        image.url,
        salt,
        580,
        content.card.starRating
    );

    const headline = content.header.headline;
    const webURL = content.properties.webUrl + brazeParameter;
    const imageURL = formattedImage;
    const imageAlt = image.fields.altText;

    return (
        <TableRowCell tdStyle={{}}>
            <Table>
                <RowCell>{headline}</RowCell>
                <RowCell>
                    <Image
                        src={imageURL}
                        linkURL={webURL}
                        alt={imageAlt}
                        width={580}
                    />
                </RowCell>
            </Table>
        </TableRowCell>
    );
};
