import React, { useState, useEffect } from 'react';
import styled,{css} from 'styled-components';

//component
import {EmailForm} from '../Common/EmailForm_Form';

// utils

// hook
import { useToggle } from '@hooks/useToggle';

export function AdminConfirmPopup(props) {
    const {mainType, type, dataHandler, reportList, closePopup, userData} = props

    const [headerTitle, setHeaderTitle] = useState({});
    const [dataOnChange, dataOnChangeHandler] = useState('스팸성');
    const [selectReport, setSelectReport] = useState();
    const [selectList, toggleSelectList] = useToggle(false);
    const [userInform, setUserInform] = useState('');
    const [emailDevide, setEmailDevide] = useState();

    // 탭 스타일용
    const [isTab, setIsTab] = useState(1)
    console.log(type);

    const deviedHandler = () => {
        let _type,
            postType = '댓글';
            
        switch (type) {
            case 'Suspension':
                setHeaderTitle({title:'유저 정지'})
                _type = '정지 처리';
                // setEmailDevide(<EmailForm/>)
                break;
            case 'Hide':
                setHeaderTitle({title:'콘텐츠 블라인드'})
                _type = '블라인드 처리';
                break;
            case 'Remove':
                setHeaderTitle({title:'콘텐츠 삭제'});
                _type = '삭제되';
                break;

            default:
                break;
        }
        setUserInform(`해당 게시물 내에서 ${dataOnChange} 내용이 확인되어 ${postType}이 ${_type}었습니다 `)
    }

    useEffect(()=> {
        deviedHandler();
    },[type, dataOnChange])
    const popupTab = [
        {id:1, value:1, name:'신고정보'},
        {id:2, value:2, name:'제재하기'}
    ]

    const sampleUser = [
        {id:1, _id:'@adassasdasdasadsaaaf', date:'2020-06-20', report:'혐오'},
        {id:2, _id:'@123ㅁㄴㅊ', date:'2020-06-20', report:'혐오'},
        {id:3, _id:'@124flllv', date:'2020-06-20', report:'그냥'},
        {id:4, _id:'@124flllv', date:'2020-06-20', report:'그냥'},
        {id:5, _id:'@124flllv', date:'2020-06-20', report:'그냥'},
        {id:6, _id:'@124flllv', date:'2020-06-20', report:'그냥'},
        {id:7, _id:'@124flllv', date:'2020-06-20', report:'그냥'},
    ]
    return (
        <ConfirmLayout>
            <ConfirmInner>
                {/* 상단 title */}
                <ConfirmDivHeader>
                    {headerTitle.title}
                </ConfirmDivHeader>
                {/* 내용 desc */}
                <ConfirmDivBody>
                    <ConfirmDivBodyInner>
                        {/* 탭 부문 */}
                    <PopupTabWrap>
                        {
                            popupTab.map( items => (
                            <PopupTab 
                            key={items.id} 
                            onClick={() => setIsTab(items.value)} 
                            isSelect={isTab}
                            styling={items.value === isTab}
                            >{items.name}</PopupTab>
                            ))
                        }
                    </PopupTabWrap>
                    { 
                        isTab === 1 ? 
                        <ConfirmInBody>
                            <BlockWrap>
                                <TextBlock>콘텐츠 정보</TextBlock>
                                <InformBox>{userData?.title}</InformBox>
                            </BlockWrap>
                            {/* 콘텐츠 업로드 유저 */}
                            <BlockWrap>
                            <TextBlock>신고 받은 유저</TextBlock>
                                <InformBox>{userData?._id}</InformBox>
                            </BlockWrap>
                            <BlockWrap>
                            <TextBlock>신고 한 유저</TextBlock>
                                <ReportUserBox>
                                    <ReportHeader>
                                        <ReportHeaderTab>유저 아이디</ReportHeaderTab>
                                        <ReportHeaderTab>신고 내용</ReportHeaderTab>
                                        <ReportHeaderTab>신고 날짜</ReportHeaderTab>
                                    </ReportHeader>
                                    <ReportBody>
                                        {
                                            sampleUser.map(({id, _id, report, date}) => (
                                                <ReportBodyInner key={id}>
                                                    <ReportBodyDevide type={'id'}>{_id}</ReportBodyDevide>
                                                    <ReportBodyDevide>{report}</ReportBodyDevide>
                                                    <ReportBodyDevide>{date}</ReportBodyDevide>
                                                </ReportBodyInner>
                                            ))
                                        }
                                    </ReportBody>
                                </ReportUserBox>
                            </BlockWrap>

                        </ConfirmInBody>
                        :
                        <FormWrap>
                        { 
                            mainType !== 'COPYRIGHT' ?
                                <>
                                <BlockWrap>
                                    <TextBlock>해당 제재 목록</TextBlock>
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
                                                    onChange={() => dataOnChangeHandler(list.title)}
                                                    onClick={()=>toggleSelectList(!selectList)} 
                                                    />
                                                    <ListRadioCustom/>
                                                </ListTxtBox> ))
                                            }
                                        </Dropdown>
                                    }
                                </BlockWrap>
                                <BlockWrap>
                                <TextBlock>유저 알림 메시지</TextBlock>
                                    <AdminWarnMessage 
                                    value={userInform}
                                    onChange={(e)=>setUserInform(e.target.value)} />
                                </BlockWrap>
                                </>
                                : 
                                <EmailForm 
                                    userData={userData}
                                    mainType={mainType}
                                />
                            }
                            </FormWrap>
                    }
                    
                    </ConfirmDivBodyInner>
                </ConfirmDivBody>
                {/* 하단 title */}
                <ConfirmDivBottom>
                    <ConfirmBtn type="confirm">최종확인</ConfirmBtn>
                    <ConfirmBtn type="cancel" onClick={()=>closePopup(false)}>취소</ConfirmBtn>
                </ConfirmDivBottom>
            </ConfirmInner>
        </ConfirmLayout>
    )
}
const TextSize15 = css`
color:${(props) => props.theme.color.blackColor};
font-weight:${(props) => props.theme.fontWeight.font700};
font-size:${(props) => props.theme.fontSize.font15};
`

