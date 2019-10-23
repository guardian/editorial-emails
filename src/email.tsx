import React from "react";
import { renderToStaticMarkup } from "react-dom/server";

const styles = {
    color: "red"
};

export const Email = () => {
    const html = renderToStaticMarkup(<div style={styles}>foo</div>);
    return { html: html };
};
