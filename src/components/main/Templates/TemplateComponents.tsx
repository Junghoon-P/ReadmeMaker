import styled from '@emotion/styled';
import React from 'react';
import { useMutation } from 'react-query';
import { useRecoilState } from 'recoil';
import CartIcon from 'assets/CartIcon';
import HeartIconEmpty from 'assets/HeartIconEmpty';
import { cartListState } from 'atoms';
import { Component } from 'types/component';
import { TemplateComponent } from 'types/template';
import { likeComponent } from 'utils/apis';
import { getClient, QueryKeys } from 'utils/queryClient';

interface TemplateComponentsProps {
  item: TemplateComponent;
}

const TemplateComponents = ({ item }: TemplateComponentsProps) => {
  const queryClient = getClient();
  const [cartList, setCartList] = useRecoilState(cartListState);

  const { mutate: like } = useMutation(({ id }: { id: number }) => likeComponent(id), {
    onMutate: async ({ id }) => {
      await queryClient.cancelQueries(QueryKeys.COMPONENTS);
      const prevComponents = queryClient.getQueryData<Component[]>(QueryKeys.COMPONENTS) || [];

      const targetIndex = prevComponents.findIndex(component => component.id === id);
      if (targetIndex === undefined || targetIndex < 0) return prevComponents;

      const newComponents = [...prevComponents];
      const updatedComponentLike = newComponents[targetIndex].like + 1;
      newComponents.splice(targetIndex, 1, {
        ...newComponents[targetIndex],
        like: updatedComponentLike,
      });

      queryClient.setQueryData(QueryKeys.COMPONENTS, newComponents);
      return prevComponents;
    },
    onError: (_, __, context) => {
      queryClient.invalidateQueries(QueryKeys.COMPONENTS);
      if (context) {
        queryClient.setQueryData(QueryKeys.COMPONENTS, context);
      }
    },
  });

  const onClickHeartIcon = () => {
    like({ id: item.id });
  };

  const onClickCartIcon = () => {
    if (cartList.includes(item)) return;

    setCartList([...cartList, item]);
  };

  return (
    <Card>
      <ThumbNailImageWrap>
        <ThumbNailImage src={item.image} alt="" />
      </ThumbNailImageWrap>
      <IconWrapper>
        <span>{item.like}</span>
        <div onClick={onClickHeartIcon}>
          <HeartIconEmpty />
        </div>
        <div onClick={onClickCartIcon}>
          <CartIcon />
        </div>
      </IconWrapper>
    </Card>
  );
};

const Card = styled.div`
  box-sizing: border-box;
  min-width: 188px;
  height: 185px;
  border-radius: 20px;
  border: 1px solid ${({ theme }) => theme.colors.CASUAL_LINE};
  padding: 20px;
`;

const ThumbNailImageWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 70%;
  border-radius: 10px;
  background: ${({ theme }) => theme.colors.CASUAL_FIELD};
`;

const ThumbNailImage = styled.img`
  width: 100%;
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 30%;
  gap: 15px;
`;

export default TemplateComponents;
