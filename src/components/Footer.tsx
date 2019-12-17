import React from "react";
import { TableCSS, TdCSS, LinkCSS } from "../css";
import { palette } from "@guardian/src-foundations";
import { TableRowCell, Table } from "../layout/Table";

const tableWrapper: TableCSS = {
    borderSpacing: 0,
    borderCollapse: "collapse",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "bottom right",
    backgroundImage:
        "url(https://static.guim.co.uk/editorial-emails/logos/grey-g.png)"
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

export const disclaimer = (
    title: string
): string => `You are receiving this email because you are a subscriber to ${title}. Guardian News & Media Limited - a member of Guardian Media Group PLC. Registered Office: Kings Place, 90 York Way, London, N1 9GU.
Registered in England No. 908396.`;

export const Footer: React.FC<{ title: string; frontId: string }> = ({
    title,
    frontId
}) => (
    <>
        {"###MERCHANDISING_PLACEHOLDER###"}
        <TableRowCell tdStyle={{ paddingTop: "12px" }}>
            {/*
                    // @ts-ignore as bgcolor required by some clients */}
            <table bgcolor={palette.neutral[20]} style={tableWrapper}>
                <tr>
                    <td style={tdInnerPadding}>
                        <Table>
                            <tr>
                                <td className="ft__links" style={tdStyle}>
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
                                        href={`https://www.theguardian.com/${frontId}?##braze_utm##`}
                                        style={linkStyle}
                                    >
                                        Trouble viewing?
                                    </a>
                                </td>
                            </tr>
                            <tr>
                                <td style={tdDisclaimer}>
                                    {disclaimer(title)}
                                </td>
                            </tr>
                        </Table>
                    </td>
                </tr>
            </table>
        </TableRowCell>
    </>
);
