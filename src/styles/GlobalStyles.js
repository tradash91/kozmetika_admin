// GlobalStyles.js
import { createGlobalStyle, css } from "styled-components";

const GlobalStyles = createGlobalStyle`


 :root {
  
   /* Shadows */
--shadow: 0px 8px 16px rgba(32, 37, 41, 0.08);

  /* Neutrals */
  --neutral-900-bg: rgba(33, 33, 77, 0.7);
  --neutral-900-bs: rgba(17, 17, 17, 0.16);
  --neutral-900: #21214D;
  --neutral-600: #57577B;
  --neutral-300: #9393B7;
  --neutral-200: #CBCDD0;
  --neutral-0: #ffffff;

  /* Blues */
  
  --blue-700: #2A4CD5;
  --blue-600: #4865DB;
  --blue-200: #C7D3F7;
  --blue-100: #E0E6FA;

  /* Red */
  --red-700: #e60013;
  --red-500: #e03112ff;

  /* Other colors */
  --red-300: #FF9B99;
  --indigo-200: #B8B1FF;
  --blue-300: #89CAFF;
  --green-300: #89E780;
  --green-500: #16c967ff;
  --amber-300: #FFC97C;


  
  /* Gradients */
  --light-gradient: linear-gradient(180deg,#F5F5FF 72.99%, #E0E0FF 100%);

  /* Border radius */
  --radius-0: 0;
  --radius-4: 4px;
  --radius-6: 6px;
  --radius-8: 8px;
  --radius-10: 10px;
  --radius-12: 12px;
  --radius-16: 16px;
  --radius-20: 20px;
  --radius-24: 24px;
  --radius-full: 999px;

  /* Spacing */
  --spaceing-0: 0;
  --spaceing-025: 2px;
  --spaceing-050: 4px;
  --spaceing-075: 6px;
  --spaceing-100: 8px;
  --spaceing-125: 10px;
  --spaceing-150: 12px;
  --spaceing-200: 16px;
  --spaceing-250: 20px;
  --spaceing-300: 24px;
  --spaceing-400: 32px;
  --spaceing-500: 40px;
  --spaceing-600: 48px;
  --spaceing-800: 64px;
  --spaceing-1000: 80px;
 

  /* Typography */
  --font-size-display-lg: 3.5rem;
  --font-size-display-md: 3rem;
  --font-size-display-sm: 2.5rem;

  --font-size-heading-lg: 2rem;
  --font-size-heading-md: 1.5rem;
  --font-size-heading-sm: 1.25rem;

  --font-size-body-lg: 1.125rem;
  --font-size-body-md: 1rem;
  --font-size-body-sm: 0.875rem;

  --font-size-caption: 0.75rem;
  --font-weight-regular: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;

  /* Other */
  --color-transparent: transparent;


  }

  /* Box sizing fix for all elements */
  *, *::before, *::after {
    box-sizing: border-box;
  }

  /* Reset margin & padding, improve text rendering */
  body, h1, h2, h3, h4, h5, h6, p, ul, ol, figure, blockquote, dl, dd {
    margin: 0;
    padding: 0;
    font-weight: normal;
   /*  font-family: "Nunito", sans-serif; */
  }

  html {
    font-size: 62.5%; /* 1rem = 10px */
     font-family:'Segoe UI', sans-serif;
    scroll-behavior: smooth;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    @media  (max-width:780px) {
      font-size: 55%;
    }
    
  }

  body {
   
    line-height: 1.6;
    min-height: 100vh;
  }

  img, picture, video, canvas, svg {
    display: block;
    max-width: 100%;
    height: auto;
  }

  input, button, textarea, select {
    font: inherit;
    
    
  }

input{
  font-family: inherit;
    font-weight:200;
    border: 1px solid #00000033;
    border-radius: 5px;
    
}

  textarea {
    border: 1px solid #00000033;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button {
    cursor: pointer;
    border: none;
    background: none;
  }

  /* Remove list styles */
  ul, ol {
    list-style: none;
  }



`;

export const text_1 = css`
  font-size: 52px;
  line-height: 140%;
  letter-spacing: -2px;
  font-weight: bold;
`;
export const text_1_mobile = css`
  font-size: 48px;
  line-height: 120%;
  letter-spacing: -2px;
`;

export const text_2 = css`
  font-size: 40px;
  line-height: 120%;
  letter-spacing: -0.3px;
  font-weight: bold;
`;

export const text_2_mobile = css`
  font-size: 32px;
  line-height: 120%;
  letter-spacing: -0.3px;
  font-weight: bold;
`;

export const text_3 = css`
  font-size: 32px;
  line-height: 140%;
  letter-spacing: -0.3px;
  font-weight: bold;
`;

export const text_3_mobile = css`
  font-size: 28px;
  line-height: 130%;
  letter-spacing: -0.3px;
  font-weight: bold;
`;

export const text_4 = css`
  font-size: 24px;
  line-height: 140%;
  letter-spacing: 0px;
  font-weight: 600;
`;

export const text_4_regular = css`
  font-size: 24px;
  line-height: 140%;
  letter-spacing: 0px;
  font-weight: 400;
`;

export const text_5 = css`
  font-size: 20px;
  line-height: 140%;
  letter-spacing: 0px;
  font-weight: 600;
`;

export const text_6 = css`
  font-size: 18px;
  line-height: 120%;
  letter-spacing: 0px;
  font-weight: 500;
`;

export const text_6_italic = css`
  font-size: 18px;
  line-height: 130%;
  letter-spacing: 0px;
  font-weight: 500;
  font-style: italic;
`;

export const text_6_regular = css`
  font-size: 18px;
  line-height: 140%;
  letter-spacing: -0.3px;
  font-weight: 400;
`;

export const text_7 = css`
  font-size: 15px;
  line-height: 100%;
  letter-spacing: 0px;
  font-weight: 400;
`;

export const text_8 = css`
  font-size: 13px;
  line-height: 100%;
  letter-spacing: 0px;
  font-weight: 600;
`;

export const text_9 = css`
  font-size: 12px;
  line-height: 110%;
  letter-spacing: 0px;
  font-weight: 400;
`;

export const flex = (direction = "column") => css`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: ${direction};
`;
export default GlobalStyles;
