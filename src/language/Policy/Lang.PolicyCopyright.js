import styled from 'styled-components';
import Link from 'next/link';

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
  font-size:1.5em;
  margin-bottom: 14px;
  margin-top: 28px;

  @media (max-width: 900px) {
    font-size: 0.8em;
  }
`

const UL = styled.ul`
margin:0.7em 0;
padding-left:1em;
`
const LI = styled.li`
text-indent: -1.1em;
margin-left: 1em;
`
const Margin = styled.span`

`
const BOLD = styled.button`
font-weight:700;
cursor:pointer;
`

// 첫번째 - 저작권 가이드
export const copyrightGuide = {
    reason1: {
        2: `Copyright Guide`,
        0: `저작권 가이드`,
        1: `著作権ガイド`
      },
      definition1: {
        2:<SPAN>Copyright is very important. We do our best to provide safe and secure services. Basically, the uploaded works in the service are copyrighted to the uploaded members, but in the case of works uploaded through illegal channels, we delete, warn, and impose sanctions on users as soon as we find illegal works. However, promises between members are important to prevent this from happening. Therefore, we present guidelines that should be followed between members.</SPAN>,
        0: <SPAN>저작권은 아주 중요합니다. 저희는 안전하고 안심할 수 있는 서비스를 제공하기 위해 최선을 다합니다. 기본적으로 에픽로그 내에서 업로드 되는 작품은 업로드 한 회원들에게 저작권이 귀속되지만 불법적인 경로로 업로드 되는 저작물의 경우 원저작권자에게 피해를 줄 수 있기 때문에 저희 에픽로그는 불법적인 저작물을 발견하는 즉시 삭제, 경고 및 이용자에 대한 제재를 가합니다. 하지만 이러한 사항이 발생하지 않게 하기 위해서는 회원간의 약속이 중요합니다. 따라서 저희는 회원간 지켜야하는 가이드라인을 제시합니다.</SPAN>,
        1: <SPAN>著作権は非常に重要です。 私たちは安全で安心できるサービスを提供するため最善を尽くします。 基本的にサービス内でアップロードされる作品はアップロードした会員に著作権は帰属しますが、不法な経路でアップロードされる著作物の場合、原著作権者に被害を与えることがあるため、私たちは不法な著作物が発見され次第削除、警告及び利用者に対して制裁を加えます。 しかし、このようなことが発生しないようにするためには、会員間のコミットメントが重要です。 したがって私どもは会員間守らなければならないガイドラインを提示します</SPAN>
      }

  };
// 두번째 - 에픽로그 회원들의 저작물에 관한 규칙

  export const reasonCollection = {
    reason2: {
        2: `Rules on Epikalog Members' Works`,
        0: `에픽로그 회원들의 저작물에 관한 규칙`,
        1: `エピックログ会員の著作に関する規則`
      },
      definition2: {
        2: <SPAN>
            We encourage the production of creations and secondary creations for the prosperity of cartoon and illustration creation. This is because we can expect high synergy between creators and secondary creators. However, the following actions can harm the creator or secondary creator, so we can impose sanctions on them.
              <UL>
                <LI><Margin>1&#41; Commercial use is prohibited without the consent of the original copyright holder or the secondary creator.</Margin></LI>
                <LI><Margin>2&#41; Prohibits distribution or upload of illegal works in the EpicLogue. Illegal work refers to work that does not have permission to distribute, distribute, or upload an EpicLogue external author.</Margin></LI>
                <LI><Margin>3&#41; If you intend to publish an external work, you must obtain permission from the owner who has the right to the work, such as secondary creation.</Margin></LI>
                <LI><Margin>4&#41; It prohibits the installation of illegal software or the insertion of such programs in the original work.</Margin></LI>
            </UL>
            If the original author does not allow secondary creation within the EpicLogue service, the second creation can be prohibited by selecting the second creation prohibition from being submitted before uploading. Ignoring this, secondary creation is considered illegal.
          </SPAN>,
        0: <SPAN>
            저희 에픽로그는 만화 및 일러스트 창작의 번영을 위하여 창작물 및 2차 창작물의 제작을 장려합니다. 이는 창작자와 2차 창작자 간의 높은 시너지 효과를 기대할 수 있기 때문입니다. 하지만 다음에 해당하는 행위는 창작자 혹은 2차 창작자에게 피해를 줄 수 있으므로 저희는 이러한 행위에 대해 제재를 가할 수 있습니다.
              <UL>
                <LI><Margin>1&#41; 원 저작권자 혹은 2차 창작자의 동의 없이 상업적으로 이용하는 행위를 금지합니다.</Margin></LI>
                <LI><Margin>2&#41; 에픽로그 내 불법적인 저작물을 배포하거나 업로드하는 행위를 금지합니다. 불법적인 저작물이란 에픽로그 외 원 저작자의 배포, 유통 및 업로드 허가가 없는 저작물을 말합니다.</Margin></LI>
                <LI><Margin>3&#41; 외부 저작물을 게시하려는 경우 해당 저작물의 권리를 가진 소유자에게 2차 창작 등의 허락을 받아야 합니다.</Margin></LI>
                <LI><Margin>4&#41; 원 저작물에 불법적인 소프트웨어를 설치하거나 혹은 그러한 프로그램을 삽입하는 것을 금지합니다.</Margin></LI>
             </UL>
             만약 원 저작자가 에픽로그 서비스 내에서 2차 창작을 허용하지 않는다면 업로드 하기 전, 투고하기 2차 창작 여부에서 2차 창작 허용 금지를 선택하여 2차 창작을 금지할 수 있습니다. 이를 무시한 2차 창작은 불법 창작물로 간주합니다
           </SPAN>,
        1: <SPAN>
            私たちは漫画およびイラストを用いた創作の繁栄のため、創作物および2次創作物の製作を奨励します。 これは創作者と二次創作者間の高いシナジー効果が期待できるからです。 しかし、次に該当する行為は創作者または2次創作者に被害を与えることがあるため、私たちはこのような行為に対して制裁を加えることができます。
              <UL>
                <LI><Margin>1&#41; 元著作権者または第2次創作者の同意なく商業的に利用する行為は禁止します。</Margin></LI>
                <LI><Margin>2&#41; EpicLogue内の違法著作物の配布·アップロードを禁止します。 不法な著作物とは、EpicLogue以外の元著作者の配布、流通及びアップロード許可のない著作物をいいます。</Margin></LI>
                <LI><Margin>3&#41; 外部の著作物を掲示しようとする場合は、当該著作物の権利を有する所有者に二次創作などの許諾を得なければなりません。</Margin></LI>
                <LI><Margin>4&#41; 元著作物に不正なソフトウェアを挿入したり，そのようなプログラムを挿入することを禁じます。</Margin></LI>
            </UL>
            もし元著作者がEpicLogueサービス内で2次創作を許可しない場合、アップロード前·投稿前の2次創作可否で2次創作許容禁止を選択し、2次創作を禁止することができます。 これを無視した二次創作は不法創作と見なされます。
           </SPAN>
      }
  };

  // 세번째 - 저작권에 관한 규정

  export const collectionItem = {
    reason3: {
        2: `copyright regulations`,
        0: `저작권에 관한 규정`,
        1: `著作権に関する規定`
      },
      definition3: {
        2: <>
            <SPAN>
            Our Epiclog can present a set of copyright-related regulations based on the Digital Millennium Copyright Act.
            </SPAN>
            <SPAN>
            If you violate the copyright rules of Epic Log, please be careful because you can delete the post without warning and suspend the service for the member who violated it.
            </SPAN>
          </>,
        0: <>
            <SPAN>
                저희 에픽로그는 일련의 저작권과 관련한 규정을 ‘정보통신망 이용촉진 및 정보보호 등에 관한 법률’ 및 ‘저작권법’에 들어 설명드리고 있습니다.
            </SPAN>
            <SPAN>
              만약 에픽로그의 저작권 규칙에 어긋나는 행위를 할 경우에는 경고 없이 해당 게시물을 삭제하며 위반한 회원님에 대하여 서비스를 정지시킬 수 있으니 주의해주세요.
            </SPAN>
          </>
            ,
        1: <>
            <SPAN>
            当エピックログは一連の著作権に関する規定を日本または韓国著作権法に基づいて提示することができます。
            </SPAN>
            <SPAN>
            もし、エピックログの著作権規則に反する行為をした場合、警告なく当該掲示物を削除し、違反した会員様に対してサービスを停止させることがありますので、ご注意ください。
            </SPAN>
          </>
      }
  };

  // 네번째 - 저작권 신고와 대응
  export const consentStatus = {
    reason4: {
        2: `Copyright Declaration and Response`,
        0: `저작권 신고와 대응`,
        1: `著作権申告と対応`
      },
      definition4: {
        2: <>
            <SPAN>If you think your work has been violated, you can <Link href={{pathname:'/report'}}><BOLD>report</BOLD></Link>it directly and notify us. You may exercise your rights directly to the copyright holder through other national rules or legal procedures.</SPAN>
            <SPAN>However, please think carefully and report because legal disputes related to copyright can take a long time and cause financial problems. If there is no direct damage or concerns, we can mediate through the deletion and warning of the post in our EpicLogue.</SPAN>
          </>,
        0: <>
            <SPAN>만약 회원 여러분의 저작물이 침해되었다고 생각할 경우 <Link href={{pathname:'/report'}}><BOLD>저작물 신고</BOLD></Link>에서 회원님이 직접 신고를 하여 저희에게 통지할 수 있습니다. 그 외 국가에서 정한 규칙이나 법적인 절차를 통하여 해당 저작권자에게 직접 권리를 행사 할 수 있습니다</SPAN>
            <SPAN>하지만 저작권과 관련한 법적 분쟁은 상당한 시일을 소요하고 또 금전적 문제를 야기할 수 있기 때문에 신중하게 생각하시고 신고해주세요. 직접적인 피해가 없거나 우려가 되는 상황이라면 저희 에픽로그에서 해당 게시물의 삭제 및 경고를 통해 중재할 수 있습니다.</SPAN>
          </>,
        1: <>
            <SPAN>会員様の著作物が侵害されたと判断した場合、<Link href={{pathname:'/report'}}><BOLD>著作物届出</BOLD></Link>において会員様が直接届出をして我々に通知することができます。 その他、国家が定めた規則や法的手続きを経て当該著作権者に直接権利を行使することができます。</SPAN>
            <SPAN>しかし、著作権に関する法的紛争は、かなりの時間がかかり、また金銭的問題が生じることがあるため、慎重に考えて申告してください。 直接的な被害がないか、または懸念される状況であれば、当EpicLogueで当該掲示物の削除および警告を通じて仲裁することができます。</SPAN>
          </>
      }
  };

    // 다섯번째 - 에픽로그가 회원의 콘텐츠를 삭제한 경우
    export const informModification = {
        reason5: {
            2: `If the EpicLogue deletes the member's content`,
            0: `에픽로그가 회원의 콘텐츠를 삭제한 경우`,
            1: `EpicLogueが会員のコンテンツを削除した場合`
          },
          definition5: {
            2: <>
                <SPAN>EpicLogue quickly delete content that is against the rules or that has been reported.</SPAN>
                <SPAN>If the wrong content is removed, you can raise a counterargument. If your counterargument is considered true and justified, the deleted posts will be restored to their original state and the records of the remaining complaints will be removed from your account.</SPAN>
              </>,
            0: <>
                <SPAN>에픽로그는 규칙에 어긋나거나 신고 받은 콘텐츠를 신속하게 삭제합니다.</SPAN>
                <SPAN>만약 잘못된 콘텐츠가 제거될 경우 회원님은 반론을 제기할 수 있습니다. 회원님의 반론이 진실되고 정당하다고 여겨질 경우 삭제된 게시물은 원상복구 되며, 계정에 남아있는 불만 사항에 대한 기록을 제거할 것 입니다.</SPAN>
              </>,
            1: <>
                <SPAN>EpicLogueは、規則に違反したり、申告を受けたコンテンツを迅速に削除します。</SPAN>
                <SPAN>もし、間違ったコンテンツが取り除かれた場合、会員様は反論を提起することができます。 会員様の反論が真実かつ正当だと思われる場合、削除された掲示物は原状回復し、アカウントに残っている不満事項に対する記録を削除します。</SPAN>
              </>
          }
      };
       