import React from "react";
import { TableCSS } from "../css";

const tableStyle: TableCSS = {
    borderSpacing: 0,
    borderCollapse: "collapse",
    width: "100%"
};

export const Table: React.FC<{ children: React.ReactNode }> = ({
    children
}) => (
    <table style={tableStyle}>
        <tr>
            <td>{children}</td>
        </tr>
    </table>
);
