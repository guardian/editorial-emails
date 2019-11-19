import React from "react";
import { Content } from "../api";
import { Card } from "../components/cards/Card";
import {
    ContributorImageWrapper,
    CommentCard
} from "../components/cards/CommentCard";
import { TdCSS, TrCSS, TableCSS } from "../css";
import { palette } from "@guardian/src-foundations";
import { TableRow } from "./Table";
import { Padding } from "./Padding";

const tableStyle: TableCSS = {
    borderCollapse: "collapse",
    borderSpacing: 0
};

const gutterStyle: TdCSS = {
    width: "2%"
};

type Align = "left" | "right";
type VAlign = "top" | "bottom";

const colStyle = (
    bgdColour: string,
    align: Align = "left",
    valign: VAlign = "top"
): TdCSS => ({
    width: "49%",
    backgroundColor: bgdColour,
    verticalAlign: valign,
    textAlign: align
});

const GridRow: React.FC<{
    left: React.ReactNode;
    right: React.ReactNode;
    bgdColour?: string;
    align?: "right";
    valign?: "bottom";
}> = ({ left, right, align, valign, bgdColour = palette.culture.faded }) => (
    <TableRow>
        <td style={colStyle(bgdColour, align, valign)}>{left}</td>
        <td style={gutterStyle}>&nbsp;</td>
        <td style={colStyle(bgdColour, align, valign)}>{right}</td>
    </TableRow>
);

function partition<T>(seq: T[], n: number): T[][] {
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
interface CommentGridProps {
    content: Content[];
    salt: string;
    shouldShowGridImages: boolean;
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

    return <table style={tableStyle}>{rows}</table>;
};

export const CommentGrid: React.FC<CommentGridProps> = ({
    content,
    salt,
    shouldShowGridImages
}) => {
    const rows = partition(content, 2).map((pair, i) => (
        <React.Fragment key={i}>
            <GridRow
                left={
                    <CommentCard
                        content={pair[0]}
                        salt={salt}
                        size={"small"}
                        shouldShowImage={shouldShowGridImages}
                    />
                }
                right={
                    <CommentCard
                        content={pair[1]}
                        salt={salt}
                        size={"small"}
                        shouldShowImage={shouldShowGridImages}
                    />
                }
                bgdColour={palette.opinion.faded}
            />
            <GridRow
                left={<ContributorImageWrapper content={pair[0]} salt={salt} />}
                right={
                    <ContributorImageWrapper content={pair[1]} salt={salt} />
                }
                bgdColour={palette.opinion.faded}
                align="right"
                valign="bottom"
            />

            <Padding px={10} />
        </React.Fragment>
    ));

    return <table style={tableStyle}>{rows}</table>;
};
