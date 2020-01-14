import React from "react";
import { Collection as ICollection } from "../../api";
import { Collections } from "../../components/Collections";
import { Collections as CollectionsVariantB } from "./variantB/Collections";
import { Collections as CollectionsVariantY } from "./variantY/Collections";
import { Collections as CollectionsVariantZ } from "./variantZ/Collections";

export const Opinion: React.FC<{
    frontId: string;
    collections: ICollection[];
    variant?: string;
}> = ({ frontId, collections, variant }) => {
    if (variant === "z") {
        return (
            <CollectionsVariantZ
                frontId={frontId}
                collections={collections}
            ></CollectionsVariantZ>
        );
    } else if (variant === "y") {
        return (
            <CollectionsVariantY
                frontId={frontId}
                collections={collections}
            ></CollectionsVariantY>
        );
    } else if (variant === "b") {
        return (
            <CollectionsVariantB
                frontId={frontId}
                collections={collections}
            ></CollectionsVariantB>
        );
    }

    return <Collections frontId={frontId} collections={collections} />;
};
