import Typography from 'typography';
import parnassusTheme from 'typography-theme-parnassus';
parnassusTheme.baseFontSize = '20px';

const typography = new Typography(parnassusTheme);

// Hot reload typography in development.
if (process.env.NODE_ENV !== `production`) {
  typography.injectStyles();
}

export default typography;
export const rhythm = typography.rhythm;
export const scale = typography.scale;
