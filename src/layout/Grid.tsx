import React from "react";
import { Content } from "../api";
import { Card } from "../components/cards/Card";
import { LinkCard } from "../components/cards/LinkCard";
import { TdCSS } from "../css";
import { palette } from "@guardian/src-foundations";
import { TableRow, TableRowCell } from "./Table";
import { Padding } from "./Padding";

const gutterStyle: TdCSS = {
    width: "2%",
    lineHeight: "0"
};

type VAlign = "top" | "bottom";

interface RowStyle {
    backgroundColor: string;
    verticalAlign?: VAlign;
    borderBottom?: string;
    borderLeft?: string;
    lineHeight?: string;
}

const colStyle = (styles: RowStyle): TdCSS => ({
    width: "49%",
    backgroundColor: styles.backgroundColor,
    verticalAlign: styles.verticalAlign || "top",
    borderBottom: styles.borderBottom || "none",
    borderLeft: styles.borderLeft || "none",
    lineHeight: styles.lineHeight || "inherit"
});

const defaultRowStyles: RowStyle = {
    backgroundColor: palette.neutral[100]
};

export const GridRow: React.FC<{
    left: React.ReactNode;
    right: React.ReactNode;
    leftStyles?: RowStyle;
    rightStyles?: RowStyle;
}> = ({
    left,
    right,
    leftStyles = defaultRowStyles,
    rightStyles = defaultRowStyles
}) => (
    <TableRow>
        <td style={colStyle(leftStyles)}>{left}</td>
        <td style={gutterStyle}>&nbsp;</td>
        <td style={colStyle(rightStyles)}>{right}</td>
    </TableRow>
);

export function partition<T>(seq: T[], n: number): T[][] {
    // split into groups of two
    // return half-width cards
    const groups = [];
    while (seq.length) {
        groups.push(seq.splice(0, n));
    }

    return groups;
}

interface DefaultGridProps {
    content: Content[];
    salt: string;
}

// TODO really should accept a React element so that it doesn't have to know
// about Card or salt.
export const DefaultGrid: React.FC<DefaultGridProps> = ({ content, salt }) => {
    const rows = partition(content, 2).map((pair, i) => (
        <React.Fragment key={i}>
            <GridRow
                left={<Card content={pair[0]} salt={salt} size={"small"} />}
                right={
                    pair[1] ? (
                        <Card content={pair[1]} salt={salt} size={"small"} />
                    ) : null
                }
            />

            <Padding px={10} />
        </React.Fragment>
    ));

    return <TableRowCell>{rows}</TableRowCell>;
};

// TODO really should accept a React element so that it doesn't have to know
// about Card or salt.
export const LinkGrid: React.FC<DefaultGridProps> = ({ content, salt }) => {
    const rows = partition(content, 2).map((pair, i) => (
        <React.Fragment key={i}>
            <GridRow
                left={<LinkCard content={pair[0]} theme={"dark"} />}
                right={
                    pair[1] ? (
                        <LinkCard content={pair[1]} theme={"light"} />
                    ) : null
                }
                leftStyles={{
                    backgroundColor: palette.neutral[20]
                }}
                rightStyles={{
                    backgroundColor: palette.neutral[86]
                }}
            />

            <Padding px={10} />
        </React.Fragment>
    ));

    return <TableRowCell>{rows}</TableRowCell>;
};
