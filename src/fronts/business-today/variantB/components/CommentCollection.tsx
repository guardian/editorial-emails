import React from "react";
import { Collection as ICollection } from "../../../../api";
import { Heading } from "../../../../components/Heading";
import { Padding } from "../../../../layout/Padding";
import { palette } from "@guardian/src-foundations";
import { Multiline } from "../../../../components/Multiline";
import { CommentCard } from "../../../../components/cards/CommentCard";

export const CommentCollection: React.FC<{
    collection: ICollection;
    salt: string;
}> = ({ collection, salt }) => {
    const content = collection.curated.concat(collection.backfill);
    if (content.length < 1) {
        return null;
    }

    const lightGrey = palette.neutral[97];

    return (
        <>
            <Padding px={12} backgroundColor={lightGrey} />
            <Multiline />
            <Heading
                heading={collection.displayName}
                backgroundColor={lightGrey}
            />
            {content.map(story => {
                return (
                    <CommentCard
                        content={story}
                        salt={salt}
                        shouldShowProfileImage
                        size="large"
                    />
                );
            })}
        </>
    );
};
