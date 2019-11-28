import React from "react";
import { Collection as ICollection } from "../../../api";
import { VariantB } from "./VariantB";
import { VariantC } from "./VariantC";

export const MediaBriefing: React.FC<{
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
        <VariantB
            frontId={frontId}
            collections={collections}
            salt={salt}
        ></VariantB>
    );
};
