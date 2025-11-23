import styled from "styled-components";
import { flex } from "../styles/GlobalStyles";

export const StyledCreateMainCategory = styled.form`
  ${flex("column")}
  gap: 2rem;
  button {
    background-color: var(--green-500);
    font-size: 16px;
    padding: 1rem 2rem;
    color: var(--neutral-0);
    font-weight: 600;
    &:disabled {
      opacity: 0.5;
    }
  }
`;

export const StyledCreateSubCategory = styled.form`
  display: grid;
  row-gap: 4rem;
  input {
    width: 100%;
    font: inherit;
  }
  textarea {
    width: 500px;
    height: 300px;
    resize: none;
  }
  .description,
  .duration,
  .price {
    ${flex("column")}
  }
  label {
    font-size: 20px;
    font-weight: 500;
    align-self: flex-start;
  }
  .details {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    span {
      background-color: var(--green-500);
      cursor: pointer;
      align-self: center;
      justify-self: center;
      padding: 2rem;
      color: var(--neutral-0);
    }
  }

  .sub-btn {
    background-color: var(--green-500);
    justify-self: center;
    color: var(--neutral-0);

    &:disabled {
      opacity: 0.5;
    }
  }
`;

export const StyledEditSubcategories = styled.form`
  ${flex("column")}
  justify-content: stretch;
  align-items: stretch;
  button {
    background-color: var(--green-500);
    color: var(--neutral-0);
  }
  .close-btn {
    cursor: pointer;
    background-color: var(--blue-200);
    padding: 0.5rem 1rem;
    align-self: end;
    margin-bottom: 1rem;
  }
  .editSteps {
    ${flex("column")}
    justify-content: start;
    align-items: start;
    gap: 1rem;
    textarea {
      width: 100%;
      resize: none;
    }

    span {
      background-color: var(--green-500);
      cursor: pointer;
      align-self: center;
      justify-self: center;
      padding: 2rem;
      color: var(--neutral-0);
    }
  }
`;

export const StyledSubCategories = styled.ul`
  li {
    display: grid;
    grid-template-columns: 1fr 2fr;

    .sub {
      ${flex("column")}
      align-items: start;

      .btn-wrapper {
        ${flex("row")}
        gap: 1rem;
      }
    }

    .edit {
      background-color: var(--green-500);
      color: var(--neutral-0);
    }

    .delete {
      background-color: red;
      color: var(--neutral-0);
    }
    .details {
      span {
        display: block;
      }
    }
  }
`;
