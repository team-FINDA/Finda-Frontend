import { css } from '@emotion/react';

export const theme = {
  color: {
    gray: {
      900: '#000000',
      800: '#434343',
      700: '#5C5C5C',
      600: '#7A7A7A',
      500: '#ABABAB',
      400: '#D1D1D1',
      300: '#E9E9E9',
      200: '#F9F9F9',
      100: '#FFFFFF',
    },
    Blue: {
      600: '#2A4EDB',
      500: '#2E56F5',
      400: '#6686FF',
      300: '#88A0FC',
      200: '#BFCCFF',
      100: '#ECF0FF',
    },
    Web: {
      600: '#2A4EDB',
      500: '#2E56F5',
      400: '#565F84',
      300: '#020F27',
      200: '#096AB3',
      100: '#F1F9FF',
    },
    WebSub: {
      red: {
        100: '#FFF1F1',
        200: '#B3090C',
      },
      yellow: {
        100: '#FFFEF1',
        200: '#B3A809',
      },
      green: '#5FC273',
    },
    Red: {
      100: '#F54B31',
    },
  },
  font: {
    Display: {
      1: css`
        font-size: 100px;
        font-weight: 800;
      `,
      2: css`
        font-size: 72px;
        font-weight: 800;
      `,
      3: css`
        font-size: 60px;
        font-weight: 800;
      `,
    },

    Heading: {
      1: css`
        font-size: 40px;
        font-weight: 700;
      `,
      2: css`
        font-size: 36px;
        font-weight: 700;
      `,
      3: css`
        font-size: 32px;
        font-weight: 700;
      `,
      4: css`
        font-size: 28px;
        font-weight: 600;
      `,
      5: css`
        font-size: 24px;
        font-weight: 400;
      `,
    },

    SubHeading: {
      1: css`
        font-size: 32px;
        font-weight: 600;
      `,
      2: css`
        font-size: 20px;
        font-weight: 600;
      `,
    },

    Body: {
      1: css`
        font-size: 16px;
        font-weight: 600;
      `,
      2: css`
        font-size: 16px;
        font-weight: 400;
      `,
      3: css`
        font-size: 14px;
        font-weight: 600;
      `,
      4: css`
        font-size: 14px;
        font-weight: 500;
      `,
    },

    Caption: {
      1: css`
        font-size: 12px;
        font-weight: 600;
      `,
      2: css`
        font-size: 12px;
        font-weight: 400;
      `,
      3: css`
        font-size: 10px;
        font-weight: 600;
      `,
      4: css`
        font-size: 10px;
        font-weight: 400;
      `,
    },

    Button: {
      1: css`
        font-size: 18px;
        font-weight: 600;
      `,
    },
  },
} as const;

export type Theme = typeof theme;

export const GlobalStyle = css`
  *,
  *::before,
  *::after {
    margin: 0;
    box-sizing: border-box;
  }
`;
