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

export const Banner: React.FC<{ frontId: string }> = ({ frontId }) => {
    const banners: { [key in string]: string } = {
        "email/opinion":
            "https://assets.guim.co.uk/images/email/banners/5ddb54b70715242bc85e071bd14f66e8/opinion.png",
        "email/media-briefing":
            "https://assets.guim.co.uk/images/email/banners/7c27c2af5c0e7ab17516908fe012bc13/media-briefing.png",
        default:
            "https://assets.guim.co.uk/images/email/banners/0dbd7be9345b28a8678baaae474e6548/film-today.png"
    };

    const bannersAlt: { [key in string]: string } = {
        "email/opinion": "The Best of Guardian Opinion",
        "email/media-briefing": "Media Briefing",
        default: "Film Today"
    };

    const bannerSrc = banners[frontId] || banners.default;
    const bannerAltText = bannersAlt[frontId] || bannersAlt.default;

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
