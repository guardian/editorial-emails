import React from "react";
import { TableCSS, TdCSS } from "../css";
import { palette } from "@guardian/src-foundations";

const tableStyle: TableCSS = {
    borderSpacing: 0,
    borderCollapse: "collapse",
    width: "100%"
};

const headingStyle = (backgroundColor: string, color: string): TdCSS => {
    return {
        fontFamily: "'GH Guardian Headline', Georgia, serif",
        fontSize: "22px",
        lineHeight: "26px",
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
