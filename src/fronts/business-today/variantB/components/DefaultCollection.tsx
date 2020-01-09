import React from "react";
import { Collection as ICollection } from "../../../../api";
import { DefaultGrid } from "../../../../layout/Grid";
import { Heading } from "../../../../components/Heading";
import { palette } from "@guardian/src-foundations";
import { HeadlineCard } from "../../../../components/cards/HeadlineCard";
import { Multiline } from "../../../../components/Multiline";
import { Padding } from "../../../../layout/Padding";
import { kickerText } from "../../../../kicker";
import { DefaultCard } from "../../../../components/cards/DefaultCard";
import { Table, TableRowCell } from "../../../../layout/Table";

export const DefaultCollection: React.FC<{
    collection: ICollection;
}> = ({ collection }) => {
    const content = collection.curated.concat(collection.backfill);
    if (content.length < 1) {
        return null;
    }

    const gridContent = content.slice(0, 2);
    const listContent = content.slice(2);

    const lightGrey = palette.neutral[97];
    const white = palette.neutral[100];

    return (
        <TableRowCell tdStyle={{ backgroundColor: lightGrey }}>
            <Padding px={12} />
            <Multiline />
            <Heading heading={collection.displayName} />
            <DefaultGrid
                content={gridContent}
                card={{
                    Component: DefaultCard,
                    props: {
                        backgroundColor: white
                    }
                }}
                leftStyles={{ backgroundColor: white }}
                rightStyles={{ backgroundColor: white }}
            />
            <Padding px={6} />
            {listContent.map((story, index) => (
                <>
                    <HeadlineCard
                        headline={story.header.headline}
                        trailText={story.card.trailText}
                        isComment={story.display.showQuotedHeadline}
                        cardUrl={story.properties.webUrl}
                        pillar={
                            story.properties.maybeContent
                                ? story.properties.maybeContent.metadata.pillar
                                      .name
                                : null
                        }
                        byline={
                            story.properties.showByline &&
                            story.properties.byline
                                ? story.properties.byline
                                : ""
                        }
                        kicker={
                            story.header.kicker
                                ? kickerText(story.header.kicker)
                                : ""
                        }
                        showPillarColours
                        backgroundColor={white}
                    />
                    {index < listContent.length - 1 && <Padding px={6} />}
                </>
            ))}
        </TableRowCell>
    );
};
