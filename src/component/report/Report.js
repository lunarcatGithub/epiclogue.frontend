import React from 'react';
import styled from 'styled-components';
import {useRouter} from 'next/router';

// 컴포넌트 import
import { useChange } from '@hooks/useChange';

const Report = () => {
  const [name, handleChangeName] = useChange();
  const [company, handleChangeCompany] = useChange();
  const [contact, handleChangeContact] = useChange();
  const [email, handleChangeEmail] = useChange();
  const [country, handleChangeCountry] = useChange();
  const [checkContent, handleChangeContent] = useChange();
  const router = useRouter();

  return (
      <Layout>
        <LayoutInner>
          <Header>
            <ArrowBtn onClick={()=> router.back()} />
          </Header>
          <ReportBox action="" method="">
            {/* 저작권 신고 상단 파트 */}
            <ReportTop>
              <ReportTitle>저작권 신고</ReportTitle>
              <ReportTxt>*신고하기 전에 저작권 정책을 다시 한번 확인해 주세요</ReportTxt>
              <Dummy />

              <ReportSubTitle> 신고자의 정보</ReportSubTitle>
              <InputWrap>
                <ReportTxt>이름</ReportTxt>
                <TxtInput name={name} onChange={handleChangeName} />
              </InputWrap>
              <InputWrap>
                <ReportTxt>회사명</ReportTxt>
                <TxtInput name={company} onChange={handleChangeCompany} />
              </InputWrap>
              <InputWrap>
                <ReportTxt>연락처</ReportTxt>
                <TxtInput name={contact} onChange={handleChangeContact} />
              </InputWrap>
              <InputWrap>
                <ReportTxt>이메일</ReportTxt>
                <TxtInput name={email} onChange={handleChangeEmail} />
              </InputWrap>
              <InputWrap>
                <ReportTxt>국가</ReportTxt>
                <TxtInput name={country} onChange={handleChangeCountry} />
              </InputWrap>

              {/* // 저작권 신고 상단 파트 끝 */}
            </ReportTop>
            <Dummy />
            {/* 침해받은 저작물 중간 파트 */}
            <ReportMiddle>
              <InputWrap>
                <ReportSubTitle>침해받은 저작물 확인</ReportSubTitle>
                <TxtInput name={checkContent} onChange={handleChangeContent} />
              </InputWrap>
              <InputWrap>
                <ReportTxt>회원님의 콘텐츠 원본이 있는 사이트를 아래에 작성해 주세요</ReportTxt>
                <TxtInput placeholder={'ex) http://'} />
                <TxtInput placeholder={'ex) http://'} />
                <TxtInput placeholder={'ex) http://'} />
              </InputWrap>
              <InputWrap>
                <ReportTxt>기타 원작임을 알 수 있는 내용을 자세하게 작성해주세요</ReportTxt>
                <TextDescript />
              </InputWrap>
              {/* // 침해받은 저작물 중간 파트 끝 */}
            </ReportMiddle>
            <Dummy />
            {/* 처리방침 및 발송 마지막 파트 */}
            <ReportEnd>
              <InputWrap>
                <ReportSubTitle>저작물 위반에 대한 처리 방침</ReportSubTitle>
                <ReportTxt>저희 에픽로그는 신고가 접수되면 해당 게시물을 일시적으로 블라인드 처리합니다. 이후 신고가 사실일 경우 불법 저작물은 삭제됩니다.</ReportTxt>

                <ReportTxt>단, 법적 소송 혹은 법률적인 제재가 필요한 경우에 대비하여 저작물은 3개월 동안 보관합니다.</ReportTxt>
                {/* // 처리방침 및 발송 마지막 파트 끝 */}
              </InputWrap>
              <InputWrap>
                <ReportSubTitle>상기 내용에 대한 동의</ReportSubTitle>
                <AgreeBoxWrap>
                  <PvAgreeBox id="private" />
                  <PvAgreeBoxLabel>상기 내용에 대한 정보제공(개인정보, 신고내용)을 동의합니다.</PvAgreeBoxLabel>
                </AgreeBoxWrap>
                <AgreeBoxWrap>
                  <PvAgreeBox id="swear" />
                  <SrAgreeBoxLabel>본인은 위증을 하지 않았고, 확실한 저작권자이며 상기의 내용은 모두 진실임을 동의합니다.</SrAgreeBoxLabel>
                </AgreeBoxWrap>
              </InputWrap>
              <InputWrap>
                <ReportSubTitle>본인의 성명을 작성해주세요. 전자서명으로 대체합니다.</ReportSubTitle>
                <TxtInput />
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
const PvAgreeBoxLabel = styled.label.attrs({
  htmlFor: 'private',
})``;

const SrAgreeBoxLabel = styled.label.attrs({
  htmlFor: 'swear',
})``;

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
