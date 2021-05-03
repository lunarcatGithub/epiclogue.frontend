import React, { useState, useEffect } from 'react';
import styled,{css} from 'styled-components';

//component
import {AdminConfirmEmail} from './Admin_Confirm_EmailForm';
import {ConfirmReportPopup} from './Admin_Confirm_Report';
import {AdminConfirmInform} from './Admin_Confirm_Inform';
import {AdminConfirmTurnBack} from './Admin_Confirm_TurnBack'
// utils

// hook
import { useToggle } from '@hooks/useToggle';

export function AdminConfirmPopup(props) {
    const {mainType, type, dataHandler, reportList, closePopup, listData} = props

    const [headerTitle, setHeaderTitle] = useState({});
    const [dataOnChange, dataOnChangeHandler] = useState('스팸성');
    const [userInform, setUserInform] = useState('');
    const [dataSendComponent, setDataSendComponent] = useState();
    console.log('mainType', mainType);
    console.log('type', type);

    // 탭 스타일용
    const [isTab, setIsTab] = useState(1)

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
            case 'Restore':
                setHeaderTitle({title:'콘텐츠 복구'});
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


    useEffect(() => {
      if(type === 'Remove' || type === 'Restore'){
        setDataSendComponent(<AdminConfirmInform type={type} reportList={reportList}/>)
      } else if(type === 'Suspension' || type === 'Withdrawal'){
        setDataSendComponent(<AdminConfirmEmail listData={listData} mainType={mainType} />)
      } else if(type === 'TurnBack'){
        setDataSendComponent(<AdminConfirmTurnBack/>)
      };
    }, [type])

    const popupTab = [
      {id:1, value:1, name:'신고정보'},
      {id:2, value:2, name: type === 'Restore' ? '복구하기' : '제재하기'}
  ]
  return (
    <ConfirmLayout>
      <ConfirmInner>
          {/* 상단 title */}
        <ConfirmDivHeader>
            { headerTitle.title }
        </ConfirmDivHeader>
          {/* 내용 desc */}
        <ConfirmDivBody>
            <ConfirmDivBodyInner>
                {/* 탭 부문 */}
            <PopupTabWrap>
              { popupTab.map( items => (
                <PopupTab 
                key={items.id} 
                onClick={() => setIsTab(items.value)} 
                isSelect={isTab}
                styling={items.value === isTab}
                >{items.name}
                </PopupTab>
              ) ) }
            </PopupTabWrap>
            { isTab === 1 ? 
              <ConfirmInBody>
                  <BlockWrap>
                      <TextBlock>콘텐츠 정보</TextBlock>
                      <InformBox>{listData?.title}</InformBox>
                  </BlockWrap>
                  {/* 콘텐츠 업로드 유저 */}
                  <BlockWrap>
                  <TextBlock>신고 받은 유저</TextBlock>
                      <InformBox>{listData?._id}</InformBox>
                  </BlockWrap>
                  <BlockWrap>
                    <ConfirmReportPopup />
                  </BlockWrap>
              </ConfirmInBody>
              :
              <FormWrap>
                {dataSendComponent}
              </FormWrap> }
            </ConfirmDivBodyInner>
        </ConfirmDivBody>
        {/* 하단 title */}
        { 
          isTab === 2 &&
          <ConfirmDivBottom>
              <ConfirmBtn type="confirm">최종확인</ConfirmBtn>
              <ConfirmBtn type="cancel" onClick={()=>closePopup(false)}>취소</ConfirmBtn>
          </ConfirmDivBottom>
        }
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
padding:0.8em 1em;
color:${(props) => props.theme.color.blackColor};
font-weight:${(props) => props.theme.fontWeight.font700};
font-size:${(props) => props.theme.fontSize.font18};
background: ${(props) => props.theme.color.whiteColor};
`
// 팝업 body
const ConfirmDivBody = styled(ConfirmDivHeader)`
`
const ConfirmDivBodyInner = styled.div`
position:relative;
display:flex;
flex-direction:column;
width:100%;
margin: 0.2em 0;
`
const ConfirmInBody = styled.div`
display:flex;
flex-direction:column;
width:100%;
padding: 2em 0;
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

const TextBlock = styled.span`
display:flex;
${TextSize15};
margin-bottom:0.7em;
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
