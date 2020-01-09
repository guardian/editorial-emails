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
                    imageSrc="https://i.guim.co.uk/img/media/b8c2393d1e38ba1859f6fa01996933cc382a6776/0_0_5568_3712/master/5568.jpg?width=860&quality=45&auto=format&fit=max&dpr=2&s=2222a23bb4ee59b1cf09aec53d8c599b"
                    imageAlt="Vestibulum non orci tortor"
                />
            </TableRowCell>
        </Center>
    );
};

defaultStory.story = {
    name: "Small (basic) comment card"
};
