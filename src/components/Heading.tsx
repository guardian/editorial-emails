import React from "react";
import { TdCSS } from "../css";
import { palette } from "@guardian/src-foundations";
import { headline } from "../styles/typography";

const headingStyle: TdCSS = {
    color: palette.neutral[7],
    padding: "3px 65px 15px 10px",

    ...headline({ level: 4, fontWeight: "bold" })
};

export const Heading: React.FC<{ heading: string }> = ({ heading }) => (
    <table>
        <tbody>
            <tr>
                <td style={headingStyle}>{heading}</td>
            </tr>
        </tbody>
    </table>
);
