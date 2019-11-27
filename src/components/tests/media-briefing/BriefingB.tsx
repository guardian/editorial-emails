import React from "react";
import { Collection as ICollection } from "../../../api";
import { palette } from "@guardian/src-foundations";
import { Multiline } from "../../Multiline";
import { Heading } from "../../Heading";
import { HeadlineCard } from "../../cards/HeadlineCard";
import { OverlayCard } from "../../cards/OverlayCard";
import { Padding } from "../../../layout/Padding";
import { TableRowCell } from "../../../layout/Table";

export const BriefingB: React.FC<{
    frontId: string;
    collections: ICollection[];
    salt: string;
}> = ({ collections, salt }) => {
    const topStories = collections[0].backfill;
    const opinionStories = collections[1].backfill;
    const tvRadioStories = collections[2].backfill;
    const jobsStories = collections[3].curated;

    const lightGrey = palette.neutral[97];
    const white = palette.neutral[100];
    const jobsBackground = "#00A194";

    return (
        <>
            <Padding px={12} backgroundColor={lightGrey} />
            <Multiline />
            <Heading
                heading={collections[0].displayName}
                backgroundColor={lightGrey}
            />
            {topStories.map((story, index) => (
                <>
                    {index > 0 && (
                        <Padding px={12} backgroundColor={lightGrey} />
                    )}
                    <OverlayCard content={story} salt={salt} />
                </>
            ))}

            <Padding px={12} backgroundColor={lightGrey} />
            <Multiline />
            <Heading
                heading={collections[1].displayName}
                backgroundColor={lightGrey}
            />
            {opinionStories.map((story, index) => (
                <>
                    {index > 0 && (
                        <Padding px={12} backgroundColor={lightGrey} />
                    )}
                    <HeadlineCard
                        content={story}
                        backgroundColor={white}
                        showPillarColours
                        borderWidth="thin"
                        layout="expanded"
                    />
                </>
            ))}

            <Padding px={12} backgroundColor={lightGrey} />
            <Multiline />
            <Heading
                heading={collections[2].displayName}
                backgroundColor={lightGrey}
            />
            {tvRadioStories.map((story, index) => (
                <>
                    {index > 0 && (
                        <Padding px={12} backgroundColor={lightGrey} />
                    )}
                    <OverlayCard content={story} salt={salt} />
                </>
            ))}

            <Padding px={12} backgroundColor={palette.neutral[97]} />

            <TableRowCell
                tdStyle={{
                    backgroundColor: jobsBackground,
                    padding: "8px 0 10px 0"
                }}
            >
                <Heading
                    heading={collections[3].displayName}
                    color={palette.neutral[100]}
                />
                <TableRowCell tdStyle={{ padding: "0 10px" }}>
                    {jobsStories.map((story, index) => (
                        <>
                            <HeadlineCard
                                content={story}
                                borderWidth="thin"
                                color={palette.neutral[100]}
                                layout="compact"
                                borderColor="#9fe0c8"
                            />
                        </>
                    ))}
                </TableRowCell>
            </TableRowCell>
        </>
    );
};
