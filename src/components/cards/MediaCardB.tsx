import React from "react";
import { TdCSS } from "../../css";
import { palette } from "@guardian/src-foundations";
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
}

export const MediaCardB: React.FC<Props> = ({
    headline,
    cardUrl,
    imageSrc,
    imageAlt,
    imageRating
}) => (
    <TableRowCell tdStyle={tdStyle}>
        <Table>
            <RowCell tdStyle={tdHeadlineStyle}>{headline}</RowCell>
            <RowCell>
                <Padding px={20} />
            </RowCell>
            <RowCell tdStyle={{ padding: "0" }}>
                <Image
                    src={imageSrc}
                    linkTo={cardUrl}
                    alt={imageAlt}
                    rating={imageRating}
                    width={580}
                    pillar="Opinion"
                />
            </RowCell>
        </Table>
    </TableRowCell>
);
