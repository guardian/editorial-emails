import React from "react";
import { Collection as ICollection } from "../../../api";

export const BriefingB: React.FC<{
    frontId: string;
    collections: ICollection[];
    salt: string;
}> = ({ collections, salt }) => {
    return <div>Media Briefing B</div>;
};
