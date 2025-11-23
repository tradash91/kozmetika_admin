import styled from "styled-components";

export const StyledModal = styled.div`
  position: fixed;
  background-color: red;
  width: 300px;
  height: 100px;
  left: 50%;
  transform: translateX(-50%);
  top: 20%;
`;

function Modal({ onSubmit, setInputData }) {
  return (
    <StyledModal onSubmit={onSubmit}>
      <form>
        <label htmlFor="editData">Szerkesztés</label>
        <input
          onChange={(e) => {
            setInputData(e.target.value);
          }}
          type="text"
          id="editData"
        />
        <button type="submit">Szerkeszt</button>
      </form>
    </StyledModal>
  );
}

export default Modal;
