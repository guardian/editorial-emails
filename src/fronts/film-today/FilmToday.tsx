import React from "react";
import { Collection as ICollection } from "../../api";
import { Collections } from "../../components/Collections";
import { Collections as CollectionsVariantC } from "./variantC/Collections";

export const FilmToday: React.FC<{
    frontId: string;
    collections: ICollection[];
    salt: string;
    variant?: string;
}> = ({ frontId, collections, salt, variant }) => {
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
        <Collections frontId={frontId} collections={collections} salt={salt} />
    );
};
