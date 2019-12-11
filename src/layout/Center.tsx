import React from "react";
import { TableCSS, TdCSS } from "../css";
import { palette } from "@guardian/src-foundations";
import { Table, TableRowCell } from "../layout/Table";

const tableStyle: TableCSS = {
    borderSpacing: 0,
    borderCollapse: "collapse",
    width: "100%"
};

const containerTableStyle: TableCSS = {
    borderSpacing: 0,
    borderCollapse: "collapse",
    background: palette.neutral[100],
    margin: "0 auto",
    textAlign: "left"
};

const noPadding: TdCSS = {
    padding: "0"
};

export const Center: React.FC<{ children: React.ReactNode }> = ({
    children
}) => (
    <Table
        tableStyle={{
            background: palette.neutral[100],
            height: "100%"
        }}
    >
        <tr>
            <td align="center" valign="top">
                <table className="center-element" style={tableStyle}>
                    <tr>
                        <td align="center" valign="top">
                            <TableRowCell
                                tableStyle={{ width: "auto" }}
                                tdStyle={{ width: "600px" }}
                            >
                                <table
                                    className="container"
                                    style={containerTableStyle}
                                >
                                    <tr>
                                        <td style={noPadding}>{children}</td>
                                    </tr>
                                </table>
                            </TableRowCell>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </Table>
);
