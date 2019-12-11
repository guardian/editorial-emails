import React from "react";
import { TdCSS } from "../css";
import { palette } from "@guardian/src-foundations";
import { headline } from "../styles/typography";
import { TableRow } from "../layout/Table";

const headingStyle = (backgroundColor: string, color: string): TdCSS => {
    return {
        ...headline({ level: 2, fontWeight: "bold" }),
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
    <TableRow>
        <td className="m-heading" style={headingStyle(backgroundColor, color)}>
            {heading}
        </td>
    </TableRow>
);
