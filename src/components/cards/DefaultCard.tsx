import React from "react";
import { TdCSS } from "../../css";
import { palette } from "@guardian/src-foundations";
import { Pillar } from "../../api";
import { Headline } from "../../components/Headline";
import { Image } from "../../components/Image";
import { Table, TableRowCell, RowCell } from "../../layout/Table";
import { pillarProps } from "../../utils/pillarProps";

type Size = "small" | "large";

type DesignName = "background" | "border";

const tdStyle = (
    designName: DesignName,
    isInsideGrid: boolean,
    pillar?: Pillar,
    backgroundColor?: string
): TdCSS => {
    if (designName === "border") {
        if (!isInsideGrid) {
            return {
                border: `1px solid ${palette.neutral[93]}`,
                backgroundColor: palette.neutral[100],
                verticalAlign: "top"
            };
        }

        return {
            verticalAlign: "top"
        };
    }

    const borderColour =
        pillar && pillarProps[pillar]
            ? pillarProps[pillar].colour
            : palette.culture.main;
    return {
        borderTop: `2px solid ${borderColour}`,
        backgroundColor: backgroundColor || palette.culture.faded
    };
};

const metaWrapperStyle = (size: Size): TdCSS => {
    const rightPad = size === "large" ? "40px" : "10px";
    return {
        height: "100%",
        padding: `3px ${rightPad} 5px 10px`
    };
};

const bottomPaddingStyle: TdCSS = {
    paddingBottom: "20px"
};

interface Props {
    headline: string;
    isComment?: boolean;
    cardUrl: string;
    pillar?: Pillar;
    byline: string;
    kicker?: string;
    imageSrc?: string;
    imageAlt?: string;
    imageSalt?: string;
    imageRating?: number;
    size: Size;
    designName?: DesignName;
    isInsideGrid?: boolean;
    backgroundColor?: string;
}

export const DefaultCard: React.FC<Props> = ({
    headline,
    byline,
    kicker,
    isComment = false,
    cardUrl,
    pillar,
    imageSrc,
    imageAlt,
    imageSalt,
    imageRating,
    size = "small",
    designName = "background",
    isInsideGrid = false,
    backgroundColor
}) => {
    return (
        <TableRowCell
            tableStyle={{ height: "100%" }}
            tdStyle={tdStyle(designName, isInsideGrid, pillar, backgroundColor)}
        >
            <Table tableStyle={{ height: "100%" }}>
                {imageSrc && (
                    <RowCell>
                        <Image
                            src={imageSrc}
                            alt={imageAlt}
                            width={size === "large" ? 600 : 294}
                            pillar={pillar}
                            linkTo={`${cardUrl}?##braze_utm##`}
                        />
                    </RowCell>
                )}

                <tr style={{ verticalAlign: "top" }}>
                    <td className="m-pad" style={metaWrapperStyle(size)}>
                        <Headline
                            text={headline}
                            linkTo={`${cardUrl}?##braze_utm##`}
                            size={size}
                            pillar={pillar}
                            kicker={kicker}
                            byline={byline}
                            showQuotation={isComment}
                        />
                    </td>
                </tr>

                <tr>
                    <td className="m-col-pad" style={bottomPaddingStyle}></td>
                </tr>
            </Table>
        </TableRowCell>
    );
};
