import React from "react";
import { Collection as ICollection } from "../../../../api";
import { Heading } from "./../../../../components/Heading";
import { MediaCardB } from "../../../../components/cards/MediaCardB";
import { Multiline } from "./../../../../components/Multiline";
import { getImageSrc } from "../../../../dataHelpers";

export const MediaCollection: React.FC<{
    collection: ICollection;
}> = ({ collection }) => {
    const content = [].concat(collection.curated).concat(collection.backfill);
    if (content.length < 1) {
        return null;
    }

    return (
        <>
            <Multiline topPadding />
            <Heading heading={collection.displayName} />
            {content.map(story => (
                <MediaCardB
                    headline={story.header.headline}
                    cardUrl={story.properties.webUrl}
                    imageSrc={getImageSrc(story)}
                    imageAlt={story.header.headline}
                    imageRating={story.card.starRating}
                />
            ))}
        </>
    );
};
