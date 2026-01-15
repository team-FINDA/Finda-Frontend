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
      1: {
        fontSize: '100px',
        fontWeight: 800,
      },
      2: {
        fontSize: '72px',
        fontWeight: 800,
      },
      3: {
        fontSize: '60px',
        fontWeight: 800,
      },
    },
    Heading: {
      1: {
        fontSize: '40px',
        fontWeight: 700,
      },
      2: {
        fontSize: '36px',
        fontWieght: 700,
      },
      3: {
        fontSize: '32px',
        fontWeight: 700,
      },
      4: {
        fontSize: '28px',
        fontWeight: 600,
      },
      5: {
        fontSize: '24px',
        fontWeight: 400,
      },
    },
    SubHeading: {
      1: {
        fontSize: '32px',
        fontWeight: 600,
      },
      2: {
        fontSize: '20px',
        fontWeight: 600,
      },
    },
    Body: {
      1: {
        fontSize: '16px',
        fontWeight: 600,
      },
      2: {
        fontSize: '16px',
        fontWeight: 400,
      },
      3: {
        fontSize: '14px',
        fontWeight: 600,
      },
      4: {
        fontSize: '14px',
        fontWeight: 500,
      },
    },
    Caption: {
      1: {
        fontSize: '12px',
        fontWeight: 600,
      },
      2: {
        fontSize: '12px',
        fontWeight: 400,
      },
      3: {
        fontSize: '10px',
        fontWeight: 600,
      },
      4: {
        fontSize: '10px',
        fontWeight: 400,
      },
    },
    Button: {
      1: {
        fontSize: '18px',
        fontWeight: 600,
      },
    },
  },
};

export const GlobalStyle = css`
  *,
  *::before,
  *::after {
    margin: 0;
    box-sizing: border-box;
  }
`;
