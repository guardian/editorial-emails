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

export const Banner: React.FC<{ frontID: string }> = ({ frontID }) => {
    const banners: { [key in string]: string } = {
        "email/opinion":
            "https://assets.guim.co.uk/images/email/banners/5ddb54b70715242bc85e071bd14f66e8/opinion.png",
        default:
            "https://assets.guim.co.uk/images/email/banners/0dbd7be9345b28a8678baaae474e6548/film-today.png"
    };

    const bannerSrc = banners[frontID] || banners.default;

    return (
        <Table>
            <img
                width="600"
                src={bannerSrc}
                alt="Film Today"
                style={imgStyle}
            ></img>
        </Table>
    );
};
