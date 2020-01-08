import React from "react";
import { Collection as ICollection } from "../../../../api";
import { Heading } from "./../../../../components/Heading";
import { Multiline } from "./../../../../components/Multiline";
import { CommentCardC } from "../../../../components/cards/CommentCardC";

export const EditorialCollection: React.FC<{
    collection: ICollection;
}> = ({ collection }) => {
    const contentOne = collection.backfill[0];

    // TODO
    return (
        <>
            <Multiline topPadding />
            <Heading heading={collection.displayName} />

            <CommentCardC
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
