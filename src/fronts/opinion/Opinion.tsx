import React from "react";
import { Collection as ICollection } from "../../api";
import { Collections } from "../../components/Collections";
import { Collections as CollectionsVariantB } from "./variantB/Collections";
import { Collections as CollectionsVariantY } from "./variantY/Collections";
import { Collections as CollectionsVariantZ } from "./variantZ/Collections";

export const Opinion: React.FC<{
    frontId: string;
    collections: ICollection[];
    salt: string;
    variant?: string;
}> = ({ frontId, collections, salt, variant }) => {
    if (variant === "z") {
        // NOT IN USE
        // FKA VARIANT C
        return (
            <CollectionsVariantZ
                frontId={frontId}
                collections={collections}
                salt={salt}
            ></CollectionsVariantZ>
        );
    } else if (variant === "y") {
        // NOT IN USE
        // FKA VARIANT B
        return (
            <CollectionsVariantY
                frontId={frontId}
                collections={collections}
                salt={salt}
            ></CollectionsVariantY>
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
        <Collections
            frontId={frontId}
            collections={collections}
            salt={salt}
        ></Collections>
    );
};
