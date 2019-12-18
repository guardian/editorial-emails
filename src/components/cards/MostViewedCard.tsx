import React from "react";
import { TdCSS, FontCSS, TableCSS } from "../../css";
import { palette } from "@guardian/src-foundations";
import { Content } from "../../api";
import { kickerText } from "../../kicker";
import { Headline } from "../../components/Headline";
import { TableRow } from "../../layout/Table";
import { Image } from "../../components/Image";

interface Props {
    content: Content;
    index: string;
}

const brazeParameter = "?##braze_utm##";

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

export const MostViewedCard: React.FC<Props> = ({ content, index }) => {
    const { headline } = content.header;
    const webURL = content.properties.webUrl + brazeParameter;
    const showQuotation = content.display.showQuotedHeadline;

    const pillar = content.properties.maybeContent
        ? content.properties.maybeContent.metadata.pillar.name
        : null;

    const { showByline } = content.properties;
    const byline =
        showByline && content.properties.byline
            ? content.properties.byline
            : "";

    const kicker = content.header.kicker
        ? kickerText(content.header.kicker)
        : "";
    return (
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
                    linkTo={webURL}
                    kicker={kicker}
                    byline={byline}
                    pillar={pillar}
                    size="small"
                    showQuotation={showQuotation}
                ></Headline>
            </td>
        </TableRow>
    );
};
