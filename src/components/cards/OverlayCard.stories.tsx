import React from "react";
import { OverlayCard } from "./OverlayCard";
import { withKnobs, text } from "@storybook/addon-knobs";
import { Center } from "../../layout/Center";
import { TableRowCell } from "../../layout/Table";

export default {
    component: OverlayCard,
    title: "Cards/OverlayCard",
    decorators: [withKnobs]
};

export const defaultStory = () => {
    return (
        <Center>
            <TableRowCell>
                <OverlayCard
                    headline="Aliquam ullamcorper pellentesque magna a porta"
                    trailText="Donec vel ipsum nunc. Vestibulum non orci tortor. Morbi eu iaculis enim, sit amet elementum nisi. Duis pulvinar sollicitudin tortor, vestibulum vulputate neque tempor ut. Ut libero felis, pretium nec felis et, dictum gravida lectus. Morbi lobortis magna nunc, non hendrerit nisi malesuada sit amet."
                    cardUrl="https://www.theguardian.com/world/2019/dec/31/looking-back-i-realise-i-was-naive-reporting-on-the-refugee-crisis"
                    imageSrc="https://i.guim.co.uk/img/media/b8c2393d1e38ba1859f6fa01996933cc382a6776/0_0_5568_3712/master/5568.jpg?width=860&quality=45&auto=format&fit=max&dpr=2&s=2222a23bb4ee59b1cf09aec53d8c599b"
                    imageAlt="Vestibulum non orci tortor"
                    pillar="News"
                    kicker="Climate crisis"
                    layout="expanded"
                />
            </TableRowCell>
        </Center>
    );
};

defaultStory.story = {
    name: "Expanded Overlay card with News pillar"
};

export const compactStory = () => {
    return (
        <Center>
            <TableRowCell>
                <OverlayCard
                    headline="Aliquam ullamcorper pellentesque magna a porta"
                    trailText="Donec vel ipsum nunc. Vestibulum non orci tortor. Morbi eu iaculis enim, sit amet elementum nisi. Duis pulvinar sollicitudin tortor, vestibulum vulputate neque tempor ut. Ut libero felis, pretium nec felis et, dictum gravida lectus. Morbi lobortis magna nunc, non hendrerit nisi malesuada sit amet."
                    cardUrl="https://www.theguardian.com/world/2019/dec/31/looking-back-i-realise-i-was-naive-reporting-on-the-refugee-crisis"
                    imageSrc="https://i.guim.co.uk/img/media/b8c2393d1e38ba1859f6fa01996933cc382a6776/0_0_5568_3712/master/5568.jpg?width=860&quality=45&auto=format&fit=max&dpr=2&s=2222a23bb4ee59b1cf09aec53d8c599b"
                    imageAlt="Vestibulum non orci tortor"
                    pillar="News"
                    kicker="Climate crisis"
                />
            </TableRowCell>
        </Center>
    );
};

compactStory.story = {
    name: "Compact Overlay card with News pillar"
};

export const liveStory = () => {
    return (
        <Center>
            <TableRowCell>
                <OverlayCard
                    headline="Donec vel ipsum nunc. Vestibulum non orci tortor morbi eu iaculis enim"
                    trailText="Donec vel ipsum nunc. Vestibulum non orci tortor. Morbi eu iaculis enim, sit amet elementum nisi. Duis pulvinar sollicitudin tortor, vestibulum vulputate neque tempor ut. Ut libero felis, pretium nec felis et, dictum gravida lectus. Morbi lobortis magna nunc, non hendrerit nisi malesuada sit amet."
                    cardUrl="https://www.theguardian.com/world/2019/dec/31/looking-back-i-realise-i-was-naive-reporting-on-the-refugee-crisis"
                    imageSrc="https://i.guim.co.uk/img/media/b8c2393d1e38ba1859f6fa01996933cc382a6776/0_0_5568_3712/master/5568.jpg?width=860&quality=45&auto=format&fit=max&dpr=2&s=2222a23bb4ee59b1cf09aec53d8c599b"
                    imageAlt="Vestibulum non orci tortor"
                    pillar="News"
                    kicker="Cinema"
                    isLive
                    layout="expanded"
                />
            </TableRowCell>
        </Center>
    );
};

liveStory.story = {
    name: "Live news card"
};
