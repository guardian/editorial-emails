import React from "react";
import { TdCSS } from "../../css";
import { palette } from "@guardian/src-foundations";
// import { Content } from "../../api";
// import { formatImage } from "../../image";
import { Table, RowCell, TableRowCell } from "../../layout/Table";
import { Padding } from "../../layout/Padding";
import { Image } from "../../components/Image";
import { headline } from "../../styles/typography";

const tdStyle: TdCSS = {
    backgroundColor: palette.neutral[20],
    padding: "10px"
};

const tdHeadlineStyle: TdCSS = {
    ...headline({ level: 2 }),
    color: palette.neutral[100]
};

interface Props {
    headline: string;
    cardUrl: string;
    imageSrc?: string;
    imageAlt?: string;
    imageRating?: number;
    imageSalt?: string;
}

// const brazeParameter = "?##braze_utm##";

export const MediaCardB: React.FC<Props> = ({
    headline,
    cardUrl,
    imageSrc,
    imageAlt,
    imageRating = 1,
    imageSalt
}) => {
    // const image =
    //     content.properties.maybeContent.trail.trailPicture.allImages[0];
    // const formattedImage = formatImage(
    //     image.url,
    //     salt,
    //     579,
    //     content.card.starRating
    // );

    // const headline = content.header.headline;
    // const webURL = content.properties.webUrl + brazeParameter;
    // const imageURL = formattedImage;
    // const imageAlt = content.header.headline;

    return (
        <TableRowCell tdStyle={tdStyle}>
            <Table>
                <RowCell tdStyle={tdHeadlineStyle}>{headline}</RowCell>
                <RowCell>
                    <Padding px={20} />
                </RowCell>
                <RowCell tdStyle={{ padding: "0" }}>
                    <Image
                        src={imageSrc}
                        linkTo={`${cardUrl}?##braze_utm##`}
                        alt={imageAlt}
                        width={580}
                        pillar="Opinion"
                    />
                </RowCell>
            </Table>
        </TableRowCell>
    );
};
