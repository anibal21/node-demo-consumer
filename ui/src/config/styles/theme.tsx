/**
 * Description: This file provide a global style with material UI
 * Last Modified: Friday, 17th May 2019 11:05:53 am
 */

import { createMuiTheme, Theme } from '@material-ui/core/styles'

const myTheme: Theme = createMuiTheme({
    overrides: {
    },
    palette: {
        error: {
            contrastText: '#fafefe',
            dark: '#B71C1C',
            light: '#EF5350',
            main: '#D50000',
        },
        primary: {
            contrastText: '#fafefe',
            dark: '#00756c',
            light: '#63d7cb',
            main: '#25a59a',
        },
        secondary: {
            contrastText: '#fce4ec',
            dark: '#836fa9',
            light: '#e6ceff',
            main: '#b39ddb',
        },
    },
    typography: {
        fontSize: 14,
        fontWeightLight: 300,
        fontWeightRegular: 400,
        fontWeightMedium: 500,
    },
})

export default myTheme
