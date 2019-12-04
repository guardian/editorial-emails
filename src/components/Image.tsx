import React from "react";
import { palette } from "@guardian/src-foundations";
import { ImageCSS } from "../css";
import { Pillar } from "../api";

import { pillarProps } from "../utils/pillarProps";

const ImageElement: React.FC<{
    src: string;
    alt: string;
    width?: number;
    height?: number;
    style: ImageCSS;
}> = ({ src, alt, width, height, style }) => (
    <img src={src} alt={alt} width={width} height={height} style={style} />
);

interface Props {
    src: string;
    alt: string;
    width?: number;
    height?: number;
    extraStyles?: ImageCSS;
    linkTo?: string;
    pillar?: Pillar;
}

const defaultImageStyles: ImageCSS = {
    fontFamily: "Georgia, serif",
    textDecoration: "none",
    width: "100%",
    maxWidth: "100%",
    outline: "none",
    display: "block",
    clear: "both",
    border: "0"
};

export const Image: React.FC<Props> = ({
    src,
    alt,
    width,
    height,
    extraStyles,
    linkTo,
    pillar
}) => {
    // If a pillar has been passed in, add its colour to the image styles
    // Defaults to dark grey when no pillar available
    const pillarColour =
        pillar && pillarProps[pillar]
            ? pillarProps[pillar].colour
            : palette.neutral[7];
    const imagePillarStyles = { color: pillarColour };

    // Combine all image styles allowing styles passed in via props to take precedence over default styles
    const imageStyles = {
        ...defaultImageStyles,
        ...imagePillarStyles,
        ...extraStyles
    };

    if (linkTo) {
        return (
            <a href={linkTo}>
                <ImageElement
                    src={src}
                    alt={alt}
                    width={width}
                    height={height}
                    style={imageStyles}
                />
            </a>
        );
    }
    return (
        <ImageElement
            src={src}
            alt={alt}
            width={width}
            height={height}
            style={imageStyles}
        />
    );
};