const FormWrap = styled.form``

const ConfirmLayout = styled.div`
display: flex;
overflow: hidden;
width: 45em;
height: auto;
border-radius: 0.6em;
background: ${(props) => props.theme.color.hoverColor};
box-shadow: ${(props) => props.theme.boxshadow.popup};
@media (max-width: 900px) {
width: 100%;
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
// 팝업 body
const ConfirmDivBody = styled(ConfirmDivHeader)`
`
const ConfirmDivBodyInner = styled.div`
position:relative;
display:flex;
flex-direction:column;
width:100%;
`
const ConfirmInBody = styled.div`
display:flex;
flex-direction:column;
width:100%;
`

// 팝업 body ===> 탭 부문
const PopupTabWrap = styled.div`
display:flex;
width:100%;
margin-bottom:0.8em;
`
const PopupTab = styled.button`
display:flex;
justify-content:center;
align-items:center;
width:100%;
padding:0.5em 0;
color:${props => props.styling ? props.theme.color.orangeColor : props.theme.color.blackColor};
font-weight:${(props) => props.theme.fontWeight.font700};
font-size:${(props) => props.theme.fontSize.font16};
border-bottom: 2px solid ${props => props.styling ? props.theme.color.orangeColor : props.theme.color.hoverColor};
cursor:pointer;

&:hover {
    background: ${props => props.theme.color.microOrangeColor};
}
`

const ConfirmDivBottom = styled(ConfirmDivHeader)`
justify-content:flex-end;
`

//block wrap
const BlockWrap = styled.div`
margin-bottom:0.8em;
`

// 상단 유저 정보
const InformBox = styled.span`
display:flex;
width:100%;
height:auto;
max-height:5em;
overflow-y:hidden;
overflow-y:scroll;
border: 1px solid #999;
border-radius:0.3em;
padding:0.8em 0.5em;
${TextSize15};
font-weight:${(props) => props.theme.fontWeight.font500};

`

// 신고한 유저 목록용
const ReportUserBox = styled(InformBox)`
position: relative;
display:flex;
flex-direction:column;
min-height:5em;
max-height:15em;
`
const ReportHeader = styled.div`
position:absolute;
top:0;
left:0;
display:flex;
width:100%;
height:2em;
`
const ReportHeaderTab = styled.div`
display:flex;
flex-wrap:nowrap;
width:100%;
justify-content:center;
align-items:center;
${TextSize15};
`
const ReportBody = styled.div`
display:flex;
flex-direction:column;
width:100%;
padding-top:1.5em;
`
const ReportBodyInner = styled(ReportBody)`
display:flex;
flex-direction:row;
padding:0.5em 0;
`
const ReportBodyDevide = styled(ReportHeaderTab)`
font-weight:${(props) => props.theme.fontWeight.font500};

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