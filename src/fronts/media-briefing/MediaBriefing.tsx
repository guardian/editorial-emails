import React from "react";
import { Collection as ICollection } from "../../api";
import { Collections as CollectionsVariantB } from "./variantB/Collections";
import { Collections as CollectionsVariantC } from "./variantC/Collections";
import { Collections as CollectionsVariantD } from "./variantD/Collections";

export const MediaBriefing: React.FC<{
    frontId: string;
    collections: ICollection[];
    salt: string;
    variant?: string;
}> = ({ frontId, collections, salt, variant }) => {
    if (variant === "d") {
        return (
            <CollectionsVariantD
                frontId={frontId}
                collections={collections}
                salt={salt}
            ></CollectionsVariantD>
        );
    }

    if (variant === "c") {
        return (
            <CollectionsVariantC
                frontId={frontId}
                collections={collections}
                salt={salt}
            ></CollectionsVariantC>
        );
    }

    return (
        <CollectionsVariantB
            frontId={frontId}
            collections={collections}
            salt={salt}
        ></CollectionsVariantB>
    );
};
