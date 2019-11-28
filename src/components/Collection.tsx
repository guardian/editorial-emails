import React from "react";
import { Collection as ICollection } from "../api";
import { DefaultGrid } from "../layout/Grid";
import { Heading } from "./Heading";
import { Multiline } from "./Multiline";
import { LinkGrid as LinkGridB } from "./tests/commentB/Grid";
import { LinkGrid as LinkGridC } from "./tests/commentC/Grid";

export const DefaultCollection: React.FC<{
    collection: ICollection;
    salt: string;
    variant: string;
}> = ({ collection, salt }) => {
    if (collection.backfill.length < 1) {
        return null;
    }

    const filmCollection = collection.backfill;

    return (
        <>
            <Multiline topPadding />
            <Heading heading={collection.displayName} />

            {filmCollection && (
                <DefaultGrid content={filmCollection} salt={salt} />
            )}
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
