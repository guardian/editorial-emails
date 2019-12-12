import React from "react";
import { Collection as ICollection } from "../../../../api";
import { DefaultGrid } from "../../../../layout/Grid";
import { TableRowCell } from "../../../../layout/Table";
import { Heading } from "../../../../components/Heading";
import { Padding } from "../../../../layout/Padding";
import { palette } from "@guardian/src-foundations";
import { Multiline } from "../../../../components/Multiline";
import { ContinueButton } from "../../../../components/buttons/ContinueButton";

export const LinkCollection: React.FC<{
    collection: ICollection;
    salt: string;
}> = ({ collection, salt }) => {
    const lightGrey = palette.neutral[97];
    const content = collection.curated;

    return (
        <>
            <Padding px={12} />

            <Multiline />
            <Heading
                heading={collection.displayName}
                backgroundColor={lightGrey}
            />

            <TableRowCell>
                {content.map(story => {
                    return (
                        <>
                            <Padding px={12} />
                            <ContinueButton
                                label={story.header.headline}
                                linkTo={story.properties.webUrl}
                                backgroundColor={palette.brand.main}
                            />
                        </>
                    );
                })}
            </TableRowCell>
        </>
    );
};
