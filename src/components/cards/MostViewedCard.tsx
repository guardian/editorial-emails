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
    index: number;
}

const brazeParameter = "?##braze_utm##";

const leftColStyles: TdCSS = {
    width: "45px",
    padding: "0 10px 20px 10px",
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

const indexStyles: FontCSS = {
    fontFamily: "GH Guardian Headline, Georgia, serif",
    fontSize: "42px",
    lineHeight: "52px",
    fontWeight: 700,
    color: palette.neutral[7]
};

enum IndexImages {
    Index1 = "https://i.ibb.co/dg0C1JQ/1.png",
    Index2 = "https://i.ibb.co/d42w5j5/2.png",
    Index3 = "https://i.ibb.co/n8B1JkB/3.png",
    Index4 = "https://i.ibb.co/GnxbChw/4.png",
    Index5 = "https://i.ibb.co/RpNSNX9/5.png",
    Index6 = "https://i.ibb.co/kGQ91FD/6.png",
    Index7 = "https://i.ibb.co/Nx8zpRr/7.png",
    Index8 = "https://i.ibb.co/tZG2vqg/8.png",
    Index9 = "https://i.ibb.co/PMh7rm1/9.png",
    Index10 = "https://i.ibb.co/mtvMrth/10.png"
}

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
                {/* <span style={indexStyles}>{index}</span> */}
                <Image
                    src={IndexImages["Index" + String(index)]}
                    alt={String(index)}
                    ignoreWidth
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
