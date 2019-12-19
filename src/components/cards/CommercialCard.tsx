import React from "react";
import { TdCSS } from "../../css";
import { palette } from "@guardian/src-foundations";
import { Content } from "../../api";
import { formatImage } from "../../image";
import { Table, RowCell, TableRowCell } from "../../layout/Table";
import { Image } from "../../components/Image";
import { FreeTextCard } from "./FreeTextCard";

const tdStyle: TdCSS = {
    backgroundColor: palette.neutral[97],
    paddingBottom: "12px"
};

interface Props {
    content: Content;
    salt: string;
}

const brazeParameter = "?##braze_utm##";

export const CommercialCard: React.FC<Props> = ({ content, salt }) => {
    const image = content.properties.image.item.imageSrc;
    const formattedImage = formatImage(
        image,
        salt,
        580,
        content.card.starRating
    );

    const backfillURL = content.properties.webUrl + brazeParameter;
    const curatedURL = content.properties.href;
    const cardLink = content.properties.webUrl ? backfillURL : curatedURL;
    const imageURL = formattedImage;
    const imageAlt = content.header.headline;

    return (
        <TableRowCell tdStyle={tdStyle}>
            <Table>
                <RowCell tdStyle={{ padding: "0 10px" }}>
                    <Image
                        src={imageURL}
                        linkTo={cardLink}
                        alt={imageAlt}
                        width={580}
                    />
                </RowCell>
            </Table>
            <FreeTextCard content={content} />
        </TableRowCell>
    );
};
