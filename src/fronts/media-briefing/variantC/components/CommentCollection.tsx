import React from "react";
import { Collection as ICollection } from "../../../../api";
import { palette } from "@guardian/src-foundations";
import { TableRowCell } from "../../../../layout/Table";
import { Padding } from "../../../../layout/Padding";
import { Multiline } from "../../../../components/Multiline";
import { Heading } from "../../../../components/Heading";
import { HeadlineCard } from "../../../../components/cards/HeadlineCard";

export const CommentCollection: React.FC<{
    collection: ICollection;
    salt?: string;
}> = ({ collection }) => {
    const lightGrey = palette.neutral[97];
    const white = palette.neutral[100];

    return (
        <TableRowCell tdStyle={{ backgroundColor: lightGrey }}>
            <Multiline topPadding />
            <Heading heading={collection.displayName} />
            {collection.backfill.map((story, index) => (
                <>
                    {index > 0 && <Padding px={4} />}
                    <HeadlineCard
                        content={story}
                        backgroundColor={white}
                        showPillarColours
                        borderWidth="thin"
                        layout="expanded"
                    />
                </>
            ))}
        </TableRowCell>
    );
};
