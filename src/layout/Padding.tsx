import React from "react";
import { TableCSS } from "../css";

const tableStyle: TableCSS = {
    borderSpacing: 0,
    borderCollapse: "collapse"
};

// TODO fix this for all clients
export const Padding: React.FC<{ px: number }> = ({ px }) => (
    <table style={tableStyle}>
        <tr>
            <td style={{ paddingTop: `${px}px` }}></td>
        </tr>
    </table>
);
