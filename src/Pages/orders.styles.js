import styled from "styled-components";
import { flex } from "../styles/GlobalStyles";
import { style } from "motion/react-client";



export const StyledOrder = styled.div`
cursor: pointer;
font-size: 14px;
border-bottom: 1px solid #000;
position: relative;
padding: 1rem;

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

export const StyledOrdersWrapper = styled.main`
padding: 5rem;

div {
    padding-top: 1rem;
    h1 {
        text-align: center;
    }
}
`

export const StyledPagination = styled.nav`
${flex('row')}
align-items: center;
font-size: 16px;
width: 100%;
gap: 1rem;
padding: 3rem;

`