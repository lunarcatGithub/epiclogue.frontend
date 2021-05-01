import React from 'react';
import styled from 'styled-components';

// 컴포넌트 import
import ErrorLanguage from './Error.Language';

// hooks&reducer
import { useUrlMove } from '@hooks/useUrlMove';

export default function ErrorDesc({ type }) {
    const [goURL] = useUrlMove();

  //언어 변수
    const {_errorTitle, _serverErrorTitle} = ErrorLanguage();
    return (
        <Layout>
            <LayoutInner>
                <ErrorText>{type === 'server' ? _serverErrorTitle : _errorTitle}</ErrorText>
                <GoBackBtn onClick={() => goURL({pathname:'/'})}>Back</GoBackBtn>
            </LayoutInner>
        </Layout>
    );
}

const Layout = styled.article`
    display: flex;
    width: 100%;
    height: 100%;
`;

const LayoutInner = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    margin-top: 5%;
`;

const ErrorText = styled.span`
    color: ${(props) => props.theme.color.blackColor};
    font-size: ${(props) => props.theme.fontSize.font15};
`

const GoBackBtn = styled.button`
    color: ${(props) => props.theme.color.blackColor};
    font-size: ${(props) => props.theme.fontSize.font15};
    margin-top:1em;
`
