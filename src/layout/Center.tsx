import React from "react";
import { tableCSS } from "../css";

export const Center: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <table style={{ width: "100%" }}>
        <tr>
            <td align="center">
                <table>
                    <tbody>
                        <tr>
                            <td style={{ width: "600px" }} >{children}</td>
                        </tr>
                    </tbody>
                </table>
            </td>
        </tr>
    </table >
);
