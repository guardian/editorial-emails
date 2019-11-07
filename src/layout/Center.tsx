import React from "react";
import { TableCSS } from "../css";
import { palette } from "@guardian/src-foundations";

const mainTableStyle: TableCSS = {
    borderSpacing: 0,
    borderCollapse: "collapse",
    background: palette.neutral[100],
    height: "100%",
    width: "100%"
};

const tableStyle: TableCSS = {
    borderSpacing: 0,
    borderCollapse: "collapse",
    width: "100%"
};

const innerTableStyle: TableCSS = {
    borderSpacing: 0,
    borderCollapse: "collapse"
};

const containerTableStyle: TableCSS = {
    borderSpacing: 0,
    borderCollapse: "collapse",
    background: palette.neutral[100],
    margin: "0 auto",
    textAlign: "left"
};
export const Center: React.FC<{ children: React.ReactNode }> = ({
    children
}) => (
    <table style={mainTableStyle}>
        <tr>
            <td align="center" valign="top">
                <table className="center-element" style={tableStyle}>
                    <tr>
                        <td align="center" valign="top">
                            <table style={innerTableStyle}>
                                <tr>
                                    <td style={{ width: "600px" }}>
                                        <table
                                            className="container"
                                            style={containerTableStyle}
                                        >
                                            <tr>
                                                <td>{children}</td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
);
