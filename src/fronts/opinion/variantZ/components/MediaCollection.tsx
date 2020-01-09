import React from "react";
import { Collection as ICollection } from "../../../../api";
import { Heading } from "./../../../../components/Heading";
import { Multiline } from "./../../../../components/Multiline";
import { MediaCardC } from "../../../../components/cards/MediaCardC";

export const MediaCollection: React.FC<{
    collection: ICollection;
}> = ({ collection }) => {
    const items = collection.backfill.map(content => (
        <MediaCardC
            headline={content.header.headline}
            cardUrl={content.properties.webUrl}
            imageSrc={
                content.properties.maybeContent
                    ? content.properties.maybeContent.trail.trailPicture
                          .allImages[0].url
                    : null
            }
            imageAlt={content.header.headline}
            imageRating={content.card.starRating}
        />
    ));

    return (
        <>
            <Multiline topPadding />
            <Heading heading={collection.displayName} />
            {items}
        </>
    );
};
