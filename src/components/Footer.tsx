import React from "react";
import { css } from "../css";
import { palette } from "@guardian/src-foundations";
import { cardPadding } from "../styles/card-padding";
import { textSans } from "../styles/typography";

const styles: css = {
    width: "100%",
    backgroundColor: palette.neutral[20],
    color: palette.neutral[97],
    textAlign: "center",

    ...textSans({ level: 1 })
};

export const Footer: React.FC<{}> = () => (
    <div style={styles}>
        <div style={cardPadding}>
            <p>Manage your emails | Unsubscribe | Trouble viewing?</p>
            <p>
                You are receiving this email because you are a subscriber to
                Film Today. Guardian News & Media Limited - a member of Guardian
                Media Group PLC. Registered Office: Kings Place, 90 York Way,
                London, N1 9GU. Registered in England No. 908396.
            </p>
        </div>
    </div>
);
