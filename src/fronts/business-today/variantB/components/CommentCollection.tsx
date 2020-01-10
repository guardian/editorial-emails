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
    getCardUrl
} from "../../../../dataHelpers";

export const CommentCollection: React.FC<{
    collection: ICollection;
}> = ({ collection }) => {
    const content = [].concat(collection.curated).concat(collection.backfill);
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
                const storyContributor = story.properties.maybeContent.tags.tags.find(
                    (tag: any) => {
                        return tag.properties.tagType === "Contributor";
                    }
                );
                return (
                    <CommentCard
                        headline={story.header.headline}
                        byline={story.properties.byline}
                        cardUrl={getCardUrl(story)}
                        trailText={story.card.trailText}
                        isComment={story.header.isComment}
                        shouldShowProfileImage
                        size="large"
                        pillar={getPillarName(story)}
                        imageSrc={getImageSrc(storyContributor)}
                        imageAlt={story.header.headline}
                    />
                );
            })}
        </>
    );
};
