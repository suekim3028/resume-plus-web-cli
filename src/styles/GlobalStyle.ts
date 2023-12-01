import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  html, body, div, span, applet, object, iframe,
    h1, h2, h3, h4, h5, h6, p, blockquote, pre,
    a, abbr, acronym, address, big, cite, code,
    del, dfn, em, img, ins, kbd, q, s, samp,
    small, strike, strong, sub, sup, tt, var,
    b, u, i, center,
    dl, dt, dd, ol, ul, li,
    fieldset, form, label, legend,
    table, caption, tbody, tfoot, thead, tr, th, td,
    article, aside, canvas, details, embed,
    figure, figcaption, footer, header, hgroup,
    menu, nav, output, ruby, section, summary,
    time, mark, audio, video {
        border: 0;
        font-size: 100%;
        font: inherit;
        vertical-align: baseline;
        padding:0;
    }

    html{
        background-color: white;
        overflow: hidden;
        
    }

    /* HTML5 display-role reset for older browsers */
    article, aside, details, figcaption, figure,
    footer, header, hgroup, menu, nav, section {
        display: block;
    }

    body {
        line-height: 1;
        margin: 0 auto;
        width: 100%;
        background-color: #ffffff;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

  @font-face {
        font-family: Pretendard;
        font-weight: 800;
        src: url('/fonts/Pretendard-Black.otf') format('otf');
        src: url('/fonts/Pretendard-Black.woff') format('woff');
        src: url('/fonts/Pretendard-Black.woff2') format('woff2');
    }

    @font-face {
        font-family: Pretendard;
        font-weight: 700;
        src: url('/fonts/Pretendard-Bold.otf') format('otf');
        src: url('/fonts/Pretendard-Bold.woff') format('woff');
        src: url('/fonts/Pretendard-Bold.woff2') format('woff2');
    }

    @font-face {
        font-family: Pretendard;
        font-weight: 600;
        src: url('/fonts/Pretendard-SemiBold.otf') format('otf');
        src: url('/fonts/Pretendard-SemiBold.woff') format('woff');
        src: url('/fonts/Pretendard-SemiBold.woff2') format('woff2');
    }

    @font-face {
        font-family: Pretendard;
        font-weight: 500;
        src: url('/fonts/Pretendard-Regular.otf') format('otf');
        src: url('/fonts/Pretendard-Regular.woff') format('woff');
        src: url('/fonts/Pretendard-Regular.woff2') format('woff2');
    }

    @font-face {
        font-family: Pretendard;
        font-weight: 400;
        src: url('/fonts/Pretendard-Medium.otf') format('otf');
        src: url('/fonts/Pretendard-Medium.woff') format('woff');
        src: url('/fonts/Pretendard-Medium.woff2') format('woff2');
    }
    * {
        box-sizing: border-box;
        font-family:  Pretendard !important;
        letter-spacing: -0.5px;
        font-feature-settings: 'pnum' on, 'lnum' on;
        line-height: 30%;
        -webkit-tap-highlight-color: transparent;
    }

`;

export default GlobalStyle;
