import React from "react";
import { Collection as ICollection } from "../../../../api";
import { Heading } from "../../../../components/Heading";
import { palette } from "@guardian/src-foundations";
import { CommercialCard } from "../../../../components/cards/CommercialCard";
import { Padding } from "../../../../layout/Padding";
import { getImageSrc, getCardUrl } from "../../../../dataHelpers";

export const CommercialCollection: React.FC<{
    collection: ICollection;
}> = ({ collection }) => {
    const content = [].concat(collection.curated).concat(collection.backfill);
    if (content.length < 1) {
        return null;
    }

    const darkGrey = palette.neutral[86];
    return (
        <>
            <Padding px={12} backgroundColor={darkGrey} />
            <Heading
                heading={collection.displayName}
                backgroundColor={darkGrey}
            />
            {content.map((story, index) => (
                <>
                    <CommercialCard
                        headline={story.header.headline}
                        cardUrl={getCardUrl(story)}
                        imageSrc={getImageSrc(story, { isCommercial: true })}
                        imageAlt={story.header.headline}
                        imageRating={story.card.starRating}
                    />
                    {index < content.length - 1 && (
                        <Padding px={12} backgroundColor={darkGrey} />
                    )}
                </>
            ))}
        </>
    );
};
