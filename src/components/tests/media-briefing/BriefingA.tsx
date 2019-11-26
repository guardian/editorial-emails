import React from "react";
import { Collection as ICollection } from "../../../api";
import { palette } from "@guardian/src-foundations";
import { DescriptiveCard } from "../../cards/DescriptiveCard";
import { Multiline } from "../../Multiline";
import { Heading } from "../../Heading";
import { HeadlineCard } from "../../cards/HeadlineCard";
import { Padding } from "../../../layout/Padding";
import { TableRowCell } from "../../../layout/Table";
// import { render } from "react-dom";

export const BriefingA: React.FC<{
    frontId: string;
    collections: ICollection[];
    salt: string;
}> = ({ collections, salt }) => {
    const leadStory = collections[0].backfill[0];
    const topStories = collections[0].backfill.slice(1);
    const opinionStories = collections[1].backfill;
    const tvRadioStories = collections[2].backfill;
    const jobsStories = collections[3].curated;

    const containerBackground = palette.neutral[97];
    const headlineCardBackground = palette.neutral[100];

    return (
        <>
            <DescriptiveCard content={leadStory} salt={salt} />

            <TableRowCell tdStyle={{ backgroundColor: containerBackground }}>
                <Multiline topPadding />
                <Heading heading={collections[0].displayName} />
                {topStories.map((story, index) => (
                    <>
                        {index > 0 && <Padding px={4} />}
                        <HeadlineCard
                            content={story}
                            backgroundColor={headlineCardBackground}
                        />
                    </>
                ))}

                <Multiline topPadding />
                <Heading heading={collections[1].displayName} />
                {opinionStories.map((story, index) => (
                    <>
                        {index > 0 && <Padding px={4} />}
                        <HeadlineCard
                            content={story}
                            backgroundColor={headlineCardBackground}
                        />
                    </>
                ))}

                <Multiline topPadding />
                <Heading heading={collections[2].displayName} />
                {tvRadioStories.map((story, index) => (
                    <>
                        {index > 0 && <Padding px={4} />}
                        <HeadlineCard
                            content={story}
                            backgroundColor={headlineCardBackground}
                        />
                    </>
                ))}

                <Multiline topPadding />
                <Heading heading={collections[3].displayName} />
                {jobsStories.map((story, index) => (
                    <>
                        {index > 0 && <Padding px={4} />}
                        <HeadlineCard
                            content={story}
                            backgroundColor={headlineCardBackground}
                        />
                    </>
                ))}
            </TableRowCell>
        </>
    );
};
