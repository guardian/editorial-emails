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
                    imageSrc="https://images.unsplash.com/photo-1506102383123-c8ef1e872756?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1200&q=80"
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
                    imageSrc="https://images.unsplash.com/photo-1506102383123-c8ef1e872756?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1200&q=80"
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
                    imageSrc="https://images.unsplash.com/photo-1506102383123-c8ef1e872756?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1200&q=80"
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
