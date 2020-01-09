import React from "react";
import { Collection as ICollection } from "../../../../api";
import { DefaultGrid } from "../../../../layout/Grid";
import { Heading } from "../../../../components/Heading";
import { Padding } from "../../../../layout/Padding";
import { palette } from "@guardian/src-foundations";
import { Multiline } from "../../../../components/Multiline";
import { OverlayCard } from "../../../../components/cards/OverlayCard";
import { kickerText } from "../../../../dataHelpers";

export const LiveCollection: React.FC<{
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
            {content.map((story, index) => (
                <>
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
                        kicker={
                            story.header.kicker
                                ? kickerText(story.header.kicker)
                                : ""
                        }
                        imageSrc={
                            story.properties.maybeContent
                                ? story.properties.maybeContent.trail
                                      .trailPicture.allImages[0].url
                                : null
                        }
                        imageAlt={story.header.headline}
                        imageRating={story.card.starRating}
                        layout="expanded"
                        isLive={story.card.isLive}
                    />
                    {index < content.length - 1 && (
                        <Padding px={12} backgroundColor={lightGrey} />
                    )}
                </>
            ))}
        </>
    );
};
