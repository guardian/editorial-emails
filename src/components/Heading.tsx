import React from "react";
import { TableCSS, TdCSS } from "../css";
import { palette } from "@guardian/src-foundations";
import { headline } from "../styles/typography";

const tableStyle: TableCSS = {
    borderSpacing: 0,
    borderCollapse: "collapse",
    width: "100%"
};

const headingStyle: TdCSS = {
    color: palette.neutral[7],
    padding: "4px 65px 12px 10px",

    ...headline({ level: 4, fontWeight: "bold" })
};

export const Heading: React.FC<{ heading: string }> = ({ heading }) => (
    <table style={tableStyle}>
        <tr>
            <td style={headingStyle}>{heading}</td>
        </tr>
    </table>
);
