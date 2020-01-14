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
                    imageSrc="https://images.unsplash.com/photo-1506102383123-c8ef1e872756?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1200&q=80"
                    imageAlt="Lorem ipsum dolor sit amet"
                    isComment
                    size="large"
                    shouldShowImage
                />
            </TableRowCell>
        </Center>
    );
};

defaultStory.story = {
    name: "Large card with image"
};

export const smallStory = () => {
    return (
        <Center>
            <TableRowCell>
                <CommentCardB
                    headline="Aenean ut sem elementum vestibulum mauris"
                    byline="Jonathan Freedland"
                    trailText="Aliquam sed est suscipit, congue diam sit amet, tincidunt nibh. Suspendisse potenti. Aenean nibh ligula, ultricies id lorem sit amet, bibendum laoreet ante. Morbi porta nisl non sem commodo tincidunt. Proin nisl massa, sagittis eu vulputate vitae, tristique eget tellus. Donec eu nisi eget dolor cursus vulputate."
                    cardUrl="https://www.theguardian.com/world/2020/jan/07/cyprus-case-british-teenager-given-suspended-sentence"
                    imageSrc="https://images.unsplash.com/photo-1506102383123-c8ef1e872756?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1200&q=80"
                    imageAlt="Lorem ipsum dolor sit amet"
                    isComment
                    size="small"
                    shouldShowImage
                />
            </TableRowCell>
        </Center>
    );
};

smallStory.story = {
    name: "Small card with image"
};

export const noImageStory = () => {
    return (
        <Center>
            <TableRowCell>
                <CommentCardB
                    headline="Aenean ut sem elementum vestibulum mauris"
                    byline="Jonathan Freedland"
                    trailText="Aliquam sed est suscipit, congue diam sit amet, tincidunt nibh. Suspendisse potenti. Aenean nibh ligula, ultricies id lorem sit amet, bibendum laoreet ante. Morbi porta nisl non sem commodo tincidunt. Proin nisl massa, sagittis eu vulputate vitae, tristique eget tellus. Donec eu nisi eget dolor cursus vulputate."
                    cardUrl="https://www.theguardian.com/world/2020/jan/07/cyprus-case-british-teenager-given-suspended-sentence"
                    imageSrc="https://images.unsplash.com/photo-1506102383123-c8ef1e872756?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1200&q=80"
                    imageAlt="Lorem ipsum dolor sit amet"
                    isComment
                    size="small"
                />
            </TableRowCell>
        </Center>
    );
};

noImageStory.story = {
    name: "Large card without image"
};
