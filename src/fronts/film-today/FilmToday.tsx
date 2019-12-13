import React from "react";
import { Collection as ICollection } from "../../api";
import { Collections } from "../../components/Collections";
import { Collections as CollectionsVariantB } from "./variantB/Collections";
import { Collections as CollectionsVariantC } from "./variantZ/Collections";
import { Collections as CollectionsVariantY } from "./variantY/Collections";

export const FilmToday: React.FC<{
    frontId: string;
    collections: ICollection[];
    salt: string;
    variant?: string;
}> = ({ frontId, collections, salt, variant }) => {
    if (variant === "z") {
        // NOT IN USE
        // FKA VARIANT C
        return (
            <CollectionsVariantC
                frontId={frontId}
                collections={collections}
                salt={salt}
            ></CollectionsVariantC>
        );
    }

    if (variant === "y") {
        return (
            <CollectionsVariantY
                frontId={frontId}
                collections={collections}
                salt={salt}
            ></CollectionsVariantY>
        );
    }

    if (variant === "b") {
        return (
            <CollectionsVariantB
                frontId={frontId}
                collections={collections}
                salt={salt}
            ></CollectionsVariantB>
        );
    }

    return (
        <Collections frontId={frontId} collections={collections} salt={salt} />
    );
};
