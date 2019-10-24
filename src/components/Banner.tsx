import React from "react";
import { css } from "../css";

const styles: css = {
    width: "100%"
};

export const Banner: React.FC<{}> = () => (
    <img
        src="https://assets.guim.co.uk/images/email/banners/0dbd7be9345b28a8678baaae474e6548/film-today.png"
        alt="Film Today"
        style={styles}
    ></img>
);
