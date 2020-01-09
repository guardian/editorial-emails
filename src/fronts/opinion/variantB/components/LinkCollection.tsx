import React from "react";
import { Collection as ICollection } from "../../../../api";
import { TableRowCell } from "../../../../layout/Table";
import { Heading } from "../../../../components/Heading";
import { Padding } from "../../../../layout/Padding";
import { palette } from "@guardian/src-foundations";
import { Multiline } from "../../../../components/Multiline";
import { HeadlineCard } from "../../../../components/cards/HeadlineCard";
import { kickerText } from "../../../../kicker";

export const LinkCollection: React.FC<{
    collection: ICollection;
}> = ({ collection }) => {
    const lightGrey = palette.neutral[97];
    const white = palette.neutral[100];
    const content = collection.curated;
    return (
        <>
            <Padding px={12} backgroundColor={lightGrey} />
            <Multiline />
            <Heading
                heading={collection.displayName}
                backgroundColor={lightGrey}
            />
            <TableRowCell tableStyle={{ backgroundColor: lightGrey }}>
                {content.map((story, index) => (
                    <>
                        <HeadlineCard
                            headline={story.header.headline}
                            trailText={story.card.trailText}
                            isComment={story.display.showQuotedHeadline}
                            cardUrl={story.properties.webUrl}
                            pillar={
                                story.properties.maybeContent
                                    ? story.properties.maybeContent.metadata
                                          .pillar.name
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
                            borderWidth="thin"
                            borderColor={palette.opinion.main}
                            backgroundColor={white}
                            layout="expanded"
                            showArrow
                        />
                        <Padding px={12} />
                    </>
                ))}
            </TableRowCell>
        </>
    );
};
