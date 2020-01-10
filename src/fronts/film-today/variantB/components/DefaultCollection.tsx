import React from "react";
import { Collection as ICollection } from "../../../../api";
import { DefaultGrid } from "../../../../layout/Grid";
import { Padding } from "../../../../layout/Padding";
import { Multiline } from "../../../../components/Multiline";
import { Heading } from "../../../../components/Heading";
import { DefaultCard } from "../../../../components/cards/DefaultCard";
import { palette } from "@guardian/src-foundations";
import { TableRowCell } from "../../../../layout/Table";
import {
    getKickerText,
    getPillarName,
    getImageSrc,
    getCardUrl
} from "../../../../dataHelpers";

export const DefaultCollection: React.FC<{
    collection: ICollection;
}> = ({ collection }) => {
    const content = [].concat(collection.curated).concat(collection.backfill);
    if (content.length < 1) {
        return null;
    }

    const topCollection = content.slice(0, 2);
    const gridContent = content.slice(2, 6);

    const lightGrey = palette.neutral[97];
    return (
        <>
            <TableRowCell tdStyle={{ backgroundColor: lightGrey }}>
                <Multiline topPadding />
                <Heading heading={collection.displayName} />
            </TableRowCell>
            {topCollection.map(content => {
                return (
                    <>
                        <DefaultCard
                            headline={content.header.headline}
                            cardUrl={getCardUrl(content)}
                            isComment={content.display.showQuotedHeadline}
                            imageSrc={getImageSrc(content)}
                            imageAlt={content.header.headline}
                            imageRating={content.card.starRating}
                            byline={
                                content.properties.showByline &&
                                content.properties.byline
                                    ? content.properties.byline
                                    : null
                            }
                            kicker={getKickerText(content)}
                            pillar={getPillarName(content)}
                            size="large"
                        />
                        <Padding px={12} />
                    </>
                );
            })}
            {gridContent && <DefaultGrid content={gridContent} />}
        </>
    );
};
