import React from "react";
import styled from "@emotion/styled";

/*

.centered-container {
    width: 100%;
    text-align: center;
}

.inline-element {
    display: inline-block;
}


*/

const ButtonGroup = styled.div`
    width: 100%;
    text-align: center;
`;

const SingleButton = styled.div`
    display: inline-block;
`;

const Button = ({ addNode, onUpdateColor, removeNode }) => {
    return (
        <ButtonGroup>
            <SingleButton>
                <button type="button" onClick={addNode}>
                    Add Node
                </button>
            </SingleButton>
            <SingleButton>
                <button type="button" onClick={onUpdateColor}>
                    Update node color
                </button>
            </SingleButton>
            <SingleButton onClick={removeNode}>
                <button type="button">Remove Node</button>
            </SingleButton>
        </ButtonGroup>
    );
};

export default Button;
