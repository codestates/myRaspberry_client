import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@500&family=Nanum+Gothic:wght@700&display=swap');
  ${reset};
  body {
    margin: 0;
    padding: 0;
    font-family: 'Nanum Gothic', sans-serif;
    overflow-x: hidden;
    /* 영문 'Montserrat', sans-serif; 국문 'Nanum Gothic', sans-serif; */
    /* width: 100%;
    letter-spacing: -0.015em;
    box-sizing: border-box;
    -webkit-text-size-adjust: none;
    text-rendering: optimizeLegibility;
    overflow: auto;
    font-size: 13pt;
    color: #374553;
    word-break: keep-all;
    background:transparent;
    border:0;
    vertical-align:baseline;
    line-height:1; */
  };

  * {
    box-sizing: border-box;
  };

`;
export const detailTheme = {};
