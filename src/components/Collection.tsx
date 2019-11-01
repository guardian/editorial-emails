import React from "react";
import { Collection as ICollection } from "../api";
import { formatImage } from "../image";
import { Padding } from "../layout/Padding";
import { Card } from "./Card";

export const Collection: React.FC<{
    collection: ICollection;
    salt: string;
}> = ({ collection, salt }) => {
    const col = collection.backfill.slice(0, 2).map(content => {
        const image =
            content.properties.maybeContent.trail.trailPicture.allImages[0];
        const formattedImage = formatImage(image.url, salt);
        const brazeParameter = "?##braze_utm##";

        return (
            <>
                <Card
                    imageURL={formattedImage}
                    imageAlt={image.fields.altText}
                    headline={content.properties.webTitle}
                    byline={content.properties.byline}
                    webURL={content.properties.webUrl + brazeParameter}
                    key={content.properties.webUrl}
                />
            </>
        );
    });

    return <>{col}</>;
};
