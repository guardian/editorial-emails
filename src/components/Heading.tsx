import React from "react";
import { TableCSS, TdCSS } from "../css";
import { palette } from "@guardian/src-foundations";
import { headline } from "../styles/typography";

const tableStyle: TableCSS = {
    borderSpacing: 0,
    borderCollapse: "collapse",
    width: "100%"
};

const headingStyle = (backgroundColor: string, color: string): TdCSS => {
    return {
        ...headline({ level: 3, fontWeight: "bold" }),
        color: color || palette.neutral[7],
        backgroundColor,
        padding: "0 10px 12px"
    };
};

export const Heading: React.FC<{
    heading: string;
    backgroundColor?: string;
    color?: string;
}> = ({ heading, backgroundColor, color }) => (
    <table style={tableStyle}>
        <tr>
            <td
                className="m-heading"
                style={headingStyle(backgroundColor, color)}
            >
                {heading}
            </td>
        </tr>
    </table>
);
