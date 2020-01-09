import React from "react";
import { Collection as ICollection } from "../../../../api";
import { Heading } from "./../../../../components/Heading";
import { Multiline } from "./../../../../components/Multiline";
import { DefaultGrid } from "../../../../layout/Grid";

export const DefaultCollection: React.FC<{
    collection: ICollection;
}> = ({ collection }) => {
    if (collection.backfill.length < 1) {
        return null;
    }

    const filmCollection = collection.backfill;

    return (
        <>
            <Multiline topPadding />
            <Heading heading={collection.displayName} />

            {filmCollection && <DefaultGrid content={filmCollection} />}
        </>
    );
};
