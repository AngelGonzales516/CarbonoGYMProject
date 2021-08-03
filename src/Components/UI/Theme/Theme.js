const defaultColors = {
  black:"#000000",
  white:"#FFFFFF"
};

const darkColors = {
    black:defaultColors.white,
    white:defaultColors.black
}

const Themes ={
    'default' :{...defaultColors},
    'dark':{...darkColors}
}

export default Themes

export const getThemeColor = (color, theme = 'default') => {
    const themeColor = Themes[theme][color];
    const fallbackColor = Themes.default[color];
  return themeColor || fallbackColor;
  };