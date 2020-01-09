import React from "react";

interface ImageContext {
    imageSalt: string;
}

const initialValues: ImageContext = { imageSalt: "" };

const ImageContext = React.createContext(initialValues);

export const ImageProvider = ImageContext.Provider;
export const ImageConsumer = ImageContext.Consumer;
export default ImageContext;
