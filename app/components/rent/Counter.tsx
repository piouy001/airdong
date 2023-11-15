import styled from "@emotion/styled";
import { Typography } from "@mui/material";
import React, { useCallback } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

import Transitions from "styles/transitions";

interface Props {
  name: string;
  title: string;
  subtitle: string;
  value: number;
  onChange: (name: string, value: any) => void;
}

const Counter = ({ name, title, subtitle, value, onChange }: Props): React.ReactNode => {
  const onAdd = useCallback(() => {
    onChange(name, value + 1);
  }, [onChange, value, name]);

  const onReduce = useCallback(() => {
    if (+value === 1) return;
    onChange(name, value - 1);
  }, [onChange, value, name]);

  return (
    <Container>
      <Labels>
        <Label variant="h6">{title}</Label>
        <Label variant="subtitle1" color="text.secondary">
          {subtitle}
        </Label>
      </Labels>
      <CounterBox>
        <CounterItem onClick={onReduce}>
          <AiOutlineMinus />
        </CounterItem>
        <CounterValue variant="h5">{value}</CounterValue>
        <CounterItem onClick={onAdd}>
          <AiOutlinePlus />
        </CounterItem>
      </CounterBox>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-block: 24px;
`;
const Labels = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;
const Label = styled(Typography)``;
const CounterBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 4px;
`;
const CounterItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 36px;
  border: 1px solid ${({ theme }) => theme.palette.text.secondary};
  color: ${({ theme }) => theme.palette.text.secondary};
  transition: opacity ${Transitions.Primary};
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;
const CounterValue = styled(Typography)`
  min-width: 20px;
  margin-inline: 8px;
  color: ${({ theme }) => theme.palette.text.secondary};
  text-align: center;
`;

export default Counter;
