import React from "react";
import { Collection as ICollection } from "../../../../api";
import { Heading } from "../../../../components/Heading";
import { Padding } from "../../../../layout/Padding";
import { palette } from "@guardian/src-foundations";
import { Multiline } from "../../../../components/Multiline";
import { OverlayCard } from "../../../../components/cards/OverlayCard";
import {
    getKickerText,
    getPillarName,
    getImageSrc,
    getCardUrl
} from "../../../../dataHelpers";

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
                        cardUrl={getCardUrl(story)}
                        isComment={story.display.showQuotedHeadline}
                        pillar={getPillarName(story)}
                        kicker={getKickerText(story)}
                        imageSrc={getImageSrc(story)}
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
