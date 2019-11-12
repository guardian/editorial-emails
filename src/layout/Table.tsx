import React from "react";
import { TableCSS, TdCSS } from "../css";

const tableStyle: TableCSS = {
    borderSpacing: 0,
    borderCollapse: "collapse",
    width: "100%"
};

export const Table: React.FC<{ children: React.ReactNode }> = ({
    children
}) => <table style={tableStyle}>{children}</table>;

export const TableRow: React.FC<{ children: React.ReactNode }> = ({
    children
}) => (
    <table style={tableStyle}>
        <tr>{children}</tr>
    </table>
);

export const TableRowCell: React.FC<{
    children: React.ReactNode;
    tdStyle: TdCSS;
}> = ({ children, tdStyle }) => (
    <table style={tableStyle}>
        <tr>
            <td style={tdStyle}>{children}</td>
        </tr>
    </table>
);

export const RowCell: React.FC<{
    children: React.ReactNode;
}> = ({ children }) => (
    <tr>
        <td>{children}</td>
    </tr>
);
