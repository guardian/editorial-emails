import React from "react";
import { FreeTextCard } from "./FreeTextCard";
import { withKnobs, text } from "@storybook/addon-knobs";
import { Center } from "../../layout/Center";
import { TableRowCell } from "../../layout/Table";

export default {
    component: FreeTextCard,
    title: "Cards/FreeTextCard",
    decorators: [withKnobs]
};

export const defaultStory = () => {
    return (
        <Center>
            <TableRowCell>
                <FreeTextCard bodyText="Nunc ac arcu turpis. <strong>Nullam non arcu rutrum</strong>, laoreet ligula convallis, iaculis urna. Pellentesque pulvinar nunc eget ex volutpat sagittis. <em>Integer eget libero tincidunt</em>, hendrerit arcu eu, vulputate nunc. Quisque in felis urna. Ut consectetur, leo ut dapibus facilisis, odio massa molestie neque, sit amet dictum leo nibh a ipsum. <strong>Suspendisse potenti.</strong> Quisque blandit tempor orci vel pretium. <a href='https://www.theguardian.com'><strong>Aenean at nisi vel sapien bibendum imperdiet sit amet id dui</strong></a>. Nullam odio est, efficitur at dolor a, sollicitudin tristique nulla." />
            </TableRowCell>
        </Center>
    );
};

defaultStory.story = {
    name: "Basic Free Text card"
};
