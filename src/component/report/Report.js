import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';

// 컴포넌트 import

const Report = () => {
  const router = useRouter();

  const [userData, setUserData] = useState({
    name: '',
    company: '',
    contact: '',
    email: '',
    country: '',
  });

  const [originData, setOrignData] = useState([]);
  //침해받은 저작물
  const [infringement, setInfringement] = useState();
  const [originSite, setOriginSite] = useState(2);
  const [originForm, setOriginForm] = useState();
  const [descript, setDescript] = useState('');
  const [agreeCheck, setAgreeCheck] = useState([
    { id: 'private', title: '상기 내용에 대한 정보제공(개인정보, 신고내용)을 동의합니다.', isChecked: false },
    { id: 'swear', title: '본인은 위증을 하지 않았고, 확실한 저작권자이며 상기의 내용은 모두 진실임을 동의합니다.', isChecked: false },
  ]);
  const [signitrue, setSignitrue] = useState();

  const handleChangeValue = (e, type) => {
    const { value } = e.target;
    let arr = [];
    if (type === 'origin') {
      arr.push([...originData, value]);
      setOrignData(arr);
    } else if (type === 'checkBox') {
      let selectArr = agreeCheck;
      selectArr.forEach((list) => {
        if (list.id === e.target.id) {
          list.isChecked = e.target.checked;
        }
      });
      setAgreeCheck(selectArr);
    } else {
      setUserData({ ...userData, [type]: value });
    }
  };

  const reportSubmit = (e) => {
    e.preventDefault();
    let formData = new FormData();
    // formData.append()
    if (agreeCheck[0].isChecked === false && agreeCheck[1].isChecked === false) {
      alert('상기의 내용에 동의하지 않으면 신고하실 수 없습니다');
    }
    alert('아직 개발중입니다. 피드백을 통해 발송해주세요');
  };

  const informArr = [
    { id: 0, title: '이름', name: 'name' },
    { id: 1, title: '회사명', name: 'company' },
    { id: 2, title: '연락처', name: 'contact' },
    { id: 3, title: '이메일', name: 'email' },
    { id: 4, title: '국가', name: 'country' },
  ];

  useEffect(() => {
    let form = [];
    for (let i = 0; i <= originSite; i++) {
      form.push(<TxtInput placeholder={'ex) http://'} onChange={(e) => handleChangeValue(e, 'origin')} />);
    }
    setOriginForm(form);
  }, []);

  return (
    <Layout>
      <LayoutInner>
        <Header>
          <ArrowBtn onClick={() => router.back()} />
        </Header>
        <ReportBox onSubmit={(e) => reportSubmit(e)}>
          {/* 저작권 신고 상단 파트 */}
          <ReportTop>
            <ReportTitle>저작권 신고</ReportTitle>
            <ReportTxt>*신고하기 전에 저작권 정책을 다시 한번 확인해 주세요</ReportTxt>
            <Dummy />

            <ReportSubTitle> 신고자의 정보</ReportSubTitle>
            {informArr.map(({ id, title, name }) => (
              <InputWrap key={id}>
                <ReportTxt>{title}</ReportTxt>
                <TxtInput
                  name={name}
                  onChange={(e) => {
                    handleChangeValue(e, name);
                  }}
                />
              </InputWrap>
            ))}

            {/* // 저작권 신고 상단 파트 끝 */}
          </ReportTop>
          <Dummy />
          {/* 침해받은 저작물 중간 파트 */}
          <ReportMiddle>
            <InputWrap>
              <ReportSubTitle>침해받은 저작물 확인</ReportSubTitle>
              <TxtInput value={infringement} onChange={(e) => setInfringement(e.target.value)} />
            </InputWrap>
            <InputWrap>
              <ReportTxt>회원님의 콘텐츠 원본이 있는 사이트를 아래에 작성해 주세요</ReportTxt>
              {originForm}
            </InputWrap>
            <InputWrap>
              <ReportTxt>기타 원작임을 알 수 있는 내용을 자세하게 작성해주세요</ReportTxt>
              <TextDescript value={descript} onChange={(e) => setDescript(e.target.value)} />
            </InputWrap>
            {/* // 침해받은 저작물 중간 파트 끝 */}
          </ReportMiddle>
          <Dummy />
          {/* 처리방침 및 발송 마지막 파트 */}
          <ReportEnd>
            <InputWrap>
              <ReportSubTitle>저작물 위반에 대한 처리 방침</ReportSubTitle>
              <ReportTxt>저희 에픽로그는 신고가 접수되면 해당 게시물을 일시적으로 블라인드 처리합니다. 이후 신고가 사실일 경우 불법 저작물은 삭제됩니다.</ReportTxt>

              {/* // 처리방침 및 발송 마지막 파트 끝 */}
            </InputWrap>
            <InputWrap>
              <ReportSubTitle>상기 내용에 대한 동의</ReportSubTitle>
              {agreeCheck?.map(({ id, title }) => (
                <AgreeBoxWrap key={id}>
                  <PvAgreeBox id={id} onChange={(e) => handleChangeValue(e, 'checkBox')} />
                  <PvAgreeBoxLabel htmlFor={id}>{title}</PvAgreeBoxLabel>
                </AgreeBoxWrap>
              ))}
            </InputWrap>
            <InputWrap>
              <ReportSubTitle>본인의 성명을 작성해주세요. 전자서명으로 대체합니다.</ReportSubTitle>
              <TxtInput value={signitrue} onChange={(e) => setSignitrue(e.target.value)} />
            </InputWrap>
            <ReConfirm>* 제출하기 전 본인은 에픽로그 저작권 정책에 동의했음을 다시 한번 확인합니다 </ReConfirm>
            <SubmitBtn>제출하기</SubmitBtn>
          </ReportEnd>
        </ReportBox>
      </LayoutInner>
    </Layout>
  );
};

{
  /* 신고하기 폼 디자인 */
}
// 공통

const Dummy = styled.div`
  width: 100%;
  height: 3px;
  background: ${(props) => props.theme.color.hoverColor};
  margin: 20px 0;
`;
// 공통 - 텍스트
const ReportTitle = styled.h2`
  font-size: ${(props) => props.theme.fontSize.font20};
  font-weight: ${(props) => props.theme.fontWeight.font500};
  color: ${(props) => props.theme.color.blackColor};
  margin-bottom: 12px;
`;
const ReportSubTitle = styled.h3`
  font-size: ${(props) => props.theme.fontSize.font18};
  font-weight: ${(props) => props.theme.fontWeight.font500};
  color: ${(props) => props.theme.color.blackColor};
  margin-bottom: 14px;
`;
const ReportTxt = styled.span`
  font-size: ${(props) => props.theme.fontSize.font15};
  font-weight: ${(props) => props.theme.fontWeight.font300};
  color: ${(props) => props.theme.color.blackColor};
  line-height: 20px;
`;
// 공통 - Input
const TxtInput = styled.input.attrs({
  type: 'text',
})`
  width: 100%;
  height: 38px;
  border: 2px solid ${(props) => props.theme.color.hoverColor};
  border-radius: 8px;
  padding: 5px 12px;
  margin-top: 6px;
  &::placeholder {
    color: ${(props) => props.theme.color.placeHolderColor};
  }
`;

//레이아웃
const Layout = styled.div`
  display: flex;
  justify-content: center;
`;
const LayoutInner = styled.div`
  width: calc(100% - 65%);
  min-width: 480px;
  height: 100%;
  background: ${(props) => props.theme.color.whiteColor};

  overflow: hidden;
  @media (max-width: 900px) {
    width: 100%;
  }
`;
const Header = styled.div`
  display: flex;
  align-items: center;
  position: sticky;
  top: 1px;
  left: 0;
  width: 100%;
  height: 52px;
  padding: 4px;
  box-shadow: ${(props) => props.theme.boxshadow.nav};
  z-index: 9;
`;

const ReportBox = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  margin-bottom: 120px;
  padding: 30px;
`;

const InputWrap = styled.div`
  width: 100%;
  height: auto;
  margin: 12px 0;
`;

// 저작권 신고 상단 파트
const ReportTop = styled.article`
  display: flex;
  flex-direction: column;
`;
const ArrowBtn = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  margin-left: 8px;
  cursor: pointer;
  &::before {
    content: '';
    display: block;
    width: 10px;
    height: 10px;
    margin-left: 8px;
    border-top: 3px solid ${(props) => props.theme.color.darkGray};
    border-right: 3px solid ${(props) => props.theme.color.darkGray};
    transform: rotate(-135deg);
  }
  &:hover {
    background: ${(props) => props.theme.color.hoverColor};
  }
`;
// 침해받은 저작물 중간 파트
const ReportMiddle = styled(ReportTop)``;
const TextDescript = styled.textarea`
  width: 100%;
  height: 120px;
  border: 2px solid ${(props) => props.theme.color.hoverColor};
  border-radius: 8px;
  margin: 12px 0;
`;

// 처리방침 및 발송 마지막 파트
const ReportEnd = styled(ReportTop)``;
const AgreeBoxWrap = styled.div`
  display: flex;
  align-items: center;
  margin: 14px 0;
`;
const PvAgreeBox = styled.input.attrs({
  type: 'checkbox',
})`
  margin-right: 10px;
`;
const PvAgreeBoxLabel = styled.label``;

const ReConfirm = styled.span`
  font-size: ${(props) => props.theme.fontSize.font13};
  margin-top: 60px;
`;

const SubmitBtn = styled.button`
  width: 100%;
  height: 42px;
  border-radius: 25px;
  background: ${(props) => props.theme.color.orangeColor};
  font-size: ${(props) => props.theme.fontSize.font15};
  font-weight: ${(props) => props.theme.fontWeight.font500};
  color: ${(props) => props.theme.color.whiteColor};
  margin-top: 16px;
`;

export default Report;
