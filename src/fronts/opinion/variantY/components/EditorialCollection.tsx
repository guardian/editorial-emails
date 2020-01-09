import React from "react";
import { Collection as ICollection } from "../../../../api";
import { Heading } from "./../../../../components/Heading";
import { Multiline } from "./../../../../components/Multiline";
import { CommentCardB } from "../../../../components/cards/CommentCardB";

export const EditorialCollection: React.FC<{
    collection: ICollection;
}> = ({ collection }) => {
    const content = [].concat(collection.curated).concat(collection.backfill);
    if (content.length < 1) {
        return null;
    }

    const contentOne = content[0];
    return (
        <>
            <Multiline topPadding />
            <Heading heading={collection.displayName} />

            <CommentCardB
                headline={contentOne.header.headline}
                byline={contentOne.properties.byline}
                trailText={contentOne.card.trailText}
                cardUrl={contentOne.properties.webUrl}
                imageSrc={
                    contentOne.properties.maybeContent
                        ? contentOne.properties.maybeContent.trail.trailPicture
                              .allImages[0].url
                        : null
                }
                imageAlt={contentOne.header.headline}
                imageRating={contentOne.card.starRating}
                isComment={contentOne.header.isComment}
                size="large"
                shouldShowImage
            />
        </>
    );
};
