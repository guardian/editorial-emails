import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { css } from "./css";

const styles: css = {
    color: "red"
};

export const Email = () => {
    const html = renderToStaticMarkup(<div style={styles}>foo</div>);
    return { html: html };
};
