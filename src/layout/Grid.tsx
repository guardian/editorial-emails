import React from "react";
import { Content } from "../api";
import { Card } from "../components/cards/Card";
import { TdCSS, TrCSS, TableCSS } from "../css";
import { palette } from "@guardian/src-foundations";
import { TableRow, TableRowCell } from "./Table";
import { Padding } from "./Padding";

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
    backgroundColor: palette.culture.faded,

    ...rowStyle
};

interface Props {
    content: Content[];
    salt: string;
}

const GridRow: React.FC<{ left: React.ReactNode; right: React.ReactNode }> = ({
    left,
    right
}) => (
    <TableRow>
        <td style={colStyle}>{left}</td>
        <td style={gutterStyle}>&nbsp;</td>
        <td style={colStyle}>{right}</td>
    </TableRow>
);

// TODO really should accept a React element so that it doesn't have to know
// about Card or salt.
export const Grid: React.FC<Props> = ({ content, salt }) => {
    // split into groups of two
    // return half-width cards
    const pairs = [];
    while (content.length) {
        pairs.push(content.splice(0, 2));
    }

    // TODO handle contributor images
    const rows = pairs.map((pair, i) => (
        <React.Fragment key={i}>
            <GridRow
                left={<Card content={pair[0]} salt={salt} size={"small"} />}
                right={<Card content={pair[1]} salt={salt} size={"small"} />}
            />

            <Padding px={10} />
        </React.Fragment>
    ));

    return <table style={tableStyle}>{rows}</table>;
};
