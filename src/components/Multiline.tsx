import React from "react";
import { palette } from "@guardian/src-foundations";
import { TableCSS, TdCSS } from "../css";

const tableStyle: TableCSS = {
    borderSpacing: 0,
    borderCollapse: "collapse",
    width: "100%"
};

const tdStyle: tdCSS = {
    width: "100%",
    paddingTop: "10px"
}

const lineStyle: TdCSS = {
    paddingBottom: "3px",
    borderTop: `1px solid ${palette.neutral[7]}`,
    lineHeight: "0",
    fontSize: "0"
};

export const Multiline: React.FC<{}> = () => (
    <table style={tableStyle}>
        <tr>
            <td style={tdStyle}>
                <table style={tableStyle}>
                {[0, 1, 2, 3].map(line => (
                    <tr>
                        <td style={lineStyle}>&nbsp;</td>
                    </tr>
                ))}
                </table>
            </td>
        </tr>
    </table>
);
