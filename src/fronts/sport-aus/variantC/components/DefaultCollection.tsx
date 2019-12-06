import React from "react";
import { Collection as ICollection } from "../../../../api";
import { DefaultGrid } from "../../../../layout/Grid";
import { Multiline } from "../../../../components/Multiline";
import { Heading } from "../../../../components/Heading";
import { DefaultCard } from "../../../../components/cards/DefaultCard";

export const DefaultCollection: React.FC<{
    collection: ICollection;
    salt?: string;
}> = ({ collection, salt }) => {
    const content = collection.backfill;

    return (
        <>
            <Multiline topPadding />
            <Heading heading={collection.displayName} />

            <DefaultGrid
                content={content}
                salt={salt}
                card={{
                    Component: DefaultCard,
                    props: { designName: "border" }
                }}
            />
        </>
    );
};
