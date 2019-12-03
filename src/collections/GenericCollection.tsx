import React from "react";
import { Collection as ICollection } from "../api";
import { DefaultGrid } from "../layout/Grid";
import { Heading } from "../components/Heading";
import { Multiline } from "../components/Multiline";

export const GenericCollection: React.FC<{
    collection: ICollection;
    salt: string;
}> = ({ collection, salt }) => {
    if (collection.backfill.length < 1) {
        return null;
    }

    return (
        <>
            <Multiline topPadding />
            <Heading heading={collection.displayName} />
            <DefaultGrid content={collection.backfill} salt={salt} />
        </>
    );
};
