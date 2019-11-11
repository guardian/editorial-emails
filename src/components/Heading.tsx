import React from "react";
import { TableCSS, TdCSS } from "../css";
import { palette } from "@guardian/src-foundations";

const tableStyle: TableCSS = {
    borderSpacing: 0,
    borderCollapse: "collapse",
    width: "100%"
};

const headingStyle: TdCSS = {
    fontFamily: "'GH Guardian Headline', Georgia, serif",
    fontSize: "22px",
    lineHeight: "26px",
    color: palette.neutral[7],
    padding: "0 10px 12px"
};

export const Heading: React.FC<{ heading: string }> = ({ heading }) => (
    <table style={tableStyle}>
        <tr>
            <td className="m-heading" style={headingStyle}>
                {heading}
            </td>
        </tr>
    </table>
);
