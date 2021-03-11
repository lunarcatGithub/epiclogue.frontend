import styled from 'styled-components';

const Title = styled.h1`
  font-weight: ${(props) => props.theme.fontWeight.font700};
  color: ${(props) => props.color};
  font-size: ${(props) => props.theme.fontSize.font26};
  line-height: 1.3em;
  margin-top: 1.8em;
  padding: 0 0.6em;

  @media (max-width: 900px) {
    font-size: ${(props) => props.theme.fontSize.font20};
  }

  @media (max-width: 320px) {
    font-size: ${(props) => props.theme.fontSize.font16};
  }
`;
const DescWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  margin-top: 0.5em;
  padding: 0 0.8em;
  @media (max-width: 900px) {
    padding: 0 1em;
  }
`;

const Desc = styled.h2`
  font-weight: ${(props) => props.theme.fontWeight.font500};
  color: ${(props) => props.theme.color.blackColor};
  font-size: ${(props) => props.theme.fontSize.font20};
  line-height: 1.6em;
  margin-top: 0.4em;

  @media (max-width: 900px) {
    font-weight: ${(props) => props.theme.fontWeight.font500};
    font-size: ${(props) => props.theme.fontSize.font18};
  }
  @media (max-width: 320px) {
    font-size: ${(props) => props.theme.fontSize.font15};
  }
`;

export const LangTutorial = {
  title1: {
    2: <Title color={`#ECA62C`}>Welcome to Epiclogue!</Title>,
    0: <Title color={`#ECA62C`}>에픽로그에 어서오세요!</Title>,
    1: <Title color={`#ECA62C`}>Epiclogueへようこそ!</Title>,
  },
  desc1: {
    2: (
      <DescWrap>
        <Desc>We want you to put wings to your creation here.</Desc>
        <Desc>Anyone can be a creator, from creation to appreciation to secondary creation!</Desc>
      </DescWrap>
    ),
    0: (
      <DescWrap>
        <Desc>이곳에서 여러분들의 창작에 날개를 달아주세요</Desc>
        <Desc>작품의 창작, 감상 그리고 2차 창작까지 누구나 창작자가 될 수 있습니다!</Desc>
      </DescWrap>
    ),
    1: (
      <DescWrap>
        <Desc>ここで皆さんの創作に羽をつけてください</Desc>
        <Desc>創作、鑑賞、2次創作など、創作者は誰でも出来ます!</Desc>
      </DescWrap>
    ),
  },
  title2: {
    2: <Title color={`#358786`}>You can create synergy with secondary creation</Title>,
    0: <Title color={`#358786`}>2차 창작으로 시너지 효과를 내보세요</Title>,
    1: <Title color={`#358786`}>2次創作でシナジー効果を出してみてください</Title>,
  },
  desc2: {
    2: (
      <DescWrap>
        <Desc>You can simply create the second round with an editor!</Desc>
        <Desc>Make the original work stand out more with the second creation through translation and parody.</Desc>
      </DescWrap>
    ),
    0: (
      <DescWrap>
        <Desc>에디터로 간단하게 2차 창작이 가능해요!</Desc>
        <Desc>번역 및 패러디 등을 통한 2차 창작으로 원작을 더욱 빛내보세요</Desc>
      </DescWrap>
    ),
    1: (
      <DescWrap>
        <Desc>エディタで簡単に2次創作が可能です！</Desc>
        <Desc>翻訳とパロディーを通じて原作をもっと引き立たせてみてください</Desc>
      </DescWrap>
    ),
  },
  title3: {
    2: <Title color={`#986444`}>Try interacting with users!</Title>,
    0: <Title color={`#986444`}>유저들과 교류해보세요</Title>,
    1: <Title color={`#986444`}>ユーザーと交流してみてください!</Title>,
  },
  desc3: {
    2: (
      <DescWrap>
        <Desc>You can interact with users around the world in real time through reactions to the work.</Desc>
        <Desc>Share your interests with users who are interested.</Desc>
      </DescWrap>
    ),
    0: (
      <DescWrap>
        <Desc>세계 유저들과 실시간으로 작품에 대한 반응을 통해 교류해보세요</Desc>
        <Desc>관심 유저 팔로우를 통해 관심사를 공유해보세요</Desc>
      </DescWrap>
    ),
    1: (
      <DescWrap>
        <Desc>世界中のユーザーとリアルタイムで作品に対する反応を通じて交流してみてください</Desc>
        <Desc>関心ユーザーフォローを通じて関心事を共有してください</Desc>
      </DescWrap>
    ),
  },
  title4: {
    2: <Title color={`#4E4E4E`}>Activity right now!</Title>,
    0: <Title color={`#4E4E4E`}>지금 바로 활동해보세요!</Title>,
    1: <Title color={`#4E4E4E`}>今すぐ活動してみてください!</Title>,
  },
  desc4: {
    2: { join: 'Join membership', Login: 'Login', main: 'Go to Main' },
    0: { join: '회원가입 하기', Login: '로그인 하기', main: '메인으로 가기' },
    1: { join: '会員登録', Login: 'ログイン', main: 'メインに行く' },
  },
};
