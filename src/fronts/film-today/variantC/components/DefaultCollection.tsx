import React from "react";
import { Collection as ICollection } from "../../../../api";
import { palette } from "@guardian/src-foundations";
import { DefaultGrid } from "../../../../layout/Grid";
import { Multiline } from "../../../../components/Multiline";
import { Heading } from "../../../../components/Heading";
import { HeadlineCard } from "../../../../components/cards/HeadlineCard";
import { DescriptiveCard } from "../../../../components/cards/DescriptiveCard";

export const DefaultCollection: React.FC<{
    collection: ICollection;
    salt?: string;
}> = ({ collection, salt }) => {
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
