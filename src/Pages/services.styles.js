import styled from "styled-components";
import { flex } from "../styles/GlobalStyles";

export const StyledMainCategories = styled.ul`
  ${flex("row")}
  gap: 3rem;
  margin-top: 4rem;
  .categories {
    display: grid;
    grid-template-rows: 60px 30px 150px 30px;

    p {
      font-size: 18px;
      justify-self: center;

      button {
        font-size: 12px;
        background-color: var(--green-500);
        color: var(--neutral-0);
        display: block;
      }
    }

    span {
      font-size: 12px;
      strong {
        color: #4e7de2ff;
      }
    }

    .del-btn {
      background-color: var(--red-700);
      color: var(--neutral-0);
      justify-self: center;
      padding: 0 2rem;
      &:disabled {
        opacity: 0.5;
      }
    }
  }
  .editCategories {
    ${flex("column")}
    height: 280px;
    justify-content: space-between;
    form {
      ${flex("row")}
      gap: 1rem;
    }
    .back-btn {
      background-color: var(--indigo-200);
      color: var(--neutral-0);
      align-self: end;
    }
    button {
      font-size: 12px;
      background-color: var(--green-500);
      color: var(--neutral-0);
      display: block;
    }
  }
  img {
    width: 100px;
  }
`;

export const StyledEditMainCategories = styled.li``;
