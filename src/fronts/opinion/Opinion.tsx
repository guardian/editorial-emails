import React from "react";
import { Collection as ICollection } from "../../api";
import { Collections as CollectionsVariantB } from "./variantB/Collections";
import { Collections as CollectionsVariantC } from "./variantC/Collections";
import { Collections as CollectionsVariantZ } from "./variantZ/Collections";

export const Opinion: React.FC<{
    frontId: string;
    collections: ICollection[];
    salt: string;
    variant?: string;
}> = ({ frontId, collections, salt, variant }) => {
    if (variant === "z") {
        return (
            <CollectionsVariantZ
                frontId={frontId}
                collections={collections}
                salt={salt}
            ></CollectionsVariantZ>
        );
    } else if (variant === "c") {
        return (
            <CollectionsVariantC
                frontId={frontId}
                collections={collections}
                salt={salt}
            ></CollectionsVariantC>
        );
    } else if (variant === "b") {
        return (
            <CollectionsVariantB
                frontId={frontId}
                collections={collections}
                salt={salt}
            ></CollectionsVariantB>
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
