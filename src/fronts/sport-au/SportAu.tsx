import React from "react";
import { Collection as ICollection } from "../../api";
import { Collections } from "../../components/Collections";
import { Collections as CollectionsVariantB } from "./variantB/Collections";
import { Collections as CollectionsVariantC } from "./variantC/Collections";

export const SportAu: React.FC<{
    frontId: string;
    collections: ICollection[];
    variant?: string;
}> = ({ frontId, collections, variant }) => {
    if (variant === "c") {
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
