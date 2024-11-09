import { createTheme } from '@mantine/core';
import { raleway } from './fonts';

const theme = createTheme({
  fontFamily: raleway.style.fontFamily,
  headings: {
    fontFamily: raleway.style.fontFamily,
  },
});

export default theme;
