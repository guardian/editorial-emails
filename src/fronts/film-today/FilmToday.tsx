import React from "react";
import { Collection as ICollection } from "../../api";
import { Collections } from "../../components/Collections";
import { Collections as CollectionsVariantB } from "./variantB/Collections";
import { Collections as CollectionsVariantC } from "./variantZ/Collections";

export const FilmToday: React.FC<{
    frontId: string;
    collections: ICollection[];
    variant?: string;
}> = ({ frontId, collections, variant }) => {
    if (variant === "z") {
        // NOT IN USE
        // FKA VARIANT C
        return (
            <CollectionsVariantC
                frontId={frontId}
                collections={collections}
            ></CollectionsVariantC>
        );
    }

    if (variant === "b") {
        return (
            <CollectionsVariantB
                frontId={frontId}
                collections={collections}
            ></CollectionsVariantB>
        );
    }

    return <Collections frontId={frontId} collections={collections} />;
};
