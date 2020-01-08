import React from "react";
import { Content } from "../api";
import { DefaultCard } from "../components/cards/DefaultCard";
import { TdCSS } from "../css";
import { palette } from "@guardian/src-foundations";
import { TableRow, TableRowCell } from "./Table";
import { Padding } from "./Padding";
import { kickerText } from "../kicker";

const gutterStyle: TdCSS = {
    width: "2%",
    lineHeight: "0"
};

type VAlign = "top" | "bottom";

interface RowStyle {
    backgroundColor: string;
    verticalAlign?: VAlign;
    border?: string;
    borderBottom?: string;
    borderLeft?: string;
    lineHeight?: string;
}

const colStyle = (styles: RowStyle): TdCSS => {
    // Ensure we only apply the border shorthand property
    // OR the individual border declarations.
    const borderStyles: TdCSS = {};
    if (styles.border) {
        borderStyles.border = styles.border;
    } else {
        borderStyles.borderBottom = styles.borderBottom || "none";
        borderStyles.borderLeft = styles.borderLeft || "none";
    }

    return {
        width: "49%",
        backgroundColor: styles.backgroundColor || "transparent",
        verticalAlign: styles.verticalAlign || "top",
        lineHeight: styles.lineHeight || "inherit",
        padding: "0",
        height: "100%",
        ...borderStyles
    };
};

// By default, give the grid cells this background colour,
// which works well with the Default Card component used by the grid.
// This background colour can be overriden via props,
// which is useful behaviour if we choose to use the Grid
// with a different card component.
const defaultRowStyles: RowStyle = {
    backgroundColor: palette.culture.faded
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
    <table
        style={{
            width: "100%",
            height: "100%",
            borderSpacing: 0,
            borderCollapse: "collapse"
        }}
    >
        <tr>
            <td style={colStyle(leftStyles)}>{left}</td>
            <td style={gutterStyle}>&nbsp;</td>
            <td style={colStyle(rightStyles)}>{right}</td>
        </tr>
    </table>
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

type GridCard = {
    Component: React.ElementType;
    props: any;
};

interface DefaultGridProps {
    content: Content[];
    salt: string;
    card?: GridCard;
    leftStyles?: RowStyle;
    rightStyles?: RowStyle;
}

const defaultCard = {
    Component: DefaultCard,
    props: {}
};

// TODO really should accept a React element so that it doesn't have to know
// about Card or salt.
export const DefaultGrid: React.FC<DefaultGridProps> = ({
    content,
    salt,
    card = defaultCard,
    leftStyles,
    rightStyles
}) => {
    const rowsArray = partition(content, 2);
    const { Component, props } = card;
    const rows = rowsArray.map((pair, index) => {
        const leftPair = pair[0];
        const rightPair = pair[1];
        return (
            <React.Fragment key={index}>
                <GridRow
                    left={
                        <Component
                            headline={leftPair.header.headline}
                            byline={
                                leftPair.properties.showByline &&
                                leftPair.properties.byline
                                    ? leftPair.properties.byline
                                    : null
                            }
                            kicker={
                                leftPair.header.kicker
                                    ? kickerText(leftPair.header.kicker)
                                    : ""
                            }
                            isComment={leftPair.display.showQuotedHeadline}
                            cardUrl={leftPair.properties.webUrl}
                            pillar={
                                leftPair.properties.maybeContent
                                    ? leftPair.properties.maybeContent.metadata
                                          .pillar.name
                                    : null
                            }
                            imageSrc={
                                leftPair.properties.maybeContent
                                    ? leftPair.properties.maybeContent.trail
                                          .trailPicture.allImages[0].url
                                    : null
                            }
                            imageAlt={leftPair.header.headline}
                            imageSalt={salt}
                            imageRating={leftPair.card.starRating}
                            size="small"
                            {...props}
                        />
                    }
                    right={
                        rightPair ? (
                            <Component
                                headline={rightPair.header.headline}
                                byline={
                                    rightPair.properties.showByline &&
                                    rightPair.properties.byline
                                        ? rightPair.properties.byline
                                        : null
                                }
                                kicker={
                                    rightPair.header.kicker
                                        ? kickerText(rightPair.header.kicker)
                                        : ""
                                }
                                isComment={rightPair.display.showQuotedHeadline}
                                cardUrl={rightPair.properties.webUrl}
                                pillar={
                                    rightPair.properties.maybeContent
                                        ? rightPair.properties.maybeContent
                                              .metadata.pillar.name
                                        : null
                                }
                                imageSrc={
                                    rightPair.properties.maybeContent
                                        ? rightPair.properties.maybeContent
                                              .trail.trailPicture.allImages[0]
                                              .url
                                        : null
                                }
                                imageAlt={rightPair.header.headline}
                                imageSalt={salt}
                                imageRating={rightPair.card.starRating}
                                {...props}
                            />
                        ) : null
                    }
                    leftStyles={leftStyles}
                    rightStyles={rightStyles}
                />
                {index < rowsArray.length - 1 && <Padding px={12} />}
            </React.Fragment>
        );
    });

    return <TableRowCell>{rows}</TableRowCell>;
};
