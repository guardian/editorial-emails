import React from "react";
import { palette } from "@guardian/src-foundations";
import { TdCSS } from "../css";
import { Padding } from "../layout/Padding";
import { Table, TableRowCell } from "../layout/Table";

const tdStyle: TdCSS = {
    width: "100%"
};

const lineStyle: TdCSS = {
    paddingBottom: "2px",
    borderTop: `1px solid ${palette.neutral[7]}`,
    lineHeight: "0",
    fontSize: "0"
};

interface Props {
    topPadding?: boolean;
}

export const Multiline: React.FC<Props> = ({ topPadding }) => (
    <TableRowCell tdStyle={tdStyle}>
        {topPadding && <Padding px={12} />}
        <Table>
            {[0, 1, 2, 3].map((line, i) => (
                <tr key={i}>
                    <td style={lineStyle}>&nbsp;</td>
                </tr>
            ))}
        </Table>
    </TableRowCell>
);
