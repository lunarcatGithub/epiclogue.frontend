import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

export default function Dropdown({ data, type }) {
  const [dropOn, setDropOn] = useState(false);
  const [title, setTitle] = useState();

  useEffect(() => {
    setTitle(data[0]?.title);
  }, [data]);

  return (
    <AllLayout>
      <ButtonLayout onClick={() => setDropOn(!dropOn)} styling={dropOn}>
        {title}
      </ButtonLayout>
      {dropOn && (
        <ContentsLayout>
          {data?.map(({ title, value }, i) => (
            <ContentBlock
              key={i}
              onClick={() => {
                setTitle(title);
              }}
            >
              {title}
            </ContentBlock>
          ))}
        </ContentsLayout>
      )}
    </AllLayout>
  );
}
const AllLayout = styled.div`
  position: relative;
  display: inline-block;
  width: auto;
`;
const ButtonLayout = styled.button`
  position: relative;
  padding: 0.4em 2.2em 0.4em 0.6em;
  border: 1px solid ${(props) => props.theme.adminColor.replyOrange};
  color: ${(props) => props.theme.adminColor.replyOrange};
  border-radius: 0.4em;
  cursor: pointer;
  &::after {
    content: '';
    display: block;
    position: absolute;
    top: ${(props) => (props.styling ? 0.8 : 1)}em;
    right: 0.8em;
    width: 0.4em;
    height: 0.4em;
    border-top: 1px solid ${(props) => (props.styling ? props.theme.adminColor.replyOrange : props.theme.adminColor.soSoGrayColor)};
    border-right: 1px solid ${(props) => (props.styling ? props.theme.adminColor.replyOrange : props.theme.adminColor.soSoGrayColor)};
    transform: rotate(${(props) => (props.styling ? `135deg` : `-45deg`)});
    transition: all 0.2s ease;
  }
`;

const ContentsLayout = styled.div`
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  background: ${(props) => props.theme.adminColor.hoverColor};
  border-radius: 0.4em;
  overflow: hidden;
`;

const ContentBlock = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  white-space: nowrap;
  width: 100%;
  height: 100%;
  background: ${(props) => props.theme.adminColor.whiteColor};
  color: ${(props) => props.theme.color.blackColor};
  font-weight: ${(props) => props.theme.fontWeight.font300};
  font-size: ${(props) => props.theme.fontSize.font14};
  padding: 0.6em 2.4em;
  margin-bottom: 0.1em;
  cursor: pointer;
  &:hover {
    background: ${(props) => props.theme.adminColor.semiOrangeColor};
  }
`;
