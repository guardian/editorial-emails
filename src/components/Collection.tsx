import React from "react";
import { Collection as ICollection } from "../api";
import { Card } from "./Card";
import { Grid } from "../layout/Grid";
import { Padding } from "../layout/Padding";

export const Collection: React.FC<{
    collection: ICollection;
    salt: string;
}> = ({ collection, salt }) => {
    const rest = collection.backfill.slice(2);

    return (
        <>
            <Card content={collection.backfill[0]} salt={salt} />
            <Padding px={10} />

            <Card content={collection.backfill[1]} salt={salt} />
            <Padding px={10} />

            <Grid content={rest} salt={salt} />
        </>
    );
};
