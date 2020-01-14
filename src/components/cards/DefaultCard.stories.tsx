import React from "react";
import { DefaultCard } from "./DefaultCard";
import { withKnobs, text } from "@storybook/addon-knobs";
import { Center } from "../../layout/Center";
import { TableRowCell } from "../../layout/Table";

export default {
    component: DefaultCard,
    title: "Cards/DefaultCard",
    decorators: [withKnobs]
};

export const defaultStory = () => {
    return (
        <Center>
            <TableRowCell>
                <DefaultCard
                    headline="Donec tempus nunc orci, a aliquet purus vehicula vestibulum."
                    byline="Jonathan Anthony"
                    kicker="Breaking News"
                    cardUrl="https://www.theguardian.com/world/2019/dec/31/looking-back-i-realise-i-was-naive-reporting-on-the-refugee-crisis"
                    isComment
                    pillar="News"
                    imageSrc="https://images.unsplash.com/photo-1506102383123-c8ef1e872756?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1200&q=80"
                    imageAlt="Vestibulum non orci tortor"
                    size="large"
                />
            </TableRowCell>
        </Center>
    );
};

defaultStory.story = {
    name: "Large default card with News pillar"
};

export const smallStory = () => {
    return (
        <Center>
            <TableRowCell>
                <DefaultCard
                    headline="Donec tempus nunc orci, a aliquet purus vehicula vestibulum."
                    byline="Jonathan Anthony"
                    kicker="Golf"
                    cardUrl="https://www.theguardian.com/world/2019/dec/31/looking-back-i-realise-i-was-naive-reporting-on-the-refugee-crisis"
                    pillar="Sport"
                    imageSrc="https://images.unsplash.com/photo-1506102383123-c8ef1e872756?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1200&q=80"
                    imageAlt="Vestibulum non orci tortor"
                    size="small"
                />
            </TableRowCell>
        </Center>
    );
};

smallStory.story = {
    name: "Small default card with Sport pillar"
};

export const backgroundStory = () => {
    return (
        <Center>
            <TableRowCell>
                <DefaultCard
                    headline="Donec tempus nunc orci, a aliquet purus vehicula vestibulum."
                    byline="Jonathan Anthony"
                    isComment
                    cardUrl="https://www.theguardian.com/world/2019/dec/31/looking-back-i-realise-i-was-naive-reporting-on-the-refugee-crisis"
                    pillar="Arts"
                    imageSrc="https://images.unsplash.com/photo-1506102383123-c8ef1e872756?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1200&q=80"
                    imageAlt="Vestibulum non orci tortor"
                    size="small"
                    designName="border"
                />
            </TableRowCell>
        </Center>
    );
};

backgroundStory.story = {
    name: "Small default card with border design and Arts pillar"
};
