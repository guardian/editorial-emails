import React from "react";
import { TableCSS, TdCSS, LinkCSS } from "../css";
import { palette } from "@guardian/src-foundations";

const tableStyle: TableCSS = {
    borderSpacing: 0,
    borderCollapse: "collapse"
};

const tableWrapper: TableCSS = {
    borderSpacing: 0,
    borderCollapse: "collapse",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "bottom right",
    backgroundImage:
        "url(https://assets.guim.co.uk/images/email/f189dff5bfa4dc66d092f57e973a51b9/grey-g.png)"
};

const tdInnerPadding: TdCSS = {
    padding: "35px 0"
};

const tdStyle: TdCSS = {
    color: palette.neutral[100],
    textAlign: "center",
    fontFamily: "Helvetica, Arial, sans-serif",
    fontSize: "12px",
    fontWeight: 100,
    lineHeight: "14px",
    textDecoration: "none"
};

const tdDisclaimer: TdCSS = {
    color: palette.neutral[86],
    textAlign: "center",
    padding: "20px 12px 0",
    fontFamily: "Helvetica, Arial, sans-serif",
    fontSize: "10px",
    lineHeight: "14px"
};

const linkStyle: LinkCSS = {
    color: palette.neutral[100],
    textDecoration: "none"
};

export const Footer: React.FC<{}> = () => (
    <>
        {"###MERCHANDISING_PLACEHOLDER###"}
        <table style={tableStyle}>
            <tr>
                <td style={{ paddingTop: "10px" }}>
                    // @ts-ignore: bgcolor is deprecated but we require it for
                    // certain clients.
                    <table bgcolor={palette.neutral[20]} style={tableWrapper}>
                        <tr>
                            <td style={tdInnerPadding}>
                                <table style={tableStyle}>
                                    <tr>
                                        <td
                                            className="ft__links"
                                            style={tdStyle}
                                        >
                                            <a
                                                href="https://profile.theguardian.com/email-prefs?##braze_utm##"
                                                style={linkStyle}
                                            >
                                                Manage your emails
                                            </a>{" "}
                                            |{" "}
                                            <a
                                                href="%%unsub_center_url%%"
                                                style={linkStyle}
                                            >
                                                Unsubscribe
                                            </a>{" "}
                                            |{" "}
                                            <a
                                                href="https://www.theguardian.com/email/film-today?##braze_utm##"
                                                style={linkStyle}
                                            >
                                                Trouble viewing?
                                            </a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={tdDisclaimer}>
                                            You are receiving this email because
                                            you are a subscriber to Film Today.
                                            Guardian News &amp; Media Limited -
                                            a member of Guardian Media Group
                                            PLC. Registered Office: Kings Place,
                                            90 York Way, London, N1 9GU.
                                            Registered in England No. 908396.
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </>
);
