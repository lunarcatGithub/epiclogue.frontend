import React, { useState, useEffect } from 'react';
import styled,{css} from 'styled-components';
// utils

// hook
import { useToggle } from '@hooks/useToggle';

export function AdminConfirmPopup(props) {
    const {type, dataHandler, reportList, closePopup} = props

    const [headerTitle, setHeaderTitle] = useState({});
    const [dataOnChange, dataOnChangeHandler] = useState('스팸성');
    const [selectReport, setSelectReport] = useState();
    const [selectList, toggleSelectList] = useToggle(false);

    const deviedHandler = () => {
        switch (type) {
            case 'Suspension':
                setHeaderTitle({title:'유저 정지'})
                break;
            case 'Hide':
                setHeaderTitle({title:'콘텐츠 블라인드'})
                break;
            case 'Remove':
                setHeaderTitle({title:'콘텐츠 삭제'})
                break;

            default:
                break;
        }
    }

    useEffect(()=> {
        deviedHandler();
    },[type])

    return (
        <>
        <ConfirmLayout>
            <ConfirmInner>
                {/* 상단 title */}
                <ConfirmDivHeader>
                    {headerTitle.title}
                </ConfirmDivHeader>
                {/* 내용 desc */}
                <ConfirmDivBody>
                    <ConfirmDivBodyInner>
                    <BlockWrap>
                    <TextBlock>해당 정보</TextBlock>
                    <InformBox></InformBox>
                    </BlockWrap>
                        <BlockWrap>
                            <TextBlock>해당 신고 목록</TextBlock>
                        <DropdownBtn onClick={()=>toggleSelectList(!selectList)}>{dataOnChange}</DropdownBtn>
                        { 
                        selectList && 
                        <Dropdown>
                            {
                                reportList?.map( list => (
                                <ListTxtBox key={list.id}>
                                    <TextList>{list.title}</TextList>
                                    <ListTxtRadio
                                    readOnly 
                                    value={list.id}
                                    checked={list.title === dataOnChange}
                                    onChange={ e => dataOnChangeHandler(list.title)}
                                    onClick={()=>toggleSelectList(!selectList)} 
                                    />
                                    <ListRadioCustom/>
                                </ListTxtBox> ))
                            }
                        </Dropdown>
                        }
                        </BlockWrap>
                        <BlockWrap>
                            <AdminWarnMessage
                            value={'haha'}
                            />
                        </BlockWrap>
                    </ConfirmDivBodyInner>
                </ConfirmDivBody>
                {/* 하단 title */}
                <ConfirmDivBottom>
                    <ConfirmBtn type="confirm">최종확인</ConfirmBtn>
                    <ConfirmBtn type="cancel" onClick={()=>closePopup(false)}>취소</ConfirmBtn>
                </ConfirmDivBottom>
            </ConfirmInner>
        </ConfirmLayout>
   
        </>
    )
}

const ConfirmLayout = styled.div`
display: flex;
overflow: hidden;
width: 480px;
height: auto;
border-radius: 0.6em;
background: ${(props) => props.theme.color.hoverColor};
box-shadow: ${(props) => props.theme.boxshadow.popup};
@media (max-width: 900px) {
width: 360px;
}
`;
const ConfirmInner = styled.div`
display:flex;
flex-direction: column;
justify-content: space-around;
width:100%;
height:100%;
`

const ConfirmDivHeader = styled.div`
display:flex;
width:100%;
height:100%;
background: ${(props) => props.theme.color.whiteColor};
padding:0.8em 1em;
color:${(props) => props.theme.color.blackColor};
font-weight:${(props) => props.theme.fontWeight.font700};
font-size:${(props) => props.theme.fontSize.font18};
`

const ConfirmDivBody = styled(ConfirmDivHeader)`
`
const ConfirmDivBodyInner = styled.div`
position:relative;
display:flex;
flex-direction:column;
width:100%;
`

const ConfirmDivBottom = styled(ConfirmDivHeader)`
justify-content:flex-end;
`

//block wrap
const BlockWrap = styled.div`
margin-bottom:0.5em;

`
// 상단 유저 정보
const InformBox = styled.span`
display:flex;
width:100%;
height:auto;
max-height:5em;
overflow-x:hidden;
overflow-x:scroll;
border: 1px solid #999;
border-radius:0.3em;
padding:0.8em 0;
`

// hidden contents 영역 - 라디오 버튼
const ListRadioCustom = styled.label`
    position: relative;
    width: 1em;
    height: 1em;
    border-radius: 50%;
    border: 1px solid ${(props) => props.theme.color.hoverColor};
    margin-right: 0.4em;
    cursor:pointer;
    `;

const ListTxtRadio = styled.input.attrs({ type: 'radio' })`
    display: none;
    &:checked + ${ListRadioCustom} {
    border: 1px solid ${(props) => props.theme.color.orangeColor};
    &::before {
    content: '';
    position: absolute;
    top: 1px;
    left: 1px;
    display: inline-block;
    height: 0.8em;
    width: 0.8em;
    border-radius: 50%;
    background: ${(props) => props.theme.color.orangeColor};
    }
    }
`;
const ListTxtBox = styled.label.attrs({})`
    display: flex;
    justify-content: space-between;
    width: 100%;
    border-bottom: 2px solid ${(props) => props.theme.color.hoverColor};
    cursor: pointer;
    padding: 0.5em 0;
    margin-bottom: 4px;
    transition: all 0.2s ease;
    &:hover {
        background: ${(props) => props.theme.color.microOrangeColor};
    }
`;
const TextList = styled.span`
    font-size: ${(props) => props.theme.fontSize.font14};
    font-weight: ${(props) => props.theme.fontWeight.font300};
    color: ${(props) => props.theme.color.blackColor};
    padding: 0 4px;
`;

const TextSize15 = css`
color:${(props) => props.theme.color.blackColor};
font-weight:${(props) => props.theme.fontWeight.font700};
font-size:${(props) => props.theme.fontSize.font15};
`

const TextBlock = styled.span`
display:flex;
${TextSize15};
margin-bottom:0.7em;
`

const DropdownBtn = styled.div`
padding:0.4em 1em;
width:100%;
border:1px solid #999;
border-radius:0.3em;
cursor:pointer;
${TextSize15};
font-weight:${(props) => props.theme.fontWeight.font500};
`

const Dropdown = styled.div`
position:absolute;
display:flex;
flex-direction:column;
width:100%;
height:10em;
overflow-x: scroll;
overflow-x: hidden;
top:7.3em;
left:0;
padding:1em 0.5em;
background:${(props) => props.theme.color.whiteColor};
box-shadow: ${(props) => props.theme.boxshadow.popup};
`

const AdminWarnMessage = styled.textarea`
width:100%;
height:5em;
border:1px solid #999;
border-radius:0.5em;
padding:0.5em;
`

// 버튼
const ConfirmBtn = styled.button`
display:flex;
align-items:center;
justify-content:center;
padding:0.4em 0.8em;
border-radius:0.4em;
margin-right:${(props) => props.type === 'confirm' && `0.8em`};
background: ${(props) => props.type === 'confirm' ? props.theme.color.pinkColor : props.theme.color.popupColor };
color:${(props) => props.theme.color.whiteColor};
font-weight:${(props) => props.theme.fontWeight.font700};
font-size:${(props) => props.theme.fontSize.font15};
cursor:pointer;
`