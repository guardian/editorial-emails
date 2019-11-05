import React from "react";
import { Content } from "../api";
import { Card } from "../components/Card";

interface Props {
    content: Content[];
    salt: string;
}

// TODO really should accept a React element so that it doesn't have to know
// about Card or salt.
export const Grid: React.FC<Props> = ({ content, salt }) => {
    // split into groups of two
    // return half-width cards
    const pairs = [];
    while (content.length) {
        pairs.push(content.splice(0, 2));
    }

    const rows = pairs.map(pair => (
        <>
            <Card content={pair[0]} salt={salt} />
            <Card content={pair[1]} salt={salt} />
        </>
    ));

    return <>{rows}</>;
};
