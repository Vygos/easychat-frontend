import { createTheme } from "@material-ui/core";

const theme =  createTheme({
    palette: {
        primary: {
            main: '#a13bf5'
        },
        secondary: {
            main: '#F0F0F0'
        },
        contrastThreshold: 3,
        // Used by the functions below to shift a color's luminance by approximately
        // two indexes within its tonal palette.
        // E.g., shift from Red 500 to Red 300 or Red 700.
        tonalOffset: 0.2,
    },
    typography: {
        fontFamily: `"Varela Round", "Roboto", "Helvetica", "Arial", sans-serif`
    },
})

export default theme;