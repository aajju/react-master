import styled from "styled-components";

interface CircleProp {
  bgColor: string;
  borderColor?: string;
}

const Container = styled.div<CircleProp>`
  width: 200px;
  height: 200px;
  background-color: ${(props) => props.bgColor};
  border-radius: 100px;
  border: 3px solid ${(props) => props.borderColor};
`;

function Circle({ bgColor, borderColor = "pink" }: CircleProp) {
  return <Container bgColor={bgColor} borderColor={borderColor} />;
}

export default Circle;
