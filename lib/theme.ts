import { createTheme } from '@mantine/core';
import { raleway } from './fonts';

const theme = createTheme({
  defaultRadius: 'md',
  fontFamily: raleway.style.fontFamily,
  headings: {
    fontFamily: raleway.style.fontFamily,
  },
});

export default theme;
