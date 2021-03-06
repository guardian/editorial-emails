import React from "react";
import { Collection as ICollection } from "../../../../api";
import { Heading } from "./../../../../components/Heading";
import { Multiline } from "./../../../../components/Multiline";
import { MediaCardC } from "../../../../components/cards/MediaCardC";
import { getImageSrc, getCardUrl } from "../../../../dataHelpers";

export const MediaCollection: React.FC<{
    collection: ICollection;
}> = ({ collection }) => {
    const content = [].concat(collection.curated, collection.backfill);
    if (content.length < 1) {
        return null;
    }

    return (
        <>
            <Multiline topPadding />
            <Heading heading={collection.displayName} />
            {content.map(content => (
                <MediaCardC
                    headline={content.header.headline}
                    cardUrl={getCardUrl(content)}
                    imageSrc={getImageSrc(content)}
                    imageAlt={content.header.headline}
                    imageRating={content.card.starRating}
                />
            ))}
        </>
    );
};
