import React from "react";
import { css } from "../css";

const tableStyle: css = {
    borderSpacing: 0,
    borderCollapse: "collapse"
};

export const Padding: React.FC<{ px: number }> = ({ px }) => (
    <table style={tableStyle}>
        <tbody>
            <tr>
                <td style={{ paddingTop: `${px}px` }}></td>
            </tr>
        </tbody>
    </table>
);
