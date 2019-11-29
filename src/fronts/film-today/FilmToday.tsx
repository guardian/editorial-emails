import React from "react";
import { Collection as ICollection } from "../../api";
import { Collections } from "../../components/Collections";
import { VariantC } from "./VariantC";

export const FilmToday: React.FC<{
    frontId: string;
    collections: ICollection[];
    salt: string;
    variant?: string;
}> = ({ frontId, collections, salt, variant }) => {
    if (variant === "c") {
        return (
            <VariantC
                frontId={frontId}
                collections={collections}
                salt={salt}
            ></VariantC>
        );
    }

    return (
        <Collections frontId={frontId} collections={collections} salt={salt} />
    );
};
