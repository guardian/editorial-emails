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
    width: "40px",
    padding: "5px 10px 20px 15px",
    verticalAlign: "top",
    textAlign: "left",
    borderTop: `1px solid ${palette.neutral[7]}`,
    backgroundColor: palette.neutral[100]
};

const rightColStyles: TdCSS = {
    paddingTop: "5px",
    paddingRight: "10px",
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
            <td style={leftColStyles} className="m-col-pad">
                <Image
                    src={getIndexImageURL(index)}
                    alt={String(index)}
                    ignoreWidth
                    height={30}
                />
            </td>
            <td style={rightColStyles} className="m-col-pad">
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
