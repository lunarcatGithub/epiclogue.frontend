import styled from 'styled-components';

const SPAN = styled.span`
  color: rgb(113,113,113);
  font-size:1.3em;
  font-weight:300;
  line-height:1.3em;
  @media (max-width: 900px){
    font-size:1em;
    line-height:1.4em;
  }
`

const SubTitle = styled.h2`
font-size:1em;
`

const UL = styled.ul`

`
const LI = styled.li`

`
const Margin = styled.span`

`


// 커뮤니티
export const communityInfo = {
    reason1: {
        2: `Epiclogue's Mission`,
        0: `에픽로그의 미션`,
        1: `Epiclogueのミッション`
      },
      definition1: {
        2: <SPAN>We respect each member's doctors and activities, and we claim to play a role in bringing out the value you have created. However, all content and your doctor and activities can be unwanted behavior for someone. Therefore, we would like to establish a series of guides in the hope that everyone will love our Epiclogue. Through this, Epiclogue will try to respect each other, understand others, and lead happy activities.</SPAN>,
        0: <SPAN>저희 에픽로그는 회원 개개인의 의사와 활동을 존중하며, 여러분이 만들어낸 가치를 세상 밖으로 이끌어 내는 역할을 자처합니다. 하지만, 모든 콘텐츠와 여러분들의 의사 그리고 활동이 누군가에게는 원하지 않는 행위가 될 수 있습니다. 그렇기 때문에 저희 에픽로그를 누구나가 사랑해주길 바라는 마음에서 일련의 가이드를 제정하고자 합니다. 이를 통해 서로를 존중하고 타인을 이해하며 모두가 행복한 활동을 영위할 수 있도록 저희 에픽로그는 노력할 것입니다.</SPAN>,
        1: <SPAN>当Epiclogueは会員一人一人の意思と活動を尊重し、皆様が作り出した価値を世の中へ導き出す役割を自任しています。 しかし、全てのコンテンツと皆さんの意思、そして活動は誰かにとっては望まない行為となってしまうことがあります。 ですから私たちEpiclogueを誰もが愛してほしいという思いから一連のガイドを制定しようとしています。 これにより、お互いを尊重し、他人を理解し、皆が幸せな活動を営めるよう、私たちEpiclogueは努力することでしょう。</SPAN>
      }
  };

