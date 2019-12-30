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
                const storyContributor = story.properties.maybeContent.tags.tags.find(
                    tag => {
                        return tag.properties.tagType === "Contributor";
                    }
                );
                return (
                    <CommentCard
                        headline={story.header.headline}
                        byline={story.properties.byline}
                        cardUrl={story.properties.webUrl}
                        trailText={story.card.trailText}
                        isComment={story.header.isComment}
                        shouldShowProfileImage
                        size="large"
                        pillar={
                            story.properties.maybeContent
                                ? story.properties.maybeContent.metadata.pillar
                                      .name
                                : null
                        }
                        imageSrc={
                            storyContributor
                                ? storyContributor.properties
                                      .contributorLargeImagePath
                                : null
                        }
                        imageAlt={story.header.headline}
                        imageSalt={salt}
                    />
                );
            })}
        </>
    );
};
