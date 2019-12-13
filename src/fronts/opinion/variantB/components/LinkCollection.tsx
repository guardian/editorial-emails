import React from "react";
import { Collection as ICollection } from "../../../../api";
import { DefaultGrid } from "../../../../layout/Grid";
import { TableRowCell } from "../../../../layout/Table";
import { Heading } from "../../../../components/Heading";
import { Padding } from "../../../../layout/Padding";
import { palette } from "@guardian/src-foundations";
import { Multiline } from "../../../../components/Multiline";
import { ContinueButton } from "../../../../components/buttons/ContinueButton";
import { HeadlineCard } from "../../../../components/cards/HeadlineCard";
import { LinkCardB } from "../../../../components/cards/LinkCardB";

const brazeParameter = "?##braze_utm##"; // TODO solve link generation

export const LinkCollection: React.FC<{
    collection: ICollection;
    salt: string;
}> = ({ collection }) => {
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
                {content.map(story => (
                    <>
                        <Padding px={12} />
                        <HeadlineCard
                            content={story}
                            borderWidth="thin"
                            borderColor={palette.opinion.main}
                            backgroundColor={palette.neutral[97]}
                            layout="expanded"
                            showArrow
                        />
                    </>
                ))}
            </TableRowCell>
        </>
    );
};
