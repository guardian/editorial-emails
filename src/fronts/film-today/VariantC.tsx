import React from "react";
import { Collection as ICollection } from "../../api";
import { palette } from "@guardian/src-foundations";
import { Multiline } from "../../components/Multiline";
import { Heading } from "../../components/Heading";
import { HeadlineCard } from "../../components/cards/HeadlineCard";
import { DescriptiveCard } from "./../../components/cards/DescriptiveCard";
import { DefaultGrid } from "../../layout/Grid";

export const VariantC: React.FC<{
    frontId: string;
    collection: ICollection;
    salt: string;
}> = ({ collection, salt }) => {
    if (collection.backfill.length < 1) {
        return null;
    }

    const firstContent = collection.backfill[0];
    const gridContent = collection.backfill.slice(1, 5);
    const lastContent = collection.backfill[5];

    return (
        <>
            <DescriptiveCard
                content={firstContent}
                salt={salt}
                showByline={firstContent.properties.showByline}
            />
            <Multiline />
            <Heading heading="More top stories" />
            {gridContent && <DefaultGrid content={gridContent} salt={salt} />}
            <HeadlineCard
                content={lastContent}
                backgroundColor={palette.culture.faded}
            />
        </>
    );
};
