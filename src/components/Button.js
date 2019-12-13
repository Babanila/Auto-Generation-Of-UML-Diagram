import React from "react";
import styled from "@emotion/styled";

const ButtonGroup = styled.div`
  width: 100%;
  text-align: center;
  margin-bottom: 2em;
`;

const SingleButton = styled.div`
  display: inline-block;
`;

const Button = ({ addNode, removeNode }) => {
  return (
    <ButtonGroup>
      <SingleButton>
        <button type="button" onClick={addNode}>
          Add Node
        </button>
      </SingleButton>
      <SingleButton onClick={removeNode}>
        <button type="button">Remove Node</button>
      </SingleButton>
    </ButtonGroup>
  );
};

export default Button;
