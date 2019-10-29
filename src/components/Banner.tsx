import React from "react";
import { css } from "../css";

const tableStyle: css = {
    borderSpacing: 0,
    borderCollapse: "collapse",
    width: "100%"
};

const tdStyle: css = {
    padding: 0
};

const styles: css = {
    outline: "none",
    textDecoration: "none",
    maxWidth: "100%",
    clear: "both",
    display: "block",
    width: "100%"
};

export const Banner: React.FC<{}> = () => (
    <table style={tableStyle}>
        <tr>
            <td style={tdStyle}>
                <img
                width="600"
                src="https://assets.guim.co.uk/images/email/banners/0dbd7be9345b28a8678baaae474e6548/film-today.png"
                alt="Film Today"
                style={styles}
            ></img>
            </td>
        </tr>
    </table>
);
