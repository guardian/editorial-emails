import React from "react";
import { Collection as ICollection } from "../../api";
import { Collections } from "../../components/Collections";
import { Collections as CollectionsVariantZ } from "./variantZ/Collections";
import { Collections as CollectionsVariantC } from "./variantC/Collections";
import { Collections as CollectionsVariantB } from "./variantB/Collections";

export const MediaBriefing: React.FC<{
    frontId: string;
    collections: ICollection[];
    variant?: string;
}> = ({ frontId, collections, variant }) => {
    if (variant === "z") {
        // NOT IN USE
        // FKA VARIANT C
        return (
            <CollectionsVariantZ
                frontId={frontId}
                collections={collections}
            ></CollectionsVariantZ>
        );
    } else if (variant === "c") {
        return (
            <CollectionsVariantC
                frontId={frontId}
                collections={collections}
            ></CollectionsVariantC>
        );
    } else if (variant === "b") {
        return (
            <CollectionsVariantB
                frontId={frontId}
                collections={collections}
            ></CollectionsVariantB>
        );
    }

    return (
        <Collections frontId={frontId} collections={collections}></Collections>
    );
};
