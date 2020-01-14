import React from "react";
import { TdCSS, FontCSS } from "../../css";
import { palette } from "@guardian/src-foundations";
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
    headline: string;
    cardUrl: string;
    imageSrc?: string;
    imageAlt?: string;
    imageRating?: number;
}

export const CommercialCard: React.FC<Props> = ({
    headline,
    cardUrl,
    imageSrc,
    imageAlt,
    imageRating
}) => {
    const imageSize = 580;
    const imageUrl = imageSrc ? imageSrc : null;

    return (
        <TableRowCell tdStyle={outerTdStyle}>
            <Table>
                <RowCell>
                    {imageUrl && (
                        <Image
                            src={imageUrl}
                            linkTo={cardUrl}
                            alt={imageAlt}
                            rating={imageRating}
                            width={imageSize}
                        />
                    )}
                </RowCell>
                <RowCell tdStyle={textTdStyle}>
                    <a
                        href={cardUrl}
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
