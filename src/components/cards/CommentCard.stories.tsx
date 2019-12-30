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
                    imageSrc="https://i.guim.co.uk/img/uploads/2017/10/06/Larry-Elliott,-R.png?quality=45&sharpen=a0.8,r1,t1&width=180&dpr=2&fit=max&s=0adc71804ca8c83699337f365917aaae"
                    imageSalt="Uz34q0qIkz"
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
