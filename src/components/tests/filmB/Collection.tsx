import React from "react";
import { Collection as ICollection } from "../../../api";
import { Card } from "../../cards/Card";
import { HeadlineCard } from "../../cards/HeadlineCard";
import { DefaultGrid } from "../../../layout/Grid";
import { Padding } from "../../../layout/Padding";
import { Heading } from "../../Heading";
import { Multiline } from "../../Multiline";

export const Collection: React.FC<{
    collection: ICollection;
    salt: string;
    variant: string;
}> = ({ collection, salt, variant }) => {
    if (collection.backfill.length < 1) {
        return null;
    }

    const firstContent = collection.backfill[0];
    const gridContent = collection.backfill.slice(1, 5);
    const lastContent = collection.backfill[5];

    return (
        <>
            <Card content={firstContent} salt={salt} size={"large"} />
            <Multiline />
            <Heading heading="More top stories" />
            {gridContent && <DefaultGrid content={gridContent} salt={salt} />}
            <Padding px={12} />
            <HeadlineCard content={lastContent} />
        </>
    );
};
