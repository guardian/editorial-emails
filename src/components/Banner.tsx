import React from "react";
import { TableRowCell } from "../layout/Table";
import { Image } from "./Image";

export const Banner: React.FC<{
    title: string;
    frontId: string;
}> = ({ title, frontId }) => {
    const banners: { [key in string]: string } = {
        "email/opinion":
            "https://static.guim.co.uk/editorial-emails/banners/opinion.png",
        "email/media-briefing":
            "https://static.guim.co.uk/editorial-emails/banners/media-briefing.png",
        "email/business-today":
            "https://static.guim.co.uk/editorial-emails/banners/business-today.png",
        "email/sport-au":
            "https://static.guim.co.uk/editorial-emails/banners/australia-sports.png",
        default:
            "https://static.guim.co.uk/editorial-emails/banners/film-today.png"
    };

    const bannerOrigin = banners[frontId] || banners.default;
    return (
        <TableRowCell tdStyle={{ padding: "0" }}>
            <Image src={bannerOrigin} alt={title} width={600} />
        </TableRowCell>
    );
};
