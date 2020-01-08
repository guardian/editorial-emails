import React from "react";
import { Collection as ICollection } from "../api";
import { palette } from "@guardian/src-foundations";
import { Padding } from "../layout/Padding";
import { Multiline } from "../components/Multiline";
import { Heading } from "../components/Heading";
import { OverlayCard } from "../components/cards/OverlayCard";
import { kickerText } from "../kicker";

export const InstagramCollection: React.FC<{
    collection: ICollection;
    salt?: string;
}> = ({ collection, salt }) => {
    const content = collection.curated.concat(collection.backfill);

    const lightGrey = palette.neutral[97];

    return (
        <>
            <Padding px={12} backgroundColor={lightGrey} />
            <Multiline />
            <Heading
                heading={collection.displayName}
                backgroundColor={lightGrey}
            />
            {content.map((story, index) => (
                <>
                    {index > 0 && (
                        <Padding px={12} backgroundColor={lightGrey} />
                    )}
                    <OverlayCard
                        headline={story.header.headline}
                        trailText={story.card.trailText}
                        cardUrl={story.properties.webUrl}
                        isComment={story.display.showQuotedHeadline}
                        pillar={
                            story.properties.maybeContent
                                ? story.properties.maybeContent.metadata.pillar
                                      .name
                                : null
                        }
                        imageSrc={
                            story.properties.maybeContent
                                ? story.properties.maybeContent.trail
                                      .trailPicture.allImages[0].url
                                : null
                        }
                        imageAlt={story.header.headline}
                        imageRating={story.card.starRating}
                        kicker={
                            story.header.kicker
                                ? kickerText(story.header.kicker)
                                : ""
                        }
                        layout="expanded"
                        isLive={story.card.isLive}
                    />
                </>
            ))}
        </>
    );
};
