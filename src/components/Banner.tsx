import React from "react";
import { ImageCSS } from "../css";
import { TableRowCell } from "../layout/Table";

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

    const bannersAlt: { [key in string]: string } = {
        "email/opinion": "The Best of Guardian Opinion",
        default: "Film Today"
    };

    const bannerSrc = banners[frontID] || banners.default;
    const bannerAltText = bannersAlt[frontID] || bannersAlt.default;

    return (
        <TableRowCell tdStyle={{ padding: "0" }}>
            <img
                width="600"
                src={bannerSrc}
                alt={bannerAltText}
                style={imgStyle}
            ></img>
        </TableRowCell>
    );
};
