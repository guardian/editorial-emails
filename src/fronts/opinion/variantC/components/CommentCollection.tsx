import React from "react";
import { Collection as ICollection } from "../../../../api";
import { Padding } from "../../../../layout/Padding";
import { Heading } from "./../../../../components/Heading";
import { Multiline } from "./../../../../components/Multiline";
import { CommentCardC } from "../../../../components/cards/CommentCardC";
import { Grid as CommentGrid } from "./Grid";

const frontIdShouldShowCommentGridImages = (frontId: string): boolean => {
    if (frontId === "email/opinion") {
        return false;
    }
    return true;
};

export const CommentCollection: React.FC<{
    frontId: string;
    collection: ICollection;
    salt: string;
}> = ({ frontId, collection, salt }) => {
    // TODO handle curated collections

    const c0 = collection.backfill[0];
    const c1 = collection.backfill[1];
    const grid_2_5 = collection.backfill.slice(2, 6);
    const c6 = collection.backfill[6];
    const grid_7_8 = collection.backfill.slice(7, 9);
    const c9 = collection.backfill[9];

    // TODO
    return (
        <>
            <Multiline topPadding />
            <Heading heading={collection.displayName} />

            <CommentCardC
                content={c0}
                salt={salt}
                size={"large"}
                shouldShowImage={false}
            />
            <Padding px={12} />

            <CommentCardC
                content={c1}
                salt={salt}
                size={"large"}
                shouldShowImage={false}
            />
            <Padding px={12} />

            <CommentGrid
                content={grid_2_5}
                salt={salt}
                shouldShowGridImages={frontIdShouldShowCommentGridImages(
                    frontId
                )}
            />

            <CommentCardC
                content={c6}
                salt={salt}
                size={"large"}
                shouldShowImage={false}
            />
            <Padding px={12} />

            <CommentGrid
                content={grid_7_8}
                salt={salt}
                shouldShowGridImages={frontIdShouldShowCommentGridImages(
                    frontId
                )}
            />

            <CommentCardC
                content={c9}
                salt={salt}
                size={"large"}
                shouldShowImage={false}
            />
        </>
    );
};
