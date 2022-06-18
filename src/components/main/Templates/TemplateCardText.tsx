import styled from '@emotion/styled';
import React from 'react';
import Tag from './Tag';
import CartIcon from 'assets/CartIcon';
import HeartIcon from 'assets/HeartIcon';

const TemplateCardText = () => {
  return (
    <Container>
      <article>
        <Title>Content</Title>
        <SubTitle>SubTitle</SubTitle>
        <Tag />
        <TemplateInfo>새로운 템플릿을 확인하세요.</TemplateInfo>
      </article>
      <IconWrapper>
        <HeartIcon />
        <CartIcon />
      </IconWrapper>
    </Container>
  );
};

const Container = styled.section`
  display: flex;
  min-width: 480px;
  min-height: 320px;
  flex-direction: column;
  justify-content: space-between;
  margin-right: 40px;
`;

const Title = styled.h2`
  font-size: 40px;
  line-height: 49px;
  font-weight: 800;
  color: #fff;
  margin-bottom: 10px;
`;

const SubTitle = styled.h3`
  font-size: 16px;
  color: #fff;
  margin-bottom: 20px;
`;

const TemplateInfo = styled.p`
  position: relative;
  color: #fff;
  margin-top: 60px;

  ::before {
    content: '';
    position: absolute;
    top: -30px;
    height: 3px;
    width: 100%;
    background-color: #1b2027;
  }
`;

const IconWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 20px;
`;

export default TemplateCardText;
