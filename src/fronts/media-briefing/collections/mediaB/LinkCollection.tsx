import React from "react";
import { Collection as ICollection } from "../../../../api";
import { palette } from "@guardian/src-foundations";
import { TableRowCell } from "../../../../layout/Table";
import { Padding } from "../../../../layout/Padding";
import { Heading } from "../../../../components/Heading";
import { HeadlineCard } from "../../../../components/cards/HeadlineCard";

export const LinkCollection: React.FC<{
    collection: ICollection;
    salt?: string;
}> = ({ collection }) => {
    const lightGrey = palette.neutral[97];
    const marineBlue = "#00A194";

    return (
        <>
            <Padding px={12} backgroundColor={lightGrey} />
            <TableRowCell
                tdStyle={{
                    backgroundColor: marineBlue,
                    padding: "8px 0 10px 0"
                }}
            >
                <Heading
                    heading={collection.displayName}
                    color={palette.neutral[100]}
                />
                <TableRowCell tdStyle={{ padding: "0 10px" }}>
                    {collection.curated.map(story => (
                        <HeadlineCard
                            content={story}
                            borderWidth="thin"
                            color={palette.neutral[100]}
                            layout="compact"
                            borderColor="#9fe0c8"
                        />
                    ))}
                </TableRowCell>
            </TableRowCell>
        </>
    );
};
