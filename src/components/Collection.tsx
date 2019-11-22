import React from "react";
import { Collection as ICollection } from "../api";
import { Card } from "./cards/Card";
import { DefaultGrid } from "../layout/Grid";
import { Padding } from "../layout/Padding";
import { Heading } from "./Heading";
import { Multiline } from "./Multiline";
import { LinkGrid as LinkGridB } from "./tests/commentB/Grid";
import { LinkGrid as LinkGridC } from "./tests/commentC/Grid";

export const DefaultCollection: React.FC<{
    collection: ICollection;
    salt: string;
    variant: string;
}> = ({ collection, salt, variant }) => {
    if (collection.backfill.length < 1) {
        return null;
    }

    // TODO handle curated collections
    const rest = collection.backfill.slice(1);

    const contentOne = collection.backfill[0];

    return (
        <>
            <Multiline topPadding />
            <Heading heading={collection.displayName} />

            <Card content={contentOne} salt={salt} size={"large"} />
            <Padding px={12} />

            {rest && <DefaultGrid content={rest} salt={salt} />}
        </>
    );
};

export const LinkCollection: React.FC<{
    collection: ICollection;
    salt: string;
    variant: string;
}> = ({ collection, salt, variant }) => {
    if (collection.curated.length < 1) {
        return null;
    }

    const content = collection.curated;

    return (
        <>
            <Multiline topPadding />
            <Heading heading={collection.displayName} />
            {content &&
                (variant === "c" ? (
                    <LinkGridC content={content} salt={salt} />
                ) : (
                    <LinkGridB content={content} salt={salt} />
                ))}
        </>
    );
};
