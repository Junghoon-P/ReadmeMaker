import styled from '@emotion/styled';
import React from 'react';

interface FilterButtonProps {
  data: string;
  isSelected: boolean;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}
const FilterButton = ({ data, isSelected, onClick }: FilterButtonProps): JSX.Element => {
  return (
    <Button isSelected={isSelected} onClick={onClick}>
      {data}
    </Button>
  );
};

const Button = styled.button<{ isSelected: boolean }>`
  padding: 6px 10px;
  border-radius: 6px;
  font-size: 13px;
  color: ${({ isSelected }) => (isSelected ? '#000' : '#fff')};
  background-color: ${({ isSelected }) => (isSelected ? '#F5FF80' : '#2C3037')};
`;

export default FilterButton;
