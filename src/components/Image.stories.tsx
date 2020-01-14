import React from "react";
import { Image } from "./Image";
import { withKnobs, text } from "@storybook/addon-knobs";
import { Center } from "../layout/Center";
import { TableRowCell } from "../layout/Table";

export default {
    component: Image,
    title: "Components/Image",
    decorators: [withKnobs]
};

export const defaultStory = () => (
    <Center>
        <TableRowCell>
            <Image
                src="https://i.guim.co.uk/img/media/6398eb5c6b9a6f9f0febd571604e8fbafe997cf4/0_530_7952_4774/master/7952.jpg?width=1900&quality=45&auto=format&fit=max&dpr=2&s=a427fd2c8fc82ccb041136559878be75"
                alt="When wine turns to ash in your mouth, you can not deny the new reality anymore"
                linkTo="https://www.theguardian.com/commentisfree/2019/dec/19/2019-wasnt-just-protests-and-fleabag-it-was-the-year-a-climate-truth-bomb-dropped"
                width={400}
            />
        </TableRowCell>
    </Center>
);

defaultStory.story = { name: "Image wrapped in a link" };

export const extraStylesStory = () => (
    <Center>
        <TableRowCell>
            <Image
                src="https://i.guim.co.uk/img/media/8b82d1c1fb126ae4a7840e0d6be72e7bce0d55f1/0_514_7680_4609/master/7680.jpg?width=620&quality=45&auto=format&fit=max&dpr=2&s=ea935194c853b0ff5364f06e631f06ce"
                alt="When wine turns to ash in your mouth, you can not deny the new reality anymore"
                linkTo="https://www.theguardian.com/commentisfree/2019/dec/19/2019-wasnt-just-protests-and-fleabag-it-was-the-year-a-climate-truth-bomb-dropped"
                width={600}
                extraStyles={{ border: "2px dashed grey" }}
            />
        </TableRowCell>
    </Center>
);

extraStylesStory.story = {
    name: "Image with a dashed border via extra styles"
};
