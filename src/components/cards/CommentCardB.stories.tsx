import React from "react";
import { CommentCardB } from "./CommentCardB";
import { withKnobs, text } from "@storybook/addon-knobs";
import { Center } from "../../layout/Center";
import { TableRowCell } from "../../layout/Table";

export default {
    component: CommentCardB,
    title: "Cards/CommentCardB",
    decorators: [withKnobs]
};

export const defaultStory = () => {
    return (
        <Center>
            <TableRowCell>
                <CommentCardB
                    headline="Aenean ut sem elementum vestibulum mauris"
                    byline="Jonathan Freedland"
                    trailText="Aliquam sed est suscipit, congue diam sit amet, tincidunt nibh. Suspendisse potenti. Aenean nibh ligula, ultricies id lorem sit amet, bibendum laoreet ante. Morbi porta nisl non sem commodo tincidunt. Proin nisl massa, sagittis eu vulputate vitae, tristique eget tellus. Donec eu nisi eget dolor cursus vulputate."
                    cardUrl="https://www.theguardian.com/world/2020/jan/07/cyprus-case-british-teenager-given-suspended-sentence"
                    imageSrc="https://media.guim.co.uk/8befa81493c524e24a91b33880bb330d7b50a29b/0_41_5471_3282/master/5471.jpg"
                    imageAlt="Lorem ipsum dolor sit amet"
                    imageSalt="Uz34q0qIkz"
                    contributorImageSrc=""
                    contributorImageAlt=""
                    isComment={true}
                    size="large"
                    shouldShowImage
                />
            </TableRowCell>
        </Center>
    );
};

defaultStory.story = {
    name: "Commercial card with image and free text support"
};
