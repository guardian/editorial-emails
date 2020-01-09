import React from "react";
import { CommentCard } from "./CommentCard";
import { withKnobs, text } from "@storybook/addon-knobs";
import { Center } from "../../layout/Center";
import { TableRowCell } from "../../layout/Table";

export default {
    component: CommentCard,
    title: "Cards/CommentCard",
    decorators: [withKnobs]
};

export const defaultStory = () => {
    return (
        <Center>
            <TableRowCell>
                <CommentCard
                    headline="Lorem ipsum dolor sit amet consectetur adipiscing elit"
                    byline="Florian Schneider"
                    cardUrl="https://www.theguardian.com/uk-news/2019/dec/30/briton-found-guilty-over-ayia-napa-false-claim-cyprus"
                    pillar="News"
                    isComment
                />
            </TableRowCell>
        </Center>
    );
};

defaultStory.story = {
    name: "Small (basic) comment card"
};

export const largeCardImageStory = () => {
    return (
        <Center>
            <TableRowCell>
                <CommentCard
                    headline="Lorem ipsum dolor sit amet consectetur adipiscing elit"
                    byline="Florian Schneider"
                    trailText="Lorem ipsum dolor sit amet consectetur adipiscing elit et dolot si amet"
                    cardUrl="https://www.theguardian.com/uk-news/2019/dec/30/briton-found-guilty-over-ayia-napa-false-claim-cyprus"
                    isComment
                    size="large"
                    shouldShowProfileImage
                    pillar="News"
                    imageSrc="https://images.unsplash.com/photo-1506102383123-c8ef1e872756?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1200&q=80"
                    imageAlt="Lorem ipsum dolor sit amet"
                />
            </TableRowCell>
        </Center>
    );
};

largeCardImageStory.story = {
    name: "Large comment card with image"
};

export const largeCardStory = () => {
    return (
        <Center>
            <TableRowCell>
                <CommentCard
                    headline="Lorem ipsum dolor sit amet consectetur adipiscing elit"
                    byline="Florian Schneider"
                    trailText="Lorem ipsum dolor sit amet consectetur adipiscing elit et dolot si amet"
                    cardUrl="https://www.theguardian.com/uk-news/2019/dec/30/briton-found-guilty-over-ayia-napa-false-claim-cyprus"
                    size="large"
                    pillar="Opinion"
                    isComment
                />
            </TableRowCell>
        </Center>
    );
};

largeCardStory.story = {
    name: "Large comment card without image"
};
