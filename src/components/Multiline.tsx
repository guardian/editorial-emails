import React from "react";
import { css } from "../css";

const tableStyle: css = {
    borderSpacing: 0,
    borderCollapse: "collapse",
    width: "100%"
};

const lineStyle: css = {
    paddingBottom: "3px",
    borderTop: "1px solid rgb(18, 18, 18)",
    lineHieght: "0",
    fontSize: "0"
};

export const Multiline: React.FC<{}> = () => (
    <table style={tableStyle}>
        <tbody>
            {[0, 1, 2].map(line => (
                <tr>
                    <td style={lineStyle}>&nbsp;</td>
                </tr>
            ))}
        </tbody>
    </table>
);
