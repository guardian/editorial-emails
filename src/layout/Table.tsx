import React from "react";
import { TableCSS, TrCSS, TdCSS } from "../css";

const defaultTableStyle: TableCSS = {
    borderSpacing: 0,
    borderCollapse: "collapse",
    width: "100%"
};

const defaultTrStyle: TrCSS = {};

const defaultTdStyle: TdCSS = {};

export const Table: React.FC<{
    children: React.ReactNode;
    tableStyle?: TableCSS;
}> = ({ children, tableStyle = {} }) => (
    <table style={{ ...defaultTableStyle, ...tableStyle }}>{children}</table>
);

export const TableRow: React.FC<{
    children: React.ReactNode;
    tableStyle?: TableCSS;
    trStyle?: TrCSS;
}> = ({ children, tableStyle = {}, trStyle = {} }) => (
    <table style={{ ...defaultTableStyle, ...tableStyle }}>
        <tr style={{ ...defaultTrStyle, ...trStyle }}>{children}</tr>
    </table>
);

export const TableRowCell: React.FC<{
    children: React.ReactNode;
    tableStyle?: TableCSS;
    trStyle?: TrCSS;
    tdStyle?: TdCSS;
}> = ({ children, tableStyle = {}, trStyle = {}, tdStyle = {} }) => (
    <table style={{ ...defaultTableStyle, ...tableStyle }}>
        <tr style={{ ...defaultTrStyle, ...trStyle }}>
            <td style={{ ...defaultTdStyle, ...tdStyle }}>{children}</td>
        </tr>
    </table>
);

export const RowCell: React.FC<{
    children: React.ReactNode;
    trStyle?: TrCSS;
    tdStyle?: TdCSS;
}> = ({ children, trStyle = {}, tdStyle = {} }) => (
    <tr style={{ ...defaultTrStyle, ...trStyle }}>
        <td style={{ ...defaultTdStyle, ...tdStyle }}>{children}</td>
    </tr>
);
