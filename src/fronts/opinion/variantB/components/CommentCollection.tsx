import React from "react";
import { Collection as ICollection } from "../../../../api";
import { Heading } from "./../../../../components/Heading";
import { Multiline } from "./../../../../components/Multiline";
import { CommentCard } from "./../../../../components/cards/CommentCard";
import { Padding } from "../../../../layout/Padding";
import { TableRowCell } from "../../../../layout/Table";
import { palette } from "@guardian/src-foundations";

const frontIdShouldShowCommentGridImages = (frontId: string): boolean => {
    if (frontId === "email/opinion") {
        return false;
    }
    return true;
};

export const CommentCollection: React.FC<{
    frontId: string;
    collection: ICollection;
    salt: string;
}> = ({ collection, salt }) => {
    const lightGrey = palette.neutral[97];
    const firstCollection = collection.backfill[0];
    const rest = collection.backfill.slice(1);

    return (
        <>
            <TableRowCell tdStyle={{ backgroundColor: lightGrey }}>
                <Padding px={12} />
                <Multiline />
                <Heading heading={collection.displayName} />
                <CommentCard
                    content={firstCollection}
                    salt={salt}
                    size="large"
                    shouldShowProfileImage
                />
                <Padding px={12} />
                {rest.map((story, index) => (
                    <>
                        <CommentCard
                            content={story}
                            salt={salt}
                            shouldShowImage={false}
                        />
                        {index < rest.length - 1 && <Padding px={12} />}
                    </>
                ))}
            </TableRowCell>
        </>
    );
};
