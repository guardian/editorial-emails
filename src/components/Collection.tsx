import React from "react";
import { Collection as ICollection } from "../api";
import { Card } from "./cards/Card";
import { Grid } from "../layout/Grid";
import { Padding } from "../layout/Padding";

export const Collection: React.FC<{
    collection: ICollection;
    salt: string;
}> = ({ collection, salt }) => {
    // TODO handle curated collections
    const rest = collection.backfill.slice(2);

    const contentOne = collection.backfill[0];
    const contentTwo = collection.backfill[1];

    return (
        <>
            <Card content={contentOne} salt={salt} size={"large"} />
            <Padding px={10} />

            <Card content={contentTwo} salt={salt} size={"large"} />
            <Padding px={10} />

            <Grid content={rest} salt={salt} />
        </>
    );
};
