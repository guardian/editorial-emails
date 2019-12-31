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
                    imageSrc="https://i.guim.co.uk/img/media/b8c2393d1e38ba1859f6fa01996933cc382a6776/0_0_5568_3712/master/5568.jpg?width=860&quality=45&auto=format&fit=max&dpr=2&s=2222a23bb4ee59b1cf09aec53d8c599b"
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
                    imageSrc="https://i.guim.co.uk/img/media/b8c2393d1e38ba1859f6fa01996933cc382a6776/0_0_5568_3712/master/5568.jpg?width=860&quality=45&auto=format&fit=max&dpr=2&s=2222a23bb4ee59b1cf09aec53d8c599b"
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
                    imageSrc="https://i.guim.co.uk/img/media/b8c2393d1e38ba1859f6fa01996933cc382a6776/0_0_5568_3712/master/5568.jpg?width=860&quality=45&auto=format&fit=max&dpr=2&s=2222a23bb4ee59b1cf09aec53d8c599b"
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
