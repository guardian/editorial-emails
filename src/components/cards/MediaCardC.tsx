import React from "react";
import { TdCSS } from "../../css";
import { palette } from "@guardian/src-foundations";
import { Table, RowCell, TableRowCell } from "../../layout/Table";
import { Image } from "../../components/Image";
import { headline } from "../../styles/typography";

const tdStyle: TdCSS = {
    backgroundColor: palette.neutral[100],
    padding: "0px 10px 20px 10px",
    borderLeft: `1px solid ${palette.neutral[20]}`,
    borderBottom: `1px solid ${palette.neutral[20]}`
};

const tdHeadlineStyle: TdCSS = {
    ...headline({ level: 2 }),
    color: palette.neutral[20]
};

interface Props {
    headline: string;
    cardUrl: string;
    imageSrc?: string;
    imageAlt?: string;
    imageRating?: number;
}

export const MediaCardC: React.FC<Props> = ({
    headline,
    cardUrl,
    imageSrc,
    imageAlt,
    imageRating
}) => (
    <TableRowCell tdStyle={tdStyle}>
        <Table>
            <RowCell>
                <Image
                    src={imageSrc}
                    linkTo={cardUrl}
                    alt={imageAlt}
                    width={579}
                    rating={imageRating}
                    pillar="Opinion"
                />
            </RowCell>
            <RowCell tdStyle={tdHeadlineStyle}>{headline}</RowCell>
        </Table>
    </TableRowCell>
);
