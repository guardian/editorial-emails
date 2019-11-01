import React from "react";
import { Collection as ICollection } from "../api";
import { formatImage } from "../image";
import { Padding } from "../layout/Padding";
import { Columns } from "./Columns";

export const Grid: React.FC<{
    collection: ICollection;
    salt: string;
}> = ({ collection, salt }) => {
    const content1 = collection.backfill[2];
    const content2 = collection.backfill[3];
    const content3 = collection.backfill[4];
    const content4 = collection.backfill[5];

    const image1 = content1.properties.maybeContent.trail.trailPicture.allImages[0];
    const formattedImage1 = formatImage(image1.url, salt);

    const image2 = content2.properties.maybeContent.trail.trailPicture.allImages[0];
    const formattedImage2 = formatImage(image2.url, salt);

    const image3 = content3.properties.maybeContent.trail.trailPicture.allImages[0];
    const formattedImage3 = formatImage(image3.url, salt);

    const image4 = content4.properties.maybeContent.trail.trailPicture.allImages[0];
    const formattedImage4 = formatImage(image4.url, salt);

    return (
        <>
            <Columns
                headline1={content1.properties.webTitle}
                webURL1={content1.properties.webUrl}
                imageURL1={formattedImage1}
                imageAlt1={image1.fields.altText}
                headline2={content2.properties.webTitle}
                webURL2={content2.properties.webUrl}
                imageURL2={formattedImage2}
                imageAlt2={image2.fields.altText}
            />
            <Columns
                headline1={content3.properties.webTitle}
                webURL1={content3.properties.webUrl}
                imageURL1={formattedImage3}
                imageAlt1={image3.fields.altText}
                headline2={content4.properties.webTitle}
                webURL2={content4.properties.webUrl}
                imageURL2={formattedImage4}
                imageAlt2={image4.fields.altText}
            />
        </>
    );

};
