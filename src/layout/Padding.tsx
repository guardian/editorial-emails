import React from "react";
import { TableCSS } from "../css";
import { wide } from "@guardian/src-foundations";

const tableStyle: TableCSS = {
    borderSpacing: 0,
    borderCollapse: "collapse",
    width: "100%"
};

type Props = {
    px: number;
    backgroundColor?: string;
};

// TODO fix this for all clients
export const Padding: React.FC<Props> = ({ px, backgroundColor }) => (
    <table style={tableStyle}>
        <tr>
            <td
                style={{
                    lineHeight: "0",
                    paddingTop: `${px}px`,
                    backgroundColor: backgroundColor || "transparent"
                }}
            >
                &nbsp;
            </td>
        </tr>
    </table>
);
