import styled from "styled-components";

export const StyledStatusIcon = styled.span`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${({ $color }) => $color};
  display: inline-block;
  margin-left: 10px;
`;

function StatusIcon({ color }) {
  return <StyledStatusIcon $color={color}></StyledStatusIcon>;
}

export default StatusIcon;
