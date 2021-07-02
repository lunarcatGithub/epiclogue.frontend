import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { useRouter } from 'next/router';

// Hooks&&reducer
import { useUrlMove } from '@hooks/useUrlMove';

export default function HeaderUnauth() {
  // router
  const router = useRouter();
  const [goURL] = useUrlMove();

  return (
    <>
      <LayoutInner>
        <LoginBtn onClick={() => goURL({ pathname: '/login', as: '/login', query: { main: true, path:router?.asPath } })}>Login</LoginBtn>
        <SignUpBtn onClick={() => goURL({ pathname: '/login', as: '/login', query: { sign: true, path:router?.asPath } })}>Sign up</SignUpBtn>
        <Link href={`/mypage/setting`}>
          <NavItem>
            <OptionSetting />
          </NavItem>
        </Link>
      </LayoutInner>
    </>
  );
}

const LayoutInner = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  max-width: 19em;
  height: 100%;
  @media (max-width: 900px) {
    width: auto;
    margin: 0 0.6em;
    max-width: 15em;
  }
`;

const LoginBtn = styled.button`
  padding: 0.5em 1.8em;
  border-radius: 0.4em;
  border: 1px solid ${(props) => props.theme.color.softBlackColor};
  font-size: ${(props) => props.theme.fontSize.font15};
  font-weight: ${(props) => props.theme.fontWeight.font700};
  color: ${(props) => props.theme.color.darkGray};
  user-select: none;
  transition: all 0.3s ease-out;
  white-space: nowrap;
  cursor: pointer;
  &:hover {
    color: ${(props) => props.theme.color.skyColor};
    border: 1px solid ${(props) => props.theme.color.skyColor};
  }
  @media (max-width: 900px) {
    padding: 0.5em 1em;
    font-size: ${(props) => props.theme.fontSize.font14};
    font-weight: ${(props) => props.theme.fontWeight.font700};
  }
`;

const SignUpBtn = styled(LoginBtn)`
  margin-left: 0.2em;
  background: ${(props) => props.theme.color.orangeColor};
  color: ${(props) => props.theme.color.whiteColor};
  border: 1px solid ${(props) => props.theme.color.orangeColor};
  &:hover {
    color: ${(props) => props.theme.color.whiteColor};
    border: 1px solid ${(props) => props.theme.color.softOrangeColor};
    background: ${(props) => props.theme.color.softOrangeColor};
  }
  @media (max-width: 900px) {
    display: none;
  }
`;

// 비회원 세팅
const OptionSetting = styled.button`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: url('/static/set.svg') no-repeat center center / contain;
  width: 2.2em;
  height: 2.2em;
  cursor: pointer;
  @media (max-width: 900px) {
    width: 2em;
    height: 2em;
  }
`;

// NavLink 스타일 ****
const activeClassName = 'nav-item-active';
const NavItem = styled.span.attrs({
  activeClassName,
})`
  position: relative;
  width: 3em;
  height: 3em;
  border-radius: 50%;
  margin: 0 0.8em;
  cursor: pointer;
  &:hover {
    background: ${(props) => props.theme.color.hoverColor};
  }

  @media (max-width: 900px) {
    width: 2.5em;
    height: 2.5em;
    border-radius: 50%;
    margin: 0 0.1em 0 0.6em;
  }

  &.${activeClassName} {
    ${OptionSetting} {
      background-image: url('/static/setOn.svg');
    }
  }
`;
