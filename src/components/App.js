import React from "react";
import styled from "@emotion/styled";
import Amplify from "aws-amplify";
import aws_config from "../aws-exports";
import UMLDiagram from "./UMLDiagram";

Amplify.configure(aws_config);

const AppStyles = styled.div`
    text-align: center;
    height: 100%;
    display: flex;
    flex-flow: column;
`;

const H1 = styled.h1`
    background-color: #222;
    height: 25px;
    padding: 20px;
    color: white;
    flex: 0 1 auto;
`;

function App() {
    return (
        <AppStyles>
            <H1>UML Generation</H1>
            <UMLDiagram />
        </AppStyles>
    );
}

export default App;
