import React from "react";
import { TableCSS, TdCSS, linkCSS } from "../css";
import { palette } from "@guardian/src-foundations";
import { textSans } from "../styles/typography";

const tableStyle: TableCSS = {
    borderSpacing: 0,
    borderCollapse: "collapse",
};

const tableWrapper: TableCSS = {
    borderSpacing: 0,
    borderCollapse: "collapse",
    backgroundColor: palette.neutral[20],
    backgroundRepeat: "no-repeat",
    backgroundPosition: "bottom right",
    backgroundImage: "url(https://assets.guim.co.uk/images/email/f189dff5bfa4dc66d092f57e973a51b9/grey-g.png)",
};

const tdPadding: TdCSS = {
    paddingTop: "20px",
};

const tdInnerPadding: TdCSS = {
    padding: "35px 0",
};

const tdStyle: TdCSS = {
    color: palette.neutral[100],
    textAlign: "center",
    padding: "3px 10px 5px",

    ...textSans({ level: 1 })
};

const tdDisclaimer: TdCSS = {
    color: palette.neutral[86],
    textAlign: "center",
    padding: "20px 12px 0",

    ...textSans({ level: 1 })
};

const linkStyle: linkCSS = {
    color: palette.neutral[100],
    textDecoration: "none",
}

export const Footer: React.FC<{}> = () => (
    <table style={tableStyle}>
        <tr>
            <td style={tdPadding}>
                <table style={tableWrapper}>
                    <tr>
                        <td style={tdInnerPadding}>
                            <table style={tableStyle}>
                                <tr>
                                    <td style={tdStyle}>
                                        <a href="#" style={linkStyle}>Manage your emails</a> | <a href="#" style={linkStyle}>Unsubscribe</a> | <a href="" style={linkStyle}>Trouble viewing?</a>
                                    </td>
                                </tr>
                                <tr>
                                    <td style={tdDisclaimer}>
                                        You are receiving this email because you are a subscriber to
                                        Film Today. Guardian News & Media Limited - a member of
                                        Guardian Media Group PLC. Registered Office: Kings Place, 90
                                        York Way, London, N1 9GU. Registered in England No. 908396.
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
);
