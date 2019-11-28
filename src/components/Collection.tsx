import React from "react";
import { Collection as ICollection } from "../api";
import { DefaultGrid } from "../layout/Grid";
import { Heading } from "./Heading";
import { Multiline } from "./Multiline";

export const DefaultCollection: React.FC<{
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
