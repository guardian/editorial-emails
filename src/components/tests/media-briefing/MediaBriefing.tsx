import React from "react";
import { Collection as ICollection } from "../../../api";
import { BriefingB } from "./BriefingB";
import { BriefingC } from "./BriefingC";

export const MediaBriefing: React.FC<{
    frontId: string;
    collections: ICollection[];
    salt: string;
    variant?: string;
}> = ({ frontId, collections, salt, variant }) => {
    if (variant === "c") {
        return (
            <BriefingC
                frontId={frontId}
                collections={collections}
                salt={salt}
            ></BriefingC>
        );
    }

    return (
        <BriefingB
            frontId={frontId}
            collections={collections}
            salt={salt}
        ></BriefingB>
    );
};
