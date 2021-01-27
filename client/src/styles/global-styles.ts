import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export const GlobalStyle = createGlobalStyle`
  ${reset};
  body {
    margin: 0;
    padding: 0;
    font-family: 'Nanum Gothic', sans-serif;
    overflow-x: hidden;
    /* 영문 'Montserrat', sans-serif; 국문 'Nanum Gothic', sans-serif; */
  };

  * {
    box-sizing: border-box;
  };

`;
export const detailTheme = {};
