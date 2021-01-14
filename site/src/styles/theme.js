module.exports = {
  fonts: {
    main: "Roboto",
    code: "Roboto Mono, monospace",
  },
  colors: {
    background: "#FFFFFF",
    backgroundDark: "#f6e6f5",

    primary: "#f27979",
    primaryDark: "#f27979",

    secondary: "#811e78",
    secondaryDark: "#250031",

    accent: "#ff7b02",
    accentDark: "#ff7b02",

    // primary: '#a12596',
    // primaryLight: '#d957cd',
    // primaryDark: '#811e78',

    // secondary: '#ffa32a',
    // secondaryLight: '#ffcb52',
    // secondaryDark: '#ff7b02',
  },
  breakpoints: {
    small: "@media only screen and (max-width: 425px)", // mobile
    medium: "@media only screen and (max-width: 768px)", // tablet
    large: "@media only screen and (max-width: 1024px)", // laptop
    extraLarge: "@media only screen and (max-width: 1440px)", // desktop
  },
  measurements: {
    headerHeight: 50, // px
    drawerHeight: 40, // px
  },
  zIndices: {
    map: 10,
    mapOverlays: 20,
    mapAddInfo: 30,
    aboutPage: 40,
    headerSecondary: 50,
    headerPrimary: 60,
    headerLanguageDropdown: 70,
  },
}
