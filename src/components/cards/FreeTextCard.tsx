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
    padding: "6px 16px 12px 6px",
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

    // const testContent =
    //     headline +
    //     "<img src='https://i.guim.co.uk/img/media/d573f1050d94b11617204efffa6b0fe64fdf8f63/0_0_3500_2100/master/3500.jpg?width=620&quality=45&auto=format&fit=max&dpr=2&s=34e2c4a165177d981addc68c38485dea' alt='Alt Image' />";

    return (
        <TableRowCell tdStyle={outerTdStyle}>
            <TableRow>
                <td style={innerTdStyle}>
                    <span
                        style={freeTextStyle}
                        dangerouslySetInnerHTML={{
                            __html: getTransformedFreeText(testContent)
                        }}
                    ></span>
                </td>
            </TableRow>
        </TableRowCell>
    );
};
