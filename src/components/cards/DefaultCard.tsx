import React from "react";
import { TdCSS, TableCSS } from "../../css";
import { palette } from "@guardian/src-foundations";
import { Content } from "../../api";
import { formatImage } from "../../image";
import { kickerText } from "../../kicker";
import { Headline } from "../../components/Headline";
import { Image } from "../../components/Image";

type Size = "small" | "large";

type DesignName = "background" | "border";

const tableStyle: TableCSS = {
    borderSpacing: 0,
    borderCollapse: "collapse",
    width: "100%"
};

const tdStyle = (designName: DesignName, isInsideGrid: boolean): TdCSS => {
    if (designName === "border") {
        if (!isInsideGrid) {
            return {
                border: `1px solid ${palette.neutral[93]}`,
                backgroundColor: palette.neutral[100],
                padding: "0",
                verticalAlign: "top"
            };
        }

        return {
            padding: "0",
            verticalAlign: "top"
        };
    }

    return {
        borderTop: `2px solid ${palette.culture.main}`,
        backgroundColor: palette.culture.faded,
        padding: "0"
    };
};

const metaWrapperStyle = (size: Size): TdCSS => {
    const rightPad = size === "large" ? "40px" : "10px";
    return {
        padding: `3px ${rightPad} 5px 10px`
    };
};

const bottomPaddingStyle: TdCSS = {
    paddingBottom: "20px"
};

interface Props {
    content: Content;
    salt: string;
    size: Size;
    designName?: DesignName;
    isInsideGrid?: boolean;
}

const brazeParameter = "?##braze_utm##";

export const DefaultCard: React.FC<Props> = ({
    content,
    salt,
    size,
    designName = "background",
    isInsideGrid = false
}) => {
    const image =
        content.properties.maybeContent.trail.trailPicture.allImages[0];
    const formattedImage = formatImage(
        image.url,
        salt,
        size === "large" ? 600 : 300,
        content.card.starRating
    );

    const headline = content.header.headline;
    const webURL = content.properties.webUrl + brazeParameter;
    const imageURL = formattedImage;
    const imageAlt = content.header.headline;
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
        <table style={tableStyle}>
            <tr>
                <td style={tdStyle(designName, isInsideGrid)}>
                    <table style={tableStyle}>
                        {imageURL && (
                            <tr>
                                <td
                                    style={{
                                        padding: 0
                                    }}
                                >
                                    <Image
                                        src={imageURL}
                                        alt={imageAlt}
                                        width={size === "large" ? 600 : 294}
                                        pillar={pillar}
                                        linkTo={webURL}
                                    />
                                </td>
                            </tr>
                        )}

                        <tr style={{ verticalAlign: "top" }}>
                            <td
                                className="m-pad"
                                style={metaWrapperStyle(size)}
                            >
                                <Headline
                                    text={headline}
                                    linkTo={webURL}
                                    size={size}
                                    pillar={pillar}
                                    kicker={kicker}
                                    byline={byline}
                                    showQuotation={showQuotation}
                                />
                            </td>
                        </tr>

                        <tr>
                            <td
                                className="m-col-pad"
                                style={bottomPaddingStyle}
                            ></td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    );
};
