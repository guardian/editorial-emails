import React from "react";
import { Collection as ICollection } from "../../../../api";
import { TableRowCell } from "../../../../layout/Table";
import { Heading } from "../../../../components/Heading";
import { Padding } from "../../../../layout/Padding";
import { palette } from "@guardian/src-foundations";
import { Multiline } from "../../../../components/Multiline";
import { HeadlineCard } from "../../../../components/cards/HeadlineCard";

export const LinkCollection: React.FC<{
    collection: ICollection;
    salt: string;
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
                            content={story}
                            borderWidth="thin"
                            borderColor={palette.opinion.main}
                            backgroundColor={white}
                            layout="expanded"
                            showArrow
                        />
                        {index < content.length - 1 && <Padding px={12} />}
                    </>
                ))}
            </TableRowCell>
        </>
    );
};
