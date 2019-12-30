import React from "react";
import { Collection as ICollection } from "../../../../api";
import { Heading } from "../../../../components/Heading";
import { palette } from "@guardian/src-foundations";
import { CommercialCard } from "../../../../components/cards/CommercialCard";
import { Padding } from "../../../../layout/Padding";

export const CommercialCollection: React.FC<{
    collection: ICollection;
    salt: string;
}> = ({ collection, salt }) => {
    const content = collection.curated.concat(collection.backfill);
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
                        cardUrl={story.properties.href}
                        imageSrc={story.properties.image.item.imageSrc}
                        imageAlt={story.header.headline}
                        imageRating={4}
                        imageSalt={salt}
                    />
                    {index < content.length - 1 && (
                        <Padding px={12} backgroundColor={darkGrey} />
                    )}
                </>
            ))}
        </>
    );
};
