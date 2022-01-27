import { createGlobalStyle, ThemeProvider } from "styled-components";
import Router from "./Router";
import { ReactQueryDevtools } from "react-query/devtools";
import { darkTheme, lightTheme } from "./theme";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "./atoms";

const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400&display=swap');
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, menu, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
main, menu, nav, output, ruby, section, summary,
time, mark, audio, video, button {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, main, menu, nav, section {
  display: block;
}
/* HTML5 hidden-attribute fix for newer browsers */
*[hidden] {
    display: none;
}
body {
  line-height: 1;
}
menu, ol, ul {
  list-style: none;
}
blockquote, q {
  quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
  content: '';
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
* {
  box-sizing: border-box;
}
body {
  font-weight: 300;
  font-family: 'Source Sans Pro', sans-serif;
  background-color:${(props) => props.theme.bgColor};
  color:${(props) => props.theme.textColor};
  line-height: 1.2;
}
a {
  text-decoration:none;
  color:inherit;
}
`;
function App() {
  const isDark = useRecoilValue(isDarkAtom);
  return (
    <>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <GlobalStyle />
        <Router />
        <ReactQueryDevtools initialIsOpen={true} />
      </ThemeProvider>
    </>
  );
}

export default App;

// import styled from "styled-components";

// function App() {
//   const Container = styled.div`
//     background-color: ${(props) => props.theme.bgColor};
//   `;

//   const H2 = styled.h2`
//     color: ${(props) => props.theme.textColor};
//   `;

//   return (
//     <div>
//       <Container>
//         <H2>hi</H2>
//       </Container>
//     </div>
//   );
// }

//--------------------

// import React, { useState } from "react";
// function App() {
//   const [username, setUsername] = useState("");

//   const onChange = (event: React.FormEvent<HTMLInputElement>) => {
//     // setValue(event.currentTarget.value);
//     const {
//       currentTarget: { value },
//     } = event;
//     setUsername(value);
//   };

//   const abc = (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     console.log(`hello ${username}`);
//   };

//   return (
//     <div>
//       <form onSubmit={abc}>
//         <input
//           value={username}
//           type="text"
//           onChange={onChange}
//           placeholder="hello"
//         />
//         <button>login</button>
//       </form>
//     </div>
//   );
// }

// --------

//
// import Circle from "./Circle";

// function App() {
//   return (
//     <div>
//       <Circle bgColor="teal" />
//       <Circle bgColor="tomato" borderColor="black" />
//     </div>
//   );
// }

// ---------------------

// const Father = styled.div`
//   display: flex;
// `;

// const Box = styled.div`
//   background-color: ${(props) => props.bgColor};
//   width: 100px;
//   height: 100px;
// `;

// const Circle = styled(Box)`
//   border-radius: 50px;
// `;

// function App() {
//   return (
//     <Father>
//       <Box bgColor="teal" />
//       <Circle bgColor="tomato" />
//     </Father>
//   );
// }
