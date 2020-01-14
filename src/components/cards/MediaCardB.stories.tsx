import React from "react";
import { MediaCardB } from "./MediaCardB";
import { withKnobs, text } from "@storybook/addon-knobs";
import { Center } from "../../layout/Center";
import { TableRowCell } from "../../layout/Table";

export default {
    component: MediaCardB,
    title: "Cards/MediaCardB",
    decorators: [withKnobs]
};

export const defaultStory = () => {
    return (
        <Center>
            <TableRowCell>
                <MediaCardB
                    headline="Maecenas quis tellus accumsan ornare diam egestas"
                    cardUrl="https://www.theguardian.com/us-news/2019/dec/31/chelsea-manning-us-torture-un-official-wikileaks"
                    imageSrc="https://images.unsplash.com/photo-1506102383123-c8ef1e872756?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1200&q=80"
                    imageAlt="Vestibulum non orci tortor"
                />
            </TableRowCell>
        </Center>
    );
};

defaultStory.story = {
    name: "Small (basic) comment card"
};
