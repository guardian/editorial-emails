import React from "react";
import { Collection as ICollection } from "../api";
import { DefaultCollection, LinkCollection } from "./Collection";
import {
    Collection as CommentCollectionB,
    EditorialCollection as EditorialCollectionB,
    MediaCollection as MediaCollectionB
} from "./tests/commentB/Collection";
import {
    Collection as CommentCollectionC,
    EditorialCollection as EditorialCollectionC,
    MediaCollection as MediaCollectionC
} from "./tests/commentC/Collection";

import { Collection as FilmCollectionC } from "./tests/filmC/Collection";

import { Content } from "../api";
import { TableRowCell } from "../layout/Table";

type DesignType =
    | "default"
    | "comment"
    | "media"
    | "editorial"
    | "link"
    | "film";

const getDesignType = (frontId: string, content: Content[]): DesignType => {
    const designTypes: Set<string> = new Set();

    // Allow certain front IDs to set the sam design type for all collections
    if (frontId === "email/film-today") {
        return "film";
    }

    content.forEach(c => {
        if (c.type === "LinkSnap") {
            designTypes.add("LinkSnap");
        } else {
            designTypes.add(c.card.cardStyle.type);
        }
    });

    if (designTypes.size > 1) {
        return "default";
    }

    switch (designTypes.values().next().value) {
        case "Comment":
            return "comment";
        case "Editorial":
            return "editorial";
        case "Media":
            return "media";
        case "LinkSnap":
            return "link";
        default:
            return "default";
    }
};

export const Collections: React.FC<{
    frontId: string;
    collections: ICollection[];
    salt: string;
    variant?: string;
}> = ({ frontId, collections, salt, variant }) => {
    const res = collections.map(collection => {
        const content = [].concat(collection.backfill, collection.curated); // TODO support curated too
        const designType = getDesignType(frontId, content);

        // Ignore the jobs/masterclasses collection for now
        // The collection displayName changes over time and isn't reliable enough for this condition
        // So intead, we use a different, also unreliable approach of checking for a collection
        // with one and only one curated item.
        // TODO: refactor this condition to be more reliable and last long term
        // Or otherwise remove condition and accept the jobs/masterclasses collection
        if (frontId === "email/opinion" && collection.curated.length === 1) {
            return null;
        }

        switch (designType) {
            case "editorial":
                if (variant === "c") {
                    return (
                        <EditorialCollectionC
                            collection={collection}
                            salt={salt}
                        />
                    );
                }

                return (
                    <EditorialCollectionB collection={collection} salt={salt} />
                );
            case "comment":
                if (variant === "c") {
                    return (
                        <CommentCollectionC
                            frontId={frontId}
                            collection={collection}
                            salt={salt}
                        />
                    );
                }

                return (
                    <CommentCollectionB
                        frontId={frontId}
                        collection={collection}
                        salt={salt}
                    />
                );
            case "comment":
                if (variant === "c") {
                    return (
                        <CommentCollectionC
                            frontId={frontId}
                            collection={collection}
                            salt={salt}
                        />
                    );
                }

                return (
                    <CommentCollectionB
                        frontId={frontId}
                        collection={collection}
                        salt={salt}
                    />
                );
            case "media":
                if (variant === "c") {
                    return (
                        <MediaCollectionC collection={collection} salt={salt} />
                    );
                }

                return <MediaCollectionB collection={collection} salt={salt} />;

            case "link":
                return (
                    <LinkCollection
                        collection={collection}
                        salt={salt}
                        variant={variant}
                    />
                );
            case "film":
                if (variant === "c") {
                    return (
                        <FilmCollectionC
                            frontId={frontId}
                            collection={collection}
                            salt={salt}
                        />
                    );
                }
                return (
                    <DefaultCollection
                        collection={collection}
                        salt={salt}
                        variant={variant}
                    />
                );
            case "default":
                return (
                    <DefaultCollection
                        collection={collection}
                        salt={salt}
                        variant={variant}
                    />
                );
        }
    });

    return <TableRowCell tdStyle={{ padding: "0" }}>{res}</TableRowCell>;
};
