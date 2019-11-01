import React from "react";
import { Collection as ICollection } from "../api";
import { formatImage } from "../image";
import { Padding } from "../layout/Padding";
import { Card } from "./Card";

export const Grid: React.FC<{
    collection: ICollection;
    salt: string;
}> = ({ collection, salt }) => {
    const col = collection.backfill.slice(2, 6).map(content => {
        const image =
            content.properties.maybeContent.trail.trailPicture.allImages[0];
        const formattedImage = formatImage(image.url, salt);

        return (
            <>
                <Card
                    imageURL={formattedImage}
                    imageAlt={image.fields.altText}
                    headline={content.properties.webTitle}
                    byline={content.properties.byline}
                    webURL={content.properties.webUrl}
                    key={content.properties.webUrl}
                />
                <Padding px={10} />
            </>
        );
    });

    return <>{col}</>;
};
