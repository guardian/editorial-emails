import React from "react";
import { Collection as ICollection } from "../../api";
import { Collections } from "../../components/Collections";
import { Collections as CollectionsVariantB } from "./variantB/Collections";

export const BusinessToday: React.FC<{
    frontId: string;
    collections: ICollection[];
    salt: string;
    variant?: string;
}> = ({ frontId, collections, salt, variant }) => {
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
