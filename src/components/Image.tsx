import React, { useContext } from "react";
import { palette } from "@guardian/src-foundations";
import { ImageCSS } from "../css";
import { Pillar } from "../api";
import ImageContext from "../ImageContext";
import { formatImage } from "../image";
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

const defaultImageStyles = (ignoreWidth: boolean): ImageCSS => {
    const sizingStyles: ImageCSS = {};
    if (!ignoreWidth) {
        sizingStyles.width = "100%";
        sizingStyles.display = "block";
    }

    return {
        fontFamily: "'GH Guardian Headline', Georgia, serif",
        textDecoration: "none",
        maxWidth: "100%",
        outline: "none",
        display: "inline-block",
        clear: "both",
        border: "0",
        ...sizingStyles
    };
};

interface Props {
    src: string;
    alt: string;
    width?: number;
    height?: number;
    extraStyles?: ImageCSS;
    linkTo?: string;
    pillar?: Pillar;
    rating?: number;
    ignoreWidth?: boolean;
}

export const Image: React.FC<Props> = ({
    src,
    alt,
    width,
    height,
    extraStyles,
    linkTo,
    pillar,
    rating = null,
    ignoreWidth
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
        ...defaultImageStyles(ignoreWidth),
        ...imagePillarStyles,
        ...extraStyles
    };

    // If salt available in context (likely when running server-side), use it to sign the image and get a Fastly URL
    // Otherwise (likely when running client-side), render image using master URL (e.g. for Storybook)
    const { imageSalt } = useContext(ImageContext);
    const formattedImageSrc = imageSalt
        ? formatImage(src, imageSalt, width, rating)
        : src;

    if (linkTo) {
        return (
            <a href={linkTo}>
                <ImageElement
                    src={formattedImageSrc}
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
            src={formattedImageSrc}
            alt={alt}
            width={width}
            height={height}
            style={imageStyles}
        />
    );
};
