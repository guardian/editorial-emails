import React from "react";
import { TdCSS, FontCSS, TableCSS } from "../../css";
import { palette } from "@guardian/src-foundations";
import { Content } from "../../api";
import { kickerText } from "../../kicker";
import { Headline } from "../../components/Headline";
import { TableRow } from "../../layout/Table";

interface Props {
    content: Content;
    index: number;
}

const brazeParameter = "?##braze_utm##";

const tableStyles: TableCSS = {
    borderTop: `1px solid ${palette.neutral[7]}`,
    backgroundColor: palette.neutral[100]
};

const leftColStyles: TdCSS = {
    width: "40px",
    padding: "0 10px 20px 20px",
    verticalAlign: "top",
    textAlign: "left"
};

const rightColStyles: TdCSS = {
    padding: "5px 10px 20px 0",
    verticalAlign: "top",
    textAlign: "left"
};

const indexStyles: FontCSS = {
    fontFamily: "GH Guardian Headline, Georgia, serif",
    fontSize: "42px",
    lineHeight: "42px",
    fontWeight: 700,
    color: palette.neutral[7]
};

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
        <TableRow tableStyle={tableStyles}>
            <td style={leftColStyles} className="m-col-pad">
                <span style={indexStyles}>{index}</span>
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
