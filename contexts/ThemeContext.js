import { useState } from 'react';

export const themes = {
  light: {
    foreground: '#000000',
    background: '#eeeeee',
  },
  dark: {
    foreground: '#ffffff',
    background: '#222222',
  },
};

let ThemeContext;
const { Provider, Consumer } = ThemeContext = React.createContext({
  theme: themes.light,
  toggleTheme: () => {},
});

const ThemeProvider = ({ children }) => {
  const [ theme, setTheme ] = useState(themes.light)

  const toggleTheme = () => theme === themes.light ? setTheme(themes.dark) : setTheme(themes.light);

  return (
    <Provider value={{ theme, toggleTheme }}>
      { children }
    </Provider>
  )
}

export { ThemeProvider, Consumer as ThemeConsumer, ThemeContext };

