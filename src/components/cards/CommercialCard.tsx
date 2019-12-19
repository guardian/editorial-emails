import React from "react";
import { TdCSS, FontCSS } from "../../css";
import { palette } from "@guardian/src-foundations";
import { Content } from "../../api";
import { formatImage } from "../../image";
import { Table, RowCell, TableRowCell } from "../../layout/Table";
import { Image } from "../../components/Image";
import { textBody } from "../../styles/typography";
import { getTransformedFreeText } from "../../utils/getTransformedFreeText";

const outerTdStyle: TdCSS = {
    verticalAlign: "top",
    padding: "0 10px 12px 10px",
    backgroundColor: palette.neutral[86]
};

const textTdStyle: TdCSS = {
    verticalAlign: "top",
    padding: "6px 16px 3px 3px"
};

const freeTextStyle: FontCSS = {
    ...textBody({ level: 1 }),
    color: palette.neutral[7],
    textDecoration: "none"
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

    const { headline } = content.header;
    const backfillURL = content.properties.webUrl + brazeParameter;
    const curatedURL = content.properties.href;
    const cardLink = content.properties.webUrl ? backfillURL : curatedURL;
    const imageURL = formattedImage;
    const imageAlt = content.header.headline;

    return (
        <TableRowCell tdStyle={outerTdStyle}>
            <Table>
                <RowCell>
                    <Image
                        src={imageURL}
                        linkTo={cardLink}
                        alt={imageAlt}
                        width={580}
                    />
                </RowCell>
                <RowCell tdStyle={textTdStyle}>
                    <a
                        href={cardLink}
                        style={freeTextStyle}
                        dangerouslySetInnerHTML={{
                            __html: getTransformedFreeText(headline)
                        }}
                    ></a>
                </RowCell>
            </Table>
        </TableRowCell>
    );
};
