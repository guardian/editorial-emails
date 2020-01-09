import React from "react";
import { Collection as ICollection } from "../../../../api";
import { DefaultGrid } from "../../../../layout/Grid";
import { Multiline } from "../../../../components/Multiline";
import { Heading } from "../../../../components/Heading";
import { DefaultCard } from "../../../../components/cards/DefaultCard";
import { palette } from "@guardian/src-foundations";

export const DefaultCollection: React.FC<{
    collection: ICollection;
}> = ({ collection }) => {
    const content = [].concat(collection.curated).concat(collection.backfill);
    if (content.length < 1) {
        return null;
    }

    // Pass a background color and border styles to be used by the grid cell.
    // This ensures all cells in a row will have the same background and border,
    // giving the impression that the cards inside match each other's heights.
    // This is needed because we can't rely on the cards themselves
    // expanding vertically in the cell to use the available height.
    const colStyles = {
        backgroundColor: palette.neutral[100],
        border: `1px solid ${palette.neutral[93]}`
    };

    return (
        <>
            <Multiline topPadding />
            <Heading heading={collection.displayName} />

            <DefaultGrid
                content={content}
                card={{
                    Component: DefaultCard,
                    props: { designName: "border", isInsideGrid: true }
                }}
                leftStyles={colStyles}
                rightStyles={colStyles}
            />
        </>
    );
};
