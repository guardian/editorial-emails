import React from "react";
import { ImageCSS, TableCSS } from "../css";

const tableStyle: TableCSS = {
    borderSpacing: 0,
    borderCollapse: "collapse",
    width: "100%"
};

const imgStyle: ImageCSS = {
    outline: "none",
    textDecoration: "none",
    maxWidth: "100%",
    clear: "both",
    display: "block",
    border: "0",
    width: "100%",
};

export const Banner: React.FC<{}> = () => (
    <table style={tableStyle}>
        <tr>
            <td>
                <img
                    width="600"
                    src="https://assets.guim.co.uk/images/email/banners/0dbd7be9345b28a8678baaae474e6548/film-today.png"
                    alt="Film Today"
                    style={imgStyle}
                ></img>
            </td>
        </tr>
    </table>
);
