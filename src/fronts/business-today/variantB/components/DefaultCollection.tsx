import React from "react";
import { Collection as ICollection } from "../../../../api";
import { DefaultGrid } from "../../../../layout/Grid";
import { Heading } from "../../../../components/Heading";
import { palette } from "@guardian/src-foundations";
import { HeadlineCard } from "../../../../components/cards/HeadlineCard";
import { Multiline } from "../../../../components/Multiline";
import { Padding } from "../../../../layout/Padding";
import { DefaultCard } from "../../../../components/cards/DefaultCard";
import { Table, TableRowCell } from "../../../../layout/Table";

export const DefaultCollection: React.FC<{
    collection: ICollection;
    salt: string;
}> = ({ collection, salt }) => {
    const content = collection.curated.concat(collection.backfill);
    if (content.length < 1) {
        return null;
    }

    const gridContent = content.slice(0, 2);
    const listContent = content.slice(2);

    const lightGrey = palette.neutral[97];

    return (
        <TableRowCell tdStyle={{ backgroundColor: lightGrey }}>
            <Padding px={12} />
            <Multiline />
            <Heading heading={collection.displayName} />
            <DefaultGrid
                content={gridContent}
                salt={salt}
                card={{
                    Component: DefaultCard,
                    props: {
                        backgroundColor: palette.neutral[100]
                    }
                }}
            />
            <Padding px={6} />
            {listContent.map((story, index) => (
                <>
                    <HeadlineCard
                        content={story}
                        borderWidth="thin"
                        showPillarColours
                        backgroundColor={palette.neutral[100]}
                    />
                    {index < listContent.length - 1 && <Padding px={6} />}
                </>
            ))}
        </TableRowCell>
    );
};
