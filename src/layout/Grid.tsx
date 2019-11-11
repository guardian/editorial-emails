import React from "react";
import { Content } from "../api";
import { Card } from "../components/cards/Card";
import { TdCSS, TrCSS, TableCSS } from "../css";
import { palette } from "@guardian/src-foundations";

const tableStyle: TableCSS = {
    borderCollapse: "collapse",
    borderSpacing: 0
};

const rowStyle: TrCSS = {
    verticalAlign: "top"
};

const gutterStyle: TdCSS = {
    width: "2%"
};

const colStyle: TdCSS = {
    width: "49%",
    backgroundColor: palette.culture.faded
};

interface Props {
    content: Content[];
    salt: string;
}

// TODO really should accept a React element so that it doesn't have to know
// about Card or salt.
export const Grid: React.FC<Props> = ({ content, salt }) => {
    // split into groups of two
    // return half-width cards
    const pairs = [];
    while (content.length) {
        pairs.push(content.splice(0, 2));
    }

    const rows = pairs.map((pair, i) => (
        <React.Fragment key={i}>
            <tr style={rowStyle}>
                <td style={colStyle}>
                    <Card content={pair[0]} salt={salt} size={"small"} />
                </td>
                <td style={gutterStyle}>&nbsp;</td>
                <td style={colStyle}>
                    <Card content={pair[1]} salt={salt} size={"small"} />
                </td>
            </tr>
            <tr>
                <td style={{ paddingTop: "10px" }}></td>
            </tr>
        </React.Fragment>
    ));

    return <table style={tableStyle}>{rows}</table>;
};
