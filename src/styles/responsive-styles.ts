export const responsiveStyles = `
@media only screen and (max-width: 600px) {
    .center-element {
        min-width: 0 !important;
    }
    .container {
        width: 100% !important;
    }
}

@media screen and (-webkit-min-device-pixel-ratio: 0) {
    td {
        -webkit-font-smoothing: antialiased;
    }
}

@media screen and (max-width: 480px) {
    .m-pad { padding-right: 10px !important }
    .m-col-pad { padding-bottom: 15px !important }
}
`;
