import React from "react";
import { TdCSS, FontCSS } from "../../css";
import { palette } from "@guardian/src-foundations";
import { Content } from "../../api";
import { TableRow, TableRowCell } from "../../layout/Table";
import { textBody } from "../../styles/typography";
import { getTransformedFreeText } from "../../utils/getTransformedFreeText";

const outerTdStyle: TdCSS = {
    padding: "0 10px",
    verticalAlign: "top",
    backgroundColor: palette.neutral[97]
};

const innerTdStyle: TdCSS = {
    padding: "10px",
    verticalAlign: "top",
    backgroundColor: palette.neutral[100]
};

const freeTextStyle: FontCSS = {
    ...textBody({ level: 1 }),
    color: palette.neutral[7]
};

interface Props {
    content: Content;
}

export const FreeTextCard: React.FC<Props> = ({ content }) => {
    const { headline } = content.header;

    const testContent =
        'You might be familiar with the name Andrew Bailey if you pay close attention to your cash: his signature used to adorn bank notes that were printed when he was chief cashier at the&nbsp;<a href="https://www.theguardian.com/business/bankofenglandgovernor">Bank of England</a>. Now his name is expected to adorn the door to the governor’s office.The&nbsp;<a href="https://www.ft.com/content/a65bfdca-2286-11ea-b8a1-584213ee7b2b">Financial Times</a>&nbsp;(£) on Thursday night reported that a decision to appoint Bailey had been made, and is expected to be made this morning.<strong><br><br></strong>Bailey would be seen as a safe choice for chancellor Sajid Javid. The potential governor is a creature of the Bank, having served as a <strong><em><a href="https://www.theguardian.com/business/2019/jun/18/fidelity-woodford-income-focus-fund-neil-woodford">private secretary</a></em></strong> to a previous governor and taking a key role in the bank bailouts of 2008. He is perhaps better known now across the City for helming the&nbsp;<strong>Financial Conduct Authority</strong>&nbsp;(FCA) since July 2016.However, he is not without his critics. <br><br>During his time the FCA has been hit by intense criticism of its handling of multiple financial scandals, including the&nbsp;<a href="https://www.theguardian.com/business/2019/jun/18/fidelity-woodford-income-focus-fund-neil-woodford"><em><strong>liquidity issues</strong></em> surrounding former star fund manager Neil Woodford</a>&nbsp;and the&nbsp;<a href="https://www.theguardian.com/business/2019/may/23/high-court-judge-leads-inquiry-into-london-capital-finance-scandal">mini-bond misselling scandal at London Capital &amp; Finance</a>.<br><br>The new govenor will have a bulging in-tray – likely taking over on the day that the UK leaves the EU, 1 February.<br><br>The FT reported that&nbsp;<strong>Bailey’s Brexit views</strong>&nbsp;were a “key factor”, citing people close to the process. Minouche Shafik, the former Bank deputy governor who now heads the London School of Economics, was reportedly ruled out because of her criticism of&nbsp;<a href="https://www.theguardian.com/politics/eu-referendum">Brexit</a>.<br><br>If anyone needed any reminder of the possible challenges facing a new governor, the last 24 hours have given a timely nudge.First off, the Bank’s chief operating officer is facing calls to resign after a&nbsp;<a href="https://www.theguardian.com/business/2019/dec/19/hedge-funds-hacked-into-bank-of-england-briefings"><strong>damaging lapse in security</strong>&nbsp;that allowed hedge funds to pay for early access</a>&nbsp;to current governor Mark Carney’s words at Bank of England press conferences. The eight seconds those investors may have gained from a high-speed audio-only connection could have given a vital edge to investors.<br><br>And secondly, new economic data published overnight suggests that uncertainty over the economy was still a factor at least up until the election. Data from GfK, which do not cover the post-election period, suggest that&nbsp;<strong>consumer confidence</strong>&nbsp;increased slightly, but still at the low levels seen over the last three years. More detail on this to come – although the real story will be what impact Boris Johnson’s majority will have.<br><br><strong>Also coming up:</strong><br>• 9:30am GMT: UK GDP growth rate final reading (third quarter)<br>• 9:30am GMT: UK current account (third quarter)<br>• 9:30am GMT: UK business investment (third quarter)<br>•&nbsp;9:30am GMT: UK public sector net borrowing (November)<br>•&nbsp;11am GMT: Speech by Bank of England MPC member Jonathan Haskel<br>•&nbsp;12pm: Bank of England quarterly bulletin<br>•&nbsp;1:30pm GMT: US GDP growth rate final reading (third quarter)<br>•&nbsp;1:30pm GMT: US personal consumption expenditure index (November)<br><br>We’ll be <a href="https://www.theguardian.com/business/live/2019/dec/20/chancellor-sajid-javid-andrew-bailey-bank-of-england-governor-sterling-stock-markets-ftse-us-gdp-business-live">tracking all the main events throughout the day</a> ...';

    return (
        <TableRowCell tdStyle={outerTdStyle}>
            <TableRow>
                <td style={innerTdStyle}>
                    <span
                        style={freeTextStyle}
                        dangerouslySetInnerHTML={{
                            __html: getTransformedFreeText(testContent)
                        }}
                    ></span>
                </td>
            </TableRow>
        </TableRowCell>
    );
};
