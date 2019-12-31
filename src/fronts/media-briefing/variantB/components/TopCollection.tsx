import React from "react";
import { Collection as ICollection } from "../../../../api";
import { palette } from "@guardian/src-foundations";
import { TableRowCell } from "../../../../layout/Table";
import { Padding } from "../../../../layout/Padding";
import { OverlayCard } from "../../../../components/cards/OverlayCard";
import { Multiline } from "../../../../components/Multiline";
import { Heading } from "../../../../components/Heading";
import { HeadlineCard } from "../../../../components/cards/HeadlineCard";
import { kickerText } from "../../../../kicker";

export const TopCollection: React.FC<{
    collection: ICollection;
    salt?: string;
}> = ({ collection, salt }) => {
    const lightGrey = palette.neutral[97];
    const white = palette.neutral[100];

    const leadStory = collection.backfill[0];

    return (
        <TableRowCell
            tdStyle={{
                backgroundColor: lightGrey
            }}
        >
            <Multiline topPadding />
            <Heading heading={collection.displayName} />

            <OverlayCard
                headline={leadStory.header.headline}
                trailText={leadStory.card.trailText}
                cardUrl={leadStory.properties.webUrl}
                isComment={leadStory.display.showQuotedHeadline}
                pillar={
                    leadStory.properties.maybeContent
                        ? leadStory.properties.maybeContent.metadata.pillar.name
                        : null
                }
                kicker={
                    leadStory.header.kicker
                        ? kickerText(leadStory.header.kicker)
                        : ""
                }
                imageSrc={
                    leadStory.properties.maybeContent
                        ? leadStory.properties.maybeContent.trail.trailPicture
                              .allImages[0].url
                        : null
                }
                imageAlt={leadStory.header.headline}
                imageSalt={salt}
                imageRating={leadStory.card.starRating}
                backgroundColor={white}
                layout="expanded"
                isLive={leadStory.card.isLive}
            />

            <Padding px={12} backgroundColor={lightGrey} />

            {collection.backfill.slice(1).map((story, index) => (
                <>
                    {index > 0 && <Padding px={4} />}
                    <HeadlineCard
                        headline={story.header.headline}
                        trailText={story.card.trailText}
                        isComment={story.display.showQuotedHeadline}
                        cardUrl={story.properties.webUrl}
                        pillar={
                            story.properties.maybeContent
                                ? story.properties.maybeContent.metadata.pillar
                                      .name
                                : null
                        }
                        byline={
                            story.properties.showByline &&
                            story.properties.byline
                                ? story.properties.byline
                                : ""
                        }
                        kicker={
                            story.header.kicker
                                ? kickerText(story.header.kicker)
                                : ""
                        }
                        backgroundColor={white}
                        showPillarColours
                        borderWidth="thin"
                    />
                </>
            ))}
        </TableRowCell>
    );
};
