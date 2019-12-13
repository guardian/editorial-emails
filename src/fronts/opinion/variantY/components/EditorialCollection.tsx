import React from "react";
import { Collection as ICollection } from "../../../../api";
import { Heading } from "./../../../../components/Heading";
import { Multiline } from "./../../../../components/Multiline";
import { CommentCardB } from "../../../../components/cards/CommentCardB";

export const EditorialCollection: React.FC<{
    collection: ICollection;
    salt: string;
}> = ({ collection, salt }) => {
    const contentOne = collection.backfill[0];

    // TODO
    return (
        <>
            <Multiline topPadding />
            <Heading heading={collection.displayName} />

            <CommentCardB
                content={contentOne}
                salt={salt}
                size={"large"}
                shouldShowImage={true}
            />
        </>
    );
};
