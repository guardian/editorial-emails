import React from "react";
import { Collection as ICollection } from "../../../../api";
import { Heading } from "./../../../../components/Heading";
import { Multiline } from "./../../../../components/Multiline";
import { CommentCard } from "./../../../../components/cards/CommentCard";
import { Padding } from "../../../../layout/Padding";
import { TableRowCell } from "../../../../layout/Table";
import { palette } from "@guardian/src-foundations";

export const CommentCollection: React.FC<{
    frontId: string;
    collection: ICollection;
    salt: string;
}> = ({ collection, salt }) => {
    const lightGrey = palette.neutral[97];
    const leadStory = collection.backfill[0];
    const bottomCollection = collection.backfill.slice(1);

    const leadContributor = leadStory.properties.maybeContent.tags.tags.find(
        tag => {
            return tag.properties.tagType === "Contributor";
        }
    );

    return (
        <>
            <TableRowCell tdStyle={{ backgroundColor: lightGrey }}>
                <Padding px={12} />
                <Multiline />
                <Heading heading={collection.displayName} />
                <CommentCard
                    headline={leadStory.header.headline}
                    byline={leadStory.properties.byline}
                    trailText={leadStory.card.trailText}
                    cardUrl={leadStory.properties.webUrl}
                    isComment={leadStory.header.isComment}
                    size="large"
                    shouldShowProfileImage
                    pillar={
                        leadStory.properties.maybeContent.metadata.pillar.name
                    }
                    imageSrc={
                        leadContributor
                            ? leadContributor.properties
                                  .contributorLargeImagePath
                            : null
                    }
                    imageAlt={leadStory.header.headline}
                    imageSalt={salt}
                />
                <Padding px={12} />
                {bottomCollection.map((story, index) => {
                    return (
                        <>
                            <CommentCard
                                headline={story.header.headline}
                                byline={story.properties.byline}
                                cardUrl={story.properties.webUrl}
                                isComment={story.header.isComment}
                                pillar={
                                    story.properties.maybeContent
                                        ? story.properties.maybeContent.metadata
                                              .pillar.name
                                        : null
                                }
                                imageSalt={salt}
                            />
                            {index < bottomCollection.length - 1 && (
                                <Padding px={12} />
                            )}
                        </>
                    );
                })}
            </TableRowCell>
        </>
    );
};
