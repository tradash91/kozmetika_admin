import styled from "styled-components";
import { flex } from "../styles/GlobalStyles";



export const StyledOrder = styled.div`
cursor: pointer;
font-size: 18px;
border-bottom: 1px solid #000;
position: relative;
p {
    span{
        font-weight: 500;
    }
}
`

export const StyledNotificationIcon = styled.div`
background-color: green;
${flex('column')}
position: absolute;
width: 30px;
height: 30px;
right: 40px;
top: 20px;
border-radius: 50%;
color: white;
`