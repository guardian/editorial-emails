import React from "react";
import { Collection as ICollection } from "../../../../api";
import { Heading } from "../../../../components/Heading";
import { Padding } from "../../../../layout/Padding";
import { palette } from "@guardian/src-foundations";
import { Multiline } from "../../../../components/Multiline";
import { CommentCard } from "../../../../components/cards/CommentCard";
import {
    getPillarName,
    getImageSrc,
    getCardUrl,
    getByline
} from "../../../../dataHelpers";

export const CommentCollection: React.FC<{
    collection: ICollection;
}> = ({ collection }) => {
    const content = [].concat(collection.curated, collection.backfill);
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
            {content.map(story => (
                <CommentCard
                    headline={story.header.headline}
                    byline={getByline(story)}
                    cardUrl={getCardUrl(story)}
                    trailText={story.card.trailText}
                    isComment={story.header.isComment}
                    shouldShowProfileImage
                    size="large"
                    pillar={getPillarName(story)}
                    imageSrc={getImageSrc(story, { isContributor: true })}
                    imageAlt={story.header.headline}
                />
            ))}
        </>
    );
};
