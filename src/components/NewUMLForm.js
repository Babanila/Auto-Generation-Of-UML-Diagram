import React from "react";
import styled from "@emotion/styled";

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  background-color: lightgray;
  color: black;
`;

const TitleDiv = styled.div`
  height: 4em;
  margin: 0;
  text-align: center;
`;

const TitleP1 = styled.h2`
  margin-top: 0.5em;
`;

const TitleP2 = styled.p`
  margin-top: -1em;
`;

const P = styled.p`
  width: 80%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-self: center;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
`;

const Label = styled.label`
  align-self: center;
  font-size: 1rem;
  font-weight: 900;
`;

const Input = styled.input`
  align-self: center;
  text-align: center;
  padding: 5px 5px;
  outline: none;
  background-color: #ffffff;
  color: #000000;
  font-size: 1rem;
`;

const Button = styled.button`
  background-color: #006400;
  font-size: 1rem;
  align-self: center;
  border-radius: 4px;
  padding: 10px;
  color: #ffffff;
  margin-bottom: 0.5rem;
  &:hover {
    cursor: pointer;
    background-color: #003399;
  }
`;

const NewUML = props => {
  const { value, onChange, onSubmit } = props;
  const { key, id, name, description, gender, age, from, to } = value;
  return (
    <Form onSubmit={onSubmit}>
      <TitleDiv>
        <TitleP1>New Node</TitleP1>
        <TitleP2>Please enter details below</TitleP2>
      </TitleDiv>
      <P>
        <Label>Key </Label>
        <Input name="key" value={key} onChange={onChange} />
      </P>
      <P>
        <Label>Id </Label>
        <Input name="id" value={id} onChange={onChange} />
      </P>
      <P>
        <Label>Name </Label>
        <Input name="name" value={name} onChange={onChange} />
      </P>
      <P>
        <Label>Descrp. </Label>
        <Input name="description" value={description} onChange={onChange} />
      </P>
      <P>
        <Label>Gender </Label>
        <Input name="gender" value={gender} onChange={onChange} />
      </P>
      <P>
        <Label>Age </Label>
        <Input name="age" value={age} onChange={onChange} />
      </P>
      <P>
        <Label>From </Label>
        <Input name="from" value={from} onChange={onChange} />
      </P>
      <P>
        <Label>To </Label>
        <Input name="to" value={to} onChange={onChange} />
      </P>
      <Button type="submit">Submit</Button>
    </Form>
  );
};

export default NewUML;
