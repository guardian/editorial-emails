import React from "react";
import { Collection as ICollection } from "../../../../api";
import { Heading } from "./../../../../components/Heading";
import { Multiline } from "./../../../../components/Multiline";
import { CommentCard } from "./../../../../components/cards/CommentCard";
import { Padding } from "../../../../layout/Padding";
import { TableRowCell } from "../../../../layout/Table";
import { palette } from "@guardian/src-foundations";
import { getPillarName } from "../../../../dataHelpers";

export const CommentCollection: React.FC<{
    frontId: string;
    collection: ICollection;
}> = ({ collection }) => {
    const content = [].concat(collection.curated).concat(collection.backfill);
    if (content.length < 1) {
        return null;
    }

    const leadStory = content[0];
    const bottomCollection = content.slice(1);
    const leadContributor = leadStory.properties.maybeContent.tags.tags.find(
        (tag: any) => {
            return tag.properties.tagType === "Contributor";
        }
    );

    const lightGrey = palette.neutral[97];
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
                    pillar={getPillarName(leadStory)}
                    imageSrc={
                        leadContributor
                            ? leadContributor.properties
                                  .contributorLargeImagePath
                            : null
                    }
                    imageAlt={leadStory.header.headline}
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
                                pillar={getPillarName(story)}
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
