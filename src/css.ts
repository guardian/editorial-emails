// TODO possibly use a map definition with key values to simplify
// TODO split out table css from td css
export interface css {
    color?: string;
    backgroundColor?: string;
    textDecoration?: "none";

    margin?: string;

    maxWidth?: string;
    width?: string;

    textAlign?: "center";

    // TODO table only
    borderSpacing?: number;
    borderCollapse?: "collapse";
    borderTop?: string;

    // TODO td only
    padding?: string;
    paddingBottom?: string;

    // TODO typography only
    fontFamily?: string;
    fontSize?: string;
    fontWeight?: number;
    lineHieght?: string;
    fontStyle?: "italic";
}
