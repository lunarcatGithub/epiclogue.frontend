import React from 'react'
import styled from 'styled-components';
import { useUrlMove } from '@hooks/useUrlMove';

export default function Access() {
  const [goURL] = useUrlMove();

  return (
    <Layout>
      <ContentsLayout>
        <Title>여기서 부터는 관리자 페이지입니다</Title>
        <ButtonInner>
          <GoButtton 
          type='admin'
          onClick={ () => goURL({pathname:'/epicadmin/dashboard/'}) }
          >관리자 페이지로 이동</GoButtton>
          <GoButtton 
          type='user'
          onClick={ () => goURL({ pathname:'/' }) }
          >뒤로가기</GoButtton>
        </ButtonInner>
      </ContentsLayout>
    </Layout>
  )
}

const Layout = styled.div`
display:flex;
flex:1;
`;

const ContentsLayout = styled.div`
display:flex;
width:100%;
height:80vh;
justify-content: center;
align-items:center;
flex-direction:column;
`;

const Title = styled.h2`
margin-bottom:4em;
color: ${props => props.theme.color.blackOpacity};
font-weight: ${(props) => props.theme.fontWeight.font700};
font-size: ${(props) => props.theme.fontSize.font20};

`;

const ButtonInner = styled.div` 

`;

const GoButtton = styled.button`
margin:0 0.7em;
padding:0.5em;
font-size: ${(props) => props.theme.fontSize.font16};
color: ${({type, theme}) => type === 'admin' ? theme.color.pinkColor : theme.color.blackColor};
font-weight: ${(props) => props.theme.fontWeight.font500};
border:1px solid ${({type, theme}) => type === 'admin' ? theme.color.pinkColor : theme.color.blackColor};
border-radius:0.4em;
cursor:pointer;
`;