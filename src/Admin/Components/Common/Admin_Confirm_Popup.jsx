import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';

//component
import {AdminConfirmEmail} from './Admin_Confirm_EmailForm';
import {AdminConfirmInform} from './Admin_Confirm_Inform';
import {AdminConfirmTurnBack} from './Admin_Confirm_TurnBack'
import AdminPopupReportForm from './Admin_Popup_Report_Form';
import AdminPopupCopyrightForm from './Admin_Popup_Copyright_Form';

// utils

// hook
import useAxiosFetch from '@hooks/useAxiosFetch';

// reduce 
import { AdminContext } from '../Store/Admin_Context';

export function AdminConfirmPopup(props) {
  const { currentData } = useContext(AdminContext);

  const {
      mainType,
      type,
      dataHandler,
      reportList,
      setWarnConfirm,
      listData,
      dangerConfirm,
    } = props;

    const [ , reportApi, reportError, reportFetch] = useAxiosFetch();
    
    const [headerTitle, setHeaderTitle] = useState({});
    const [dataOnChange, dataOnChangeHandler] = useState('스팸성');
    const [userInform, setUserInform] = useState('');
    const [dataSendComponent, setDataSendComponent] = useState();
    const [firstTabComponent, setFirstTabComponent] = useState();
    
    // contents type
    const [currentType, setCurrentType] = useState();

    // type button
    const [decision, setDecision] = useState([]);

    // 탭 스타일용
    const [isTab, setIsTab] = useState(1)

    const reportFetchHandler = () => {
      const params = {
        contentId:currentData?._id,
        contentType:currentData?._contentType,
        isCopyright:false
      }

      if(mainType === 'COPYRIGHT') { // mainType이 copyright일 경우
        params.isCopyright = true
      }

      const URL = `${process.env.NEXT_PUBLIC_API_URL}/report/submittedReports`;
      reportFetch(URL, 'get', null, null, params);
    }

    const deviedHandler = () => {
        let _type,
            postType = '댓글';

            switch (currentType) {
            case 'Suspension':
                setHeaderTitle({title:'유저 정지'})
                _type = '정지 처리';
                // setEmailDevide(<EmailForm/>)
                break;
            // case 'Hide':
            //     setHeaderTitle({title:'콘텐츠 블라인드'})
            //     _type = '블라인드 처리';
            //     break;
            case 'Remove':
                setHeaderTitle({title:'콘텐츠 삭제'});
                _type = '삭제되';
                break;
            case 'TurnBack':
                setHeaderTitle({title:'신고 반려'});
                _type = '';
                break;
            case 'Leave':
                setHeaderTitle({title:'회원 탈퇴'});
                _type = '회원 탈퇴되';
                break;
            case 'Restore':
                setHeaderTitle({title:'신고 복구'});
                _type = '복구되';
                break;

            default:
                break;
        }
        setUserInform(`해당 게시물 내에서 ${dataOnChange} 내용이 확인되어 ${postType}이 ${_type}었습니다 `)
    }

    useEffect(()=> {
        deviedHandler();
    },[currentType, dataOnChange]);

    useEffect(() => {
      reportFetchHandler();
    }, []);

    useEffect(() => {
      if(currentType === 'Hide' || currentType === 'Remove'){
        setDataSendComponent(<AdminConfirmInform type={type} reportList={reportList}/>)
      } else if(currentType === 'Suspension' || currentType === 'Leave'){
        setDataSendComponent(<AdminConfirmEmail listData={listData} mainType={mainType} />)
      } else if(currentType === 'TurnBack'){
        setDataSendComponent(<AdminConfirmTurnBack/>)
      }
    }, [currentType]);

    useEffect(()=> { // tab 1 form ctrl
      if(mainType === 'REPORT'){
        setFirstTabComponent(<AdminPopupReportForm reportApi={reportApi} />);
      } else if (mainType === 'COPYRIGHT') {
        setFirstTabComponent(<AdminPopupCopyrightForm reportApi={reportApi} />);
      }
    }, [mainType, reportApi])

    const popupTab = [
      {id:1, value:1, name:'신고정보'},
      {id:2, value:2, name: type === 'Restore' ? '복구하기' : '제재하기'}
    ]

    // 신고 or 복구 하기
    useEffect(() => {
      const processingBtn = [
        {title:'삭제', value:'Remove'},
        {title:'정지', value:'Suspension'},
        {title:'탈퇴', value:'Leave'},
        {title:'반려', value:'TurnBack'},
      ];

      const restoreBtn = [
        {title:'복구', value:'Restore'},
      ];

      if(type === 'Restore'){
        setDecision(restoreBtn)
      } else {
        setDecision(processingBtn)
      }
    }, [type]);

    return (
    <ConfirmLayout>
      <ConfirmInner>
          {/* 상단 title */}
        <ConfirmDivHeader>
          { isTab === 2 &&
          <BackBtn 
          onClick={ () => {
            setIsTab(1)
            setCurrentType('')
            } } >Back</BackBtn>
          }
          <HeaderText>{ headerTitle.title }</HeaderText>
        </ConfirmDivHeader>
          {/* 내용 desc */}
        <ConfirmDivBody>
            <ConfirmDivBodyInner>
                { /* 탭 부문 */ }
            <PopupTabWrap>
              { popupTab.map( items => (
                <PopupTab
                  key={items.id} 
                  // onClick={() => setIsTab(items.value)} 
                  isSelect={isTab}
                  styling={items.value === isTab}
                >{items.name}
                </PopupTab>
              ) ) }
            </PopupTabWrap>
            { isTab === 1 ? 
                firstTabComponent
              :
              <FormWrap>
                { dataSendComponent }
              </FormWrap> }
            </ConfirmDivBodyInner>
        </ConfirmDivBody>
        {/* 하단 title */}
        
          <ConfirmDivBottom>
          { 
            isTab === 1 &&
            decision.map( ( { title, value }, index ) => (
              <ConfirmBtn 
              key={index} 
              type={value} 
              onClick={ () => {
                setIsTab(2);
                setCurrentType(value);
              } } >{title}</ConfirmBtn>
            ) )
          }
          { 
            isTab === 2 &&
            <>
              <ConfirmBtn type="confirm" onClick={dangerConfirm} >최종확인</ConfirmBtn>
              {/* <ConfirmBtn type="cancel" onClick={()=>setWarnConfirm({false})}>취소</ConfirmBtn> */}
            </>
          }
          </ConfirmDivBottom>
        
        </ConfirmInner>
    </ConfirmLayout>
  )
}


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
padding:1em 2em;
background: ${(props) => props.theme.color.whiteColor};
align-items: center;

`

// header
const HeaderText = styled.span`
color:${(props) => props.theme.color.blackColor};
font-weight:${(props) => props.theme.fontWeight.font700};
font-size:${(props) => props.theme.fontSize.font18};
`;

// 팝업 body
const ConfirmDivBody = styled.div`
display:flex;
width:100%;
height:100%;
padding:1em 2em;
background: ${(props) => props.theme.color.whiteColor};
`
const ConfirmDivBodyInner = styled.div`
position:relative;
display:flex;
flex-direction:column;
width:100%;
margin: 0.2em 0;
`

// 팝업 body ===> 탭 부문
const PopupTabWrap = styled.span`
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

`

const ConfirmDivBottom = styled(ConfirmDivHeader)`
justify-content:flex-end;
`


// 버튼
const ConfirmBtn = styled.button`
display:flex;
align-items:center;
justify-content:center;
padding:0.4em 0.8em;
margin:0 0.3em;
border-radius:0.4em;
margin-right:${(props) => props.type === 'confirm' && `0.8em`};
background: ${(props) => props.type === 'confirm' ? props.theme.color.pinkColor : props.theme.color.popupColor };
color:${(props) => props.theme.color.whiteColor};
font-weight:${(props) => props.theme.fontWeight.font700};
font-size:${(props) => props.theme.fontSize.font15};
cursor:pointer;
`;

const BackBtn = styled.button`
width:30px;
height:30px;
border-radius:50%;
background:#999;
`;
