import React from "react";
import { TableCSS } from "../css";
import { palette } from "@guardian/src-foundations";

const tableStyle: TableCSS = {
    borderSpacing: 0,
    borderCollapse: "collapse",
    background: palette.neutral[100],
    height: "100%",
    width: "100%",
};

const innerTableStyle: TableCSS = {
    borderSpacing: 0,
    borderCollapse: "collapse",
};

const containerTableStyle: TableCSS = {
    borderSpacing: 0,
    borderCollapse: "collapse",
    background: palette.neutral[100],
    margin: "0 auto",
};
export const Center: React.FC<{ children: React.ReactNode }> = ({
    children
}) => (
    <table className="gwfw" style={tableStyle}>
        <tr>
            <td align="center" valign="top">
                <center className="center-element" style={{ width: "100%" }}>
                    <table style={innerTableStyle}>
                        <tr>
                            <td style={{ width: "600px" }}>
                                <table align="center" className="container" style={containerTableStyle}>
                                    <tr>
                                        <td>{children}</td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                </center>
            </td>
        </tr>
    </table>
);
