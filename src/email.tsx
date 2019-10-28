import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { Front } from "./api";
import { Banner } from "./components/Banner";
import { Footer } from "./components/Footer";
import { Card } from "./components/Card";
import { css } from "./css";

const canonicalURL = (path: string): string =>
    `https://www.theguardian.com/${path}`;

const center: css = {
    maxWidth: "500px",
    margin: "0 auto"
};

const title = (id: string): string => {
    const tag = id.substring("email/".length);

    return (
        tag
            .split("-")
            .map(s => s[0].toUpperCase() + s.slice(1))
            .join(" ") + " | The Guardian"
    );
};

export const Email = (front: Front) => {
    const body = renderToStaticMarkup(
        <div style={center}>
            <Banner />

            {front.collections[0].backfill.map(content => {
                const image =
                    content.properties.maybeContent.trail.trailPicture
                        .allImages[0];
                return (
                    <Card
                        imageURL={image.url}
                        imageAlt={image.fields.altText}
                        headline={content.properties.webTitle}
                        byline={content.properties.byline}
                        webURL={content.properties.webUrl}
                    />
                );
            })}

            <Footer />
        </div>
    );

    const favicon =
        process.env.NODE_ENV === "production"
            ? "favicon-32x32.ico"
            : "favicon-32x32-dev-yellow.ico";

    const html = `
<html lang="en">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width" />
    <meta name="robots" content="noindex" />
    <link rel="canonical" href=${canonicalURL(front.id)} />
    <title>${title(front.id)}</title>
    <link rel="icon" href="https://static.guim.co.uk/images/${favicon}">
</head>
<body>
        ${body}
</body>
    `;

    return { html: html };
};
