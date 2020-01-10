import React from "react";
import { TdCSS } from "../../css";
import { palette } from "@guardian/src-foundations";
import { Headline } from "../../components/Headline";
import { TableRow } from "../../layout/Table";
import { Image } from "../../components/Image";
import { Pillar } from "../../api";

const leftColStyles: TdCSS = {
    width: "59px",
    padding: "0",
    verticalAlign: "top",
    textAlign: "left",
    borderTop: `1px solid ${palette.neutral[7]}`,
    backgroundColor: palette.neutral[100]
};

const rightColStyles: TdCSS = {
    padding: "4px 10px 5px 0",
    verticalAlign: "top",
    textAlign: "left",
    borderTop: `1px solid ${palette.neutral[7]}`,
    backgroundColor: palette.neutral[100]
};

const getIndexImageURL = (index: string) =>
    `https://static.guim.co.uk/editorial-emails/big-numbers/${index}.png`;

interface Props {
    headline: string;
    cardUrl: string;
    isComment?: boolean;
    pillar?: Pillar;
    byline?: string;
    kicker?: string;
    index: string;
}

export const MostViewedCard: React.FC<Props> = ({
    headline,
    cardUrl,
    isComment = false,
    pillar,
    byline,
    kicker,
    index
}) => (
    <TableRow>
        <td style={leftColStyles}>
            <Image
                src={getIndexImageURL(index)}
                alt={String(index)}
                ignoreWidth
                pillar={pillar}
                width={59}
                height={59}
            />
        </td>
        <td style={rightColStyles}>
            <Headline
                text={headline}
                linkTo={cardUrl}
                kicker={kicker}
                byline={byline}
                pillar={pillar}
                size="small"
                showQuotation={isComment}
            ></Headline>
        </td>
    </TableRow>
);
