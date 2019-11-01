import React from "react";
import { TableCSS, TdCSS } from "../css";
import { palette } from "@guardian/src-foundations";

const tableStyle: TableCSS = {
    borderSpacing: 0,
    borderCollapse: "collapse",
    width: "100%"
};

const headingStyle: TdCSS = {
    fontFamily: "'Guardian Egyptian Web Header', Georgia, serif",
    fontSize: "30px",
    lineHeight: "38px",
    color: palette.neutral[7],
    padding: "4px 12px 0",
};

export const Heading: React.FC<{ heading: string }> = ({ heading }) => (
    <table style={tableStyle}>
        <tr>
            <td className="m-heading" style={headingStyle}>{heading}</td>
        </tr>
    </table>
);
