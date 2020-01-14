import React from "react";
import { CommercialCard } from "./CommercialCard";
import { withKnobs, text } from "@storybook/addon-knobs";
import { Center } from "../../layout/Center";
import { TableRowCell } from "../../layout/Table";

export default {
    component: CommercialCard,
    title: "Cards/CommercialCard",
    decorators: [withKnobs]
};

export const defaultStory = () => {
    return (
        <Center>
            <TableRowCell>
                <CommercialCard
                    headline="Lorem ipsum dolor sit amet, consectetur <strong>adipiscing elit</strong>. Nullam non velit diam. Donec pharetra <em>magna eget nisl imperdiet</em>, ut condimentum ipsum suscipit. Vivamus faucibus leo sed dui ultrices, id pharetra sem porta. <a href='https://www.theguardian.com'>Etiam lacinia vehicula fermentum</a>. Donec condimentum massa semper rhoncus malesuada. Mauris quis massa sit amet quam suscipit ullamcorper sit amet a lorem. Proin dapibus nec risus id rhoncus. <strong>Phasellus eu sagittis nulla</strong>, quis aliquam sapien."
                    cardUrl="https://www.theguardian.com/uk-news/2019/dec/30/briton-found-guilty-over-ayia-napa-false-claim-cyprus"
                    imageSrc="https://images.unsplash.com/photo-1506102383123-c8ef1e872756?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1200&q=80"
                    imageAlt="Lorem ipsum dolor sit amet"
                />
            </TableRowCell>
        </Center>
    );
};

defaultStory.story = {
    name: "Commercial card with image and free text support"
};
