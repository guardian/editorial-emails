import React from "react";
import { TdCSS, FontCSS } from "../../css";
import { palette } from "@guardian/src-foundations";
import { Content } from "../../api";
import { TableRow, TableRowCell } from "../../layout/Table";
import { textBody } from "../../styles/typography";
import { getTransformedFreeText } from "../../utils/getTransformedFreeText";

const outerTdStyle: TdCSS = {
    padding: "0 10px",
    verticalAlign: "top",
    backgroundColor: palette.neutral[97]
};

const innerTdStyle: TdCSS = {
    padding: "10px",
    verticalAlign: "top",
    backgroundColor: palette.neutral[100]
};

const freeTextStyle: FontCSS = {
    ...textBody({ level: 1 }),
    color: palette.neutral[7]
};

interface Props {
    content: Content;
}

export const FreeTextCard: React.FC<Props> = ({ content }) => {
    const { headline } = content.header;

    return (
        <TableRowCell tdStyle={outerTdStyle}>
            <TableRow>
                <td style={innerTdStyle}>
                    <span
                        style={freeTextStyle}
                        dangerouslySetInnerHTML={{
                            __html: getTransformedFreeText(headline)
                        }}
                    ></span>
                </td>
            </TableRow>
        </TableRowCell>
    );
};
