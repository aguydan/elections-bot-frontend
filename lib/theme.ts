import { createTheme } from '@mantine/core';
import { raleway } from './fonts';

const theme = createTheme({
  breakpoints: {
    xss: '24em',
  },
  fontFamily: raleway.style.fontFamily,
  headings: {
    fontFamily: raleway.style.fontFamily,
  },
});

export default theme;
