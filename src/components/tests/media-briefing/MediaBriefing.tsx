import React from "react";
import { Collection as ICollection } from "../../../api";
import { BriefingA } from "./BriefingA";
import { BriefingB } from "./BriefingB";
import { TableRowCell } from "../../../layout/Table";

export const MediaBriefing: React.FC<{
    frontId: string;
    collections: ICollection[];
    salt: string;
    variant?: string;
}> = ({ frontId, collections, salt, variant }) => {
    const topStories = collections[0].backfill;
    const opinionStories = collections[1].backfill;
    const tvRadioStories = collections[2].backfill;
    const jobsStories = collections[3].curated;

    if (variant === "a") {
        return (
            <TableRowCell tdStyle={{ padding: "0" }}>
                <BriefingA
                    frontId={frontId}
                    collections={collections}
                    salt={salt}
                ></BriefingA>
            </TableRowCell>
        );
    }

    return (
        <TableRowCell tdStyle={{ padding: "0" }}>
            <BriefingB
                frontId={frontId}
                collections={collections}
                salt={salt}
            ></BriefingB>
        </TableRowCell>
    );
};
