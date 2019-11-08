import React from "react";
import { ImageCSS } from "../css";
import { Table } from "../layout/Table";

const imgStyle: ImageCSS = {
    outline: "none",
    textDecoration: "none",
    maxWidth: "100%",
    clear: "both",
    display: "block",
    border: "0",
    width: "100%"
};

export const Banner: React.FC<{}> = () => (
    <Table>
        <img
            width="600"
            src="https://assets.guim.co.uk/images/email/banners/0dbd7be9345b28a8678baaae474e6548/film-today.png"
            alt="Film Today"
            style={imgStyle}
        ></img>
    </Table>
);
