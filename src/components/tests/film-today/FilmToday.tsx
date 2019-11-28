import React from "react";
import { Collection as ICollection } from "../../../api";
import { DefaultCollection } from "../../Collection";
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
                collection={collections[0]}
                salt={salt}
            ></VariantC>
        );
    }

    return <DefaultCollection collection={collections[0]} salt={salt} />;
};
