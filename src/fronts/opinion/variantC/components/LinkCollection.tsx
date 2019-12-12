import React from "react";
import { Collection as ICollection } from "../../../../api";
import { DefaultGrid } from "../../../../layout/Grid";
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

    return (
        <>
            <Padding px={12} backgroundColor={lightGrey} />
            <Multiline />
            <Heading
                heading={collection.displayName}
                backgroundColor={lightGrey}
            />
            {/* <DefaultGrid
                content={collection.curated}
                salt={salt}
                card={{
                    Component: ContinueButton,
                    props: {
                        label: collection.curated[0].header.headline,
                        linkTo: collection.curated[0].properties.webUrl
                    }
                }}
            /> */}
            <Padding px={12} />
            <ContinueButton
                label={collection.curated[0].header.headline}
                linkTo={collection.curated[0].properties.webUrl}
            />
            <ContinueButton
                label={collection.curated[1].header.headline}
                linkTo={collection.curated[1].properties.webUrl}
            />
        </>
    );
};
