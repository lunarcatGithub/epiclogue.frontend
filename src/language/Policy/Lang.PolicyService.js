import styled from 'styled-components';

const SPAN = styled.span`
  color: rgb(113, 113, 113);
  font-size: 1.2em;
  font-weight: 300;
  line-height: 1.5em;

  @media (max-width: 900px) {
    font-size: 1em;
    line-height: 1.4em;
  }
`;

const SubTitle = styled.h2`
  font-size: 1.3em;
  margin-bottom: 14px;
  margin-top: 28px;
  font-weight: 500;
  color: rgba(247, 112, 143, 1);

  @media (max-width: 900px) {
    font-size: 0.8em;
  }
`;

const UL = styled.ul``;
const LI = styled.li`
  text-indent: -1.1em;
  margin-left: 1em;
`;
const Margin = styled.span``;

// 첫번째 - 본 약관을 제정한 이유
export const serviceReason = {
  reason1: {
    2: `The reason for establishing these Terms and Conditions`,
    0: `본 약관을 제정한 이유`,
    1: `本約款を制定した理由`,
  },
  definition1: {
    2: (
      <SPAN>
        The terms and conditions you are viewing stipulate the use of content services related to EpicLogues, users, rights, obligations, and other matters concerning each other's rights and
        responsibilities.
      </SPAN>
    ),
    0: <SPAN>보고 계신 약관은 에픽로그와 관련한 콘텐츠 서비스의 이용과 관련하여 에픽로그와 유저, 서로의 권리, 의무 및 책임사항 등 기타 사항을 규정합니다.</SPAN>,
    1: <SPAN>ご覧の約款は、EpicLogueと関連したコンテンツサービスの利用と関連し、EpicLogueとユーザー、お互いの権利、義務および責任事項など、その他の事項を規定します。</SPAN>,
  },
};
// 두번째 - 에픽로그 모든 것에 대한 정의

export const serviceDefine = {
  reason2: {
    2: `EpicLogue definition of everything`,
    0: `에픽로그 모든 것에 대한 정의`,
    1: `EpicLogueの定義`,
  },
  definition2: {
    2: (
      <SPAN>
        <UL>
          <LI>1. [EpicLogue] is a profit-making company that engages in economic activities related to the content industry you post and provides various services to facilitate content posting</LI>
          <LI>2. [You] (user) are those who access the service and post content or engage in community activities using various services provided by under these terms and conditions.</LI>
          <LI>
            3. [Community] is a gathering where you can share information exchange and friendship with interest and purpose on a particular topic. Communities can be used differently in different
            names, such as SNS and blogs, depending on their characteristics.
          </LI>
          <LI>4. [Content] refers to images that you manufacture and produce yourself, sound, voice, text, images, symbols and electronic forms.</LI>
          <LI>
            5. [Secondary creation] refers to the manufactured, produced images, audio, voice, text, images, symbols, and electronic forms of the original content. This refers to the original work and
            the work that is directly affected.
          </LI>
        </UL>
      </SPAN>
    ),

    0: (
      <SPAN>
        <UL>
          <LI>1. [에픽로그]는 여러분들이 게시하는 콘텐츠 산업과 관련된 경제활동을 영위하는 영리업체로 콘텐츠 게시를 원활하게 하기 위하여 관련 제반서비스를 제공하는 업체를 말합니다.</LI>
          <LI>2. [여러분](이하 유저)은 에픽로그 서비스에 접속하여 이 약관에 따라 에픽로그가 제공하는 제반서비스를 이용하여 콘텐츠를 게시하거나 커뮤니티 활동을 하는 자를 말합니다.</LI>
          <LI>
            3. [커뮤니티]라고 하는 것은 특정 주제에 대한 관심과 목적을 가지고 여러분들이 정보교류와 친목을 나눌 수 있는 모임을 말합니다. 커뮤니티는 특성에 맞게 SNS, 블로그 등 명칭이 다르게 사용될 수
            있습니다.
          </LI>
          <LI>4. [콘텐츠]라고 하는 것은 여러분이 직접 제조, 제작한 이미지, 음향, 음성, 문자, 영상, 부호이고 전자적 형태로 처리된 것을 말합니다.</LI>
          <LI>
            5. [2차 창작]이라고 하는 것은 원래의 콘텐츠 작품에 대하여 여러분이 직접 재가공한 제조, 제작한 이미지, 음향, 음성, 문자, 영상, 부호이며 전자적 형태로 처리된 것을 말합니다. 이는 원 저작물과
            직접적 영향을 받는 작품을 말합니다.
          </LI>
        </UL>
      </SPAN>
    ),

    1: (
      <SPAN>
        <UL>
          <LI>1. [EpicLogue]は、皆さんが掲示するコンテンツ産業と関連した経済活動を営む営利企業で、コンテンツ掲示を円滑にするために関連諸サービスを提供する業者のことをいいます。</LI>
          <LI>
            2.
            [みなさん]（以下ユーザー）」は、EpicLogueサービスにアクセスし、この約款に基づいてEpicLogueが提供する諸サービスを利用してコンテンツを掲示したり、コミュニティ活動を行う者のことをいいます。
          </LI>
          <LI>
            3. [コミュニティ]とは、特定のテーマに対する関心と目的を持って皆さんが情報交流と親睦を分かち合える集まりのことです。
            コミュニティは特性に合わせてSNS、ブログなど、異なる名称で使用することがあります。
          </LI>
          <LI>4. [コンテンツ]とは皆さんが直接製造、制作したイメージ、音響、文字、映像、符号で電子的形態で処理されたものをいいます。</LI>
          <LI>
            5. [2次創作]というのは元のコンテンツ作品に対して皆さんが直接再加工した製造、製作したイメージ、音響、音声、文字、映像、符号であって電子的形態で処理されたものをいいます。
            これは元著作物と直接的に影響を受ける作品を意味します。
          </LI>
        </UL>
      </SPAN>
    ),
  },
};

// 세번째 - 회원가입에 대하여

export const aboutSignUp = {
  reason3: {
    2: `About membership`,
    0: `회원 가입에 대하여`,
    1: `会員登録について`,
  },
  definition3: {
    2: (
      <SPAN>
        <UL>
          <LI>
            1. Users who wish to become a member apply for membership by filling out the membership information according to the subscription form provided by and pressing the consent and confirmation
            buttons.
          </LI>
          <LI>2. In principle, it is required to accept the user's application for membership. However, EpicLogue may not accept the following applications.</LI>
          <LI>
            <Margin>1&#41; In case there is a false, missing, or misleading information in the registration details.</Margin>
          </LI>
          <LI>
            <Margin>2&#41; In case where an applicant has previously lost his/her membership under this Agreement.</Margin>
          </LI>
          <LI>
            <Margin>3&#41; In case other people's information is used.</Margin>
          </LI>
          <LI>
            <Margin>4&#41; In case vulnerable password settings.</Margin>
          </LI>
          <LI>
            <Margin>5&#41; In case If an application is filed in violation of all the matters prescribed.</Margin>
          </LI>
          <LI>3. The time of membership entry shall be when the applicants of have been accepted.</LI>
        </UL>
      </SPAN>
    ),

    0: (
      <SPAN>
        <UL>
          <LI>1. 회원이 되고자 하는 유저는 에픽로그에서 제공한 가입 양식에 따라 회원정보를 기입하고 동의와 확인 버튼을 누르는 방법으로 회원 가입을 신청합니다.</LI>
          <LI>2. 에픽로그는 유저의 회원 신청에 대하여 회원가입을 승낙하는 것을 원칙으로 합니다. 다만, 에픽로그는 다음에 해당하는 신청에 대해서는 승낙하지 않을 수 있습니다.</LI>
          <LI>
            <Margin>1&#41; 등록 내용에 허위, 기재누락, 오기가 있는 경우</Margin>
          </LI>
          <LI>
            <Margin>2&#41; 가입신청자가 이 약관에 의하여 이전에 회원자격을 상실한 적이 있는 경우</Margin>
          </LI>
          <LI>
            <Margin>3&#41; 타인의 정보를 이용한 경우</Margin>
          </LI>
          <LI>
            <Margin>4&#41; 보안상 비밀번호 설정을 취약하게 한 경우</Margin>
          </LI>
          <LI>
            <Margin>5&#41; 규정한 제반 사항을 위반하며 신청하는 경우</Margin>
          </LI>
          <LI>3. 회원가입의 성립시기는 에픽로그의 승낙이 가입신청자에게 도달한 시점으로 합니다.</LI>
          {/* <LI>4. 여러분은 제1항의 회원정보 기재 내용에 변경이 발생한 경우, 즉시 변경사항을 정정하여 기재하여야 합니다.</LI> */}
        </UL>
      </SPAN>
    ),

    1: (
      <SPAN>
        <UL>
          <LI>1. 会員になりたいユーザーは、EpicLogueから提供された登録フォームに基づき、会員情報を記入し、同意と確認のボタンを押す方法により、会員登録を申請します。</LI>
          <LI>2. EpicLogueは、ユーザーの会員申請に対し、会員加入を承諾することを原則とします。 ただし、EpicLogueは次に該当する申請に対しては、承諾しないことがあります。</LI>
          <LI>
            <Margin>1&#41; 登録内容に虚偽、記載漏れ、誤記がある場合</Margin>
          </LI>
          <LI>
            <Margin>2&#41; 登録申請者が本約款に基づき以前に会員資格を喪失したことがある場合</Margin>
          </LI>
          <LI>
            <Margin>3&#41; 他人の情報を利用した場合</Margin>
          </LI>
          <LI>
            <Margin>4&#41; パスワード設定を脆弱にした場合</Margin>
          </LI>
          <LI>
            <Margin>5&#41; 規定した諸般の事項に違反して申請する場合</Margin>
          </LI>
          <LI>3. 会員登録の成立時期は、EpicLogueの承諾が加入申請者に到達した時点とします。</LI>
        </UL>
      </SPAN>
    ),
  },
};

// 네번째 - 서비스가 제공하는 것 그리고 서비스의 변경
export const serveAbout = {
  reason4: {
    2: `What EpicLogues provide and change`,
    0: `에픽로그가 제공하는 것 그리고 변경`,
    1: `EpicLogueが提供するもの及び変更`,
  },
  definition4: {
    2: (
      <SPAN>
        <UL>
          <LI>1. EpicLogue provides you with the following services.</LI>
          <LI>
            <Margin>1&#41; Publishing agency service for content.</Margin>
          </LI>
          <LI>
            <Margin>2&#41; Content Portfolio Building Service.</Margin>
          </LI>
          <LI>
            <Margin>3&#41; Search service.</Margin>
          </LI>
          <LI>
            <Margin>4&#41; Community Services.</Margin>
          </LI>
          <LI>
            <Margin>5&#41; Provide services for secondary creation.</Margin>
          </LI>
          <LI>
            <Margin>6&#41; All other services that EpicLogue will provide to you through self-development or cooperation with other vendors.</Margin>
          </LI>
          <LI>2. EpicLogues can inform you of the contents of the service in the manner specified in [Messages and notifications that EpicLogue delivers to members].</LI>
        </UL>
      </SPAN>
    ),
    0: (
      <SPAN>
        <UL>
          <LI>1. 에픽로그는 여러분에게 아래와 같은 서비스를 제공합니다.</LI>
          <LI>
            <Margin>1&#41; 콘텐츠의 게시 대행 서비스</Margin>
          </LI>
          <LI>
            <Margin>2&#41; 콘텐츠의 포트폴리오 구축 서비스</Margin>
          </LI>
          <LI>
            <Margin>3&#41; 검색 서비스</Margin>
          </LI>
          <LI>
            <Margin>4&#41; 커뮤니티 서비스</Margin>
          </LI>
          <LI>
            <Margin>5&#41; 2차 창작을 위한 제반(에디터) 서비스 제공</Margin>
          </LI>
          <LI>
            <Margin>6&#41; 기타 에픽로그가 자체 개발하거나 다른 업체와의 협력을 통해 여러분에게 제공할 일체의 서비스</Margin>
          </LI>
          <LI>2. 에픽로그는 서비스의 내용을 [에픽로그가 회원들에게 전달하는 메시지 및 통지]에서 정한 방법으로 여러분에게 알릴 수 있습니다.</LI>
        </UL>
      </SPAN>
    ),
    1: (
      <SPAN>
        <UL>
          <LI>1. EpicLogueは皆様に下記のサービスを提供します。</LI>
          <LI>
            <Margin>1&#41; コンテンツの投稿代行サービス</Margin>
          </LI>
          <LI>
            <Margin>2&#41; コンテンツのポートフォリオ構築サービス</Margin>
          </LI>
          <LI>
            <Margin>3&#41; 検索サービス</Margin>
          </LI>
          <LI>
            <Margin>4&#41; コミュニティーサービス</Margin>
          </LI>
          <LI>
            <Margin>5&#41; 二次創作のための諸(エディタ)サービス提供</Margin>
          </LI>
          <LI>
            <Margin>6&#41; その他のEpicLogueが独自開発したり、他の業者との協力を通じて皆様にご提供する一切のサービス</Margin>
          </LI>
          <LI>2. EpicLogueは、サービスの内容を[EpicLogueが会員に伝えるメッセージおよび通知]で定めた方法で皆様に通知することができます。</LI>
        </UL>
      </SPAN>
    ),
  },
};

// 다섯번째 - 서비스가 제공하는 것 그리고 서비스의 변경
export const serviceAbort = {
  reason5: {
    2: `In case of service interruption`,
    0: `서비스가 중단되는 경우에 대하여`,
    1: `サービスが中断する場合について`,
  },
  definition5: {
    2: (
      <SPAN>
        <UL>
          <LI>1. In principle, content services are provided 24 hours a day, 24 hours a day.</LI>
          <LI>
            2. EpicLogue may temporarily suspend the provision of content services if it is deemed difficult to maintain maintenance, replacement and failure of information and communication
            facilities, communication disruptions, or operations. In this case, EpicLogue will notify you by the method specified in Article 11. However, if there is an unavoidable reason why
            EpicLogue cannot notify you in advance, you can notify you afterwards.
          </LI>
          <LI>3. If necessary for the provision of content services, EpicLogue can conduct regular inspections. The regular inspection time shall be according to the notice on the main screen.</LI>
        </UL>
      </SPAN>
    ),

    0: (
      <SPAN>
        <UL>
          <LI>1. 콘텐츠서비스는 연중무휴, 1일 24시간 제공함을 원칙으로 합니다.</LI>
          <LI>
            2. 에픽로그는 정보통신설비의 보수점검, 교체 및 고장, 통신두절 또는 운영을 지속하는 것이 힘들다고 판단되는 경우 콘텐츠서비스의 제공을 일시적으로 중단할 수 있습니다. 이 경우 에픽로그는
            제11조[여러분에 대한 통지]에 정한 방법으로 이용자에게 통지합니다. 그러나, 에픽로그가 사전에 통지할 수 없는 부득이한 사유가 있는 경우 사후에 통지할 수 있습니다.{' '}
          </LI>
          <LI>3. 에픽로그는 콘텐츠서비스의 제공에 필요한 경우 정기점검을 실시할 수 있습니다. 정기점검시간은 메인화면에 공지한 바에 따릅니다.</LI>
        </UL>
      </SPAN>
    ),

    1: (
      <SPAN>
        <UL>
          <LI>1. コンテンツサービスは、年中無休、1日24時間提供することを原則とします。</LI>
          <LI>
            2. EpicLogueは、情報通信設備の保守点検、交換及び故障、通信途絶又は運営の継続が困難だと判断される場合、コンテンツサービスの提供を一時的に中断することができます。
            この場合、EpicLogueは第11条[皆様への通知]で定めた方法で利用者に通知します。 しかし、EpicLogueが事前に通知できないやむを得ない事由がある場合、事後に通知することができます。{' '}
          </LI>
          <LI>3. EpicLogueは、コンテンツサービスの提供に必要な場合、定期点検を実施することができます。 定期点検時間は、メイン画面にてお知らせに従います。</LI>
        </UL>
      </SPAN>
    ),
  },
};
// 여섯번째 - 회원탈퇴 혹은 자격이 상실되는 경우에 대하여
export const serviceLeave = {
  reason6: {
    2: `In the event of membership withdrawal or loss of qualification`,
    0: `회원탈퇴 혹은 자격이 상실되는 경우에 대하여`,
    1: `会員退会または資格が喪失した場合に対して`,
  },
  definition6: {
    2: (
      <SPAN>
        <UL>
          <LI> 1. You can request withdrawal from EpicLogue at any time, and it will deactivate your account for 60 days after confirming your request. Delete the account after 60 days. </LI>
          <LI> 2. If you leave, all user postings registered in your personal area (all content within my board) will be deleted. </LI>
          <LI> 3. If you fall for the following reasons, EpicLogue may limit, suspend or lose your membership in an appropriate manner. </LI>
          <LI>
            <Margin>1&#41; In case of threatening order in the site, such as obstructing other persons' service use or stealing such information</Margin>
          </LI>
          <LI>
            <Margin>2&#41; In case of acts prohibited by law or these terms and conditions using the EpicLogue</Margin>
          </LI>
          <LI>
            <Margin>3&#41; In case of significant damage to or risked to EpicLogue servers and services.</Margin>
          </LI>
          <LI>
            <Margin>4&#41; In case other content is posted that is against the moral and aesthetic morals, preventing other users from using the service</Margin>
          </LI>
          <LI>4. If this action is repeated more than once or if the reason is not corrected within 30 days, the Epic Log may lose its membership.</LI>
          <LI>5. If a user does not have a login record to use the service for three years while using the service after signing up, EpicLogue may lose your membership.</LI>
        </UL>
      </SPAN>
    ),

    0: (
      <SPAN>
        <UL>
          <LI> 1. 여러분는 에픽로그에 언제든지 탈퇴를 요청할 수 있으며 에픽로그는 요청을 확인한 후 60일간 계정을 비활성 처리를 합니다. 60일 이후 계정을 삭제처리 합니다. </LI>
          <LI> 2. 여러분의 탈퇴가 이루어진 경우 유저 게시물 중 개인 영역(마이보드 내 모든 콘텐츠)에 등록된 게시물 일체는 삭제됩니다. </LI>
          <LI> 3. 여러분이 다음의 사유에 해당하는 경우, 에픽로그는 여러분의 회원자격을 적절한 방법으로 제한 및 정지, 상실시킬 수 있습니다. </LI>
          <LI>
            <Margin>1&#41; 다른 사람의 서비스 이용을 방해하거나 그 정보를 도용하는 등 사이트 내 질서를 위협하는 경우</Margin>
          </LI>
          <LI>
            <Margin>2&#41; 에픽로그를 이용하여 법령 또는 이 약관이 금지하거나 공서양속에 반하는 행위를 하는 경우</Margin>
          </LI>
          <LI>
            <Margin>3&#41; 에픽로그 서버 및 서비스에 심각한 피해를 입히거나 그럴 우려가 있을 경우</Margin>
          </LI>
          <LI>
            <Margin>4&#41; 그 외 도덕적 및 미풍양속에 어긋나는 콘텐츠를 게시하여 기타 유저들의 서비스 이용을 방해할 경우</Margin>
          </LI>
          <LI>4. 이러한 행위가 1회 이상 반복되거나 30일 이내에 그 사유가 시정되지 않는 경우 에픽로그는 회원자격을 상실시킬 수 있습니다.</LI>
          <LI>5. 이용자가 회원가입 후 서비스를 이용하는 도중, 3년 동안 서비스를 이용하기 위해 로그인 기록이 없는 경우, 에픽로그는 여러분의 회원자격을 상실시킬 수 있습니다.</LI>
        </UL>
      </SPAN>
    ),
    1: (
      <SPAN>
        <UL>
          <LI> 1. 皆さんはEpicLogueにいつでも退会を要請することができ、EpicLogueは要請を確認した後60日間、アカウントを無効に処理します。 60日後のアカウントを削除します。 </LI>
          <LI> 2. 退会が成立した場合、ユーザー掲示物のうち個人領域(マイボード内のすべてのコンテンツ)に登録された掲示物は削除されます。 </LI>
          <LI> 3. 次の事由に該当する場合、EpicLogueは、会員資格を適切な方法で制限·停止·喪失させることができます。</LI>
          <LI>
            <Margin>1&#41; 他人のサービス利用を妨害したり、その情報を盗用したりするなど、サイト内の秩序を脅かす場合</Margin>
          </LI>
          <LI>
            <Margin>2&#41; EpicLogueを利用して法令または本約款が禁止または公序良俗に反する行為をする場合</Margin>
          </LI>
          <LI>
            <Margin>3&#41; EpicLogueサーバ·サービスに深刻な被害を与えたり、その恐れがある場合</Margin>
          </LI>
          <LI>
            <Margin>4&#41; その他、道徳的·美風良俗に反するコンテンツを掲示し、その他ユーザーのサービス利用を妨害した場合</Margin>
          </LI>
          <LI>4. このような行為が1回以上繰り返されたり、30日以内にその理由が是正されない場合、EpicLogueは会員資格を喪失させることがあります。</LI>
          <LI>5. 利用者が会員登録後、サービスの利用中に3年間サービスの利用のためログイン記録がない場合、EpicLogueは会員資格を失うことがあります。</LI>
        </UL>
      </SPAN>
    ),
  },
};

// 일곱번째 - 에픽로그가 회원들에게 전달하는 메시지 및 통지
export const notification = {
  reason7: {
    2: `Messages and notifications that EpicLogue delivers to members`,
    0: `에픽로그가 회원들에게 전달하는 메시지 및 통지`,
    1: `EpicLogueueが会員に伝えるメッセージと通知`,
  },
  definition7: {
    2: (
      <SPAN>
        <UL>
          <LI> 1. We can send a notification or use the mail address registered with your information when EpicLogue notifies a specific user about the service. </LI>
          <LI> 2. We can send a notification or post it to the Epic Log Customer Center when the Epic Log notifies unspecified users. </LI>
        </UL>
      </SPAN>
    ),
    0: (
      <SPAN>
        <UL>
          <LI> 1. 에픽로그가 특정 유저에게 서비스에 관한 통지를 하는 경우 알림을 발송하거나 여러분 정보에 등록된 메일주소를 사용할 수 있습니다. </LI>
          <LI> 2. 에픽로그가 불특정 유저에게 통지를 하는 경우 알림을 발송하거나 에픽로그 고객센터에 게시할 수 있습니다. </LI>
        </UL>
      </SPAN>
    ),
    1: (
      <SPAN>
        <UL>
          <LI> 1. EpicLogueが特定のユーザーにサービスに関する通知をする場合、通知を送信したり、皆さん情報に登録されたメールアドレスを使用することができます。 </LI>
          <LI> 2. EpicLogueが不特定のユーザーに通知をする場合は、通知を送信したり、EpicLogueお客様センターに掲示することができます。 </LI>
        </UL>
      </SPAN>
    ),
  },
};

// 여덟번째 - 회원들의 개인정보에 대하여
export const personalInformation = {
  reason8: {
    2: `About the personal information of the members`,
    0: `회원들의 개인정보에 대하여`,
    1: `会員の個人情報について`,
  },
  definition8: {
    2: (
      <SPAN>
        <UL>
          <LI>
            {' '}
            EpicLogue collects the personal information you need in accordance with regulations to provide services. (Individual items for personal information are notified in the privacy policy.){' '}
          </LI>
        </UL>
      </SPAN>
    ),
    0: (
      <SPAN>
        <UL>
          <LI> 에픽로그는 서비스를 제공하기 위하여 규정에 따라 여러분들로부터 필요한 개인정보를 수집합니다. (개인정보에 대한 개별 항목은 개인정보처리방침에서 고지) </LI>
        </UL>
      </SPAN>
    ),
    1: (
      <SPAN>
        <UL>
          <LI> EpicLogueはサービスを提供するため、規定に従って必要な個人情報を収集します。 (個人情報に関する個別項目は、個人情報処理方針より告知) </LI>
        </UL>
      </SPAN>
    ),
  },
};

// 아홉번째 - 에픽로그가 짊어져야 할 책임
export const ourResponsibility = {
  reason9: {
    2: `the responsibility of EpicLogue`,
    0: `에픽로그가 짊어져야 할 책임`,
    1: `EpicLogueが負うべき責任`,
  },
  definition9: {
    2: (
      <SPAN>
        <UL>
          <LI> 1. EpicLogue does not commit any acts prohibited by these Terms and Conditions and strives to provide continuous and stable service. </LI>
          <LI> 2. EpicLogues build a system that makes it safe and convenient for you to use the service. </LI>
          <LI> 3. EpicLogue does not send commercial e-mail for profit you do not want. </LI>
          <LI> 4. EpicLogue is responsible for compensating you directly for any intentional or significant negligence that may be legally demonstrated. </LI>
        </UL>
      </SPAN>
    ),

    0: (
      <SPAN>
        <UL>
          <LI> 1. 에픽로그는 본 약관이 금지하는 행위를 하지 않으며 지속적이고, 안정적으로 서비스를 제공하기 위해서 노력합니다. </LI>
          <LI> 2. 에픽로그는 여러분이 안전하고 편리하게 서비스를 이용할 수 있도록 시스템을 구축합니다. </LI>
          <LI> 3. 에픽로그는 여러분이 원하지 않는 영리목적의 광고성 전자우편을 발송하지 않습니다. </LI>
          <LI> 4. 에픽로그는 여러분에게 직접적으로 여러분에게 법률적인 증명이 가능한 고의 또는 중대한 과실을 입힐 경우 이로 인한 손해를 배상할 책임이 있습니다. </LI>
        </UL>
      </SPAN>
    ),

    1: (
      <SPAN>
        <UL>
          <LI> 1. EpicLogueは本約款が禁止する行為をせず、持続的かつ安定的にサービスを提供するために努力します。 </LI>
          <LI> 2. EpicLogueは皆様が安全で便利にサービスを利用できるようシステムを構築します。 </LI>
          <LI> 3. EpicLogueは、皆さんが望まない営利目的の広告性電子メールを送信しません。 </LI>
          <LI> 4. EpicLogueは、皆さんに直接的に法律的な証明が可能な故意または重大な過失を与えた場合、これによる損害を賠償する責任があります。 </LI>
        </UL>
      </SPAN>
    ),
  },
};

// 열 열번 째 조항 - 성숙한 에픽로그 회원들이 지켜야 할 의무
export const membershipObligation = {
  reason10: {
    2: `The obligations of EpicLogue members`,
    0: `성숙한 에픽로그 회원들이 지켜야 할 의무`,
    1: `EpicLogueのメンバーが守るべき義務`,
  },
  definition10: {
    2: (
      <SPAN>
        <UL>
          <LI> 1. You should not do the following. </LI>
          <LI>
            <Margin>1&#41; What causes problems with servers and systems in EpicLogues</Margin>
          </LI>
          <LI>
            <Margin>2&#41; stealing information from others</Margin>
          </LI>
          <LI>
            <Margin>3&#41; Sending or publishing information (such as computer programs) banned by EpicLogues</Margin>
          </LI>
          <LI>
            <Margin>4&#41; Infringement of intellectual property rights, such as copyrights of EpicLogues and other third parties</Margin>
          </LI>
          <LI>
            <Margin>5&#41; An act that damages the reputation or interferes with the business of EpicLogues and other third parties</Margin>
          </LI>
          <LI>
            <Margin>6&#41; Disclosure or posting of obscene or violent words or articles, images, sounds, or other information that is contrary to law on the site of Epic Log</Margin>
          </LI>
          <LI>
            <Margin>7&#41; other illegal or unjust acts</Margin>
          </LI>
          <LI>
            <Margin>8&#41; Posting hateful content or writing comments</Margin>
          </LI>
          <LI>
            2. You must comply with the relevant statutes, the provisions of these terms and conditions, the precautions announced in connection with the instructions for use and contents, and the
            matters notified by Epic Log, etc.
          </LI>
          <LI>
            3. The EpicLogue will not be held liable for any damage caused by any act that falls under the provisions of the provision in the event you fail to fulfill your obligations or the post is
            deleted.
          </LI>
        </UL>
      </SPAN>
    ),
    0: (
      <SPAN>
        <UL>
          <LI> 1. 여러분은 다음과 같은 행위를 하여서는 안 됩니다. </LI>
          <LI>
            <Margin>1&#41; 에픽로그의 서버 및 시스템에 문제를 일으키는 행위</Margin>
          </LI>
          <LI>
            <Margin>2&#41; 타인의 정보 도용</Margin>
          </LI>
          <LI>
            <Margin>3&#41; 에픽로그가 금지한 정보(컴퓨터 프로그램 등)의 송신 또는 게시</Margin>
          </LI>
          <LI>
            <Margin>4&#41; 에픽로그와 기타 제3자의 저작권 등 지적재산권에 대한 침해</Margin>
          </LI>
          <LI>
            <Margin>5&#41; 에픽로그 및 기타 제3자의 명예를 손상시키거나 업무를 방해하는 행위</Margin>
          </LI>
          <LI>
            <Margin>6&#41; 외설 또는 폭력적인 말이나 글, 화상, 음향, 기타 법에 반하는 정보를 에픽로그의 사이트에 공개 또는 게시하는 행위</Margin>
          </LI>
          <LI>
            <Margin>7&#41; 기타 불법적이거나 부당한 행위</Margin>
          </LI>
          <LI>
            <Margin>8&#41; 타인에게 혐오감을 주는 내용을 게시하거나 댓글을 쓰는 행위</Margin>
          </LI>
          <LI>2. 여러분은 관계법령, 이 약관의 규정, 이용안내 및 콘텐츠와 관련하여 공지한 주의사항, 에픽로그가 통지하는 사항 등을 준수하여야 합니다</LI>
          <LI>3. 여러분가 의무를 이행하지 않거나 게시물이 삭제되는 경우의 조항에 해당하는 행위를 하여 발생하는 피해 사항에 대해 에픽로그는 책임지지 않습니다.</LI>
        </UL>
      </SPAN>
    ),
    1: (
      <SPAN>
        <UL>
          <LI> 1. 皆さんは、次のような行為をしてはなりません </LI>
          <LI>
            <Margin>1&#41; EpicLogueのサーバおよびシステムに問題を引き起こす行為</Margin>
          </LI>
          <LI>
            <Margin>2&#41; 他人の情報盗用</Margin>
          </LI>
          <LI>
            <Margin>3&#41; EpicLogueが禁止した情報（コンピュータプログラムなど）の送信または掲示</Margin>
          </LI>
          <LI>
            <Margin>4&#41; EpicLogueとその他の第三者の著作権など知的財産権に対する侵害</Margin>
          </LI>
          <LI>
            <Margin>5&#41; EpicLogue及びその他第三者の名誉を傷つけたり、業務を妨害する行為</Margin>
          </LI>
          <LI>
            <Margin>6&#41; わいせつまたは暴力的な言葉、文章、画像、音響、その他法に反する情報をEpicLogueのサイトに公開または掲示する行為</Margin>
          </LI>
          <LI>
            <Margin>7&#41; その他不法または不当な行為</Margin>
          </LI>
          <LI>
            <Margin>8&#41; 他人に嫌悪感を与える内容を書き込んだり、コメントを書いたりする行為</Margin>
          </LI>
          <LI>2. 皆様は関係法令、本約款の規定、利用案内およびコンテンツに関して告知した注意事項、EpicLogueが通知する事項などを遵守しなければなりません。</LI>
          <LI>3. 皆さんが義務を履行しなかったり、掲示物が削除されたりする場合の条項に該当する行為をして発生する被害事項についてEpicLogueは責任を負いません。</LI>
        </UL>
      </SPAN>
    ),
  },
};

// 열 한번 째 조항 - 회원들의 정보에 대한 의무
export const memberInformation = {
  reason11: {
    2: `the obligation of members to information`,
    0: `회원들의 정보에 대한 의무`,
    1: `会員の情報に対する義務`,
  },
  definition11: {
    2: (
      <SPAN>
        <UL>
          <LI> 1. In addition to the registration entries, EpicLogue can collect the minimum information you need to use your content. </LI>
          <LI> 2. When EpicLogue collects your personal information, it receives your consent.</LI>
          <LI> 3. EpicLogue cannot use the information you provide or provide to third parties without your consent. </LI>
          <LI> 4. You may withdraw your membership consent at any time. However, if you withdraw, all related services are not available. </LI>
          <LI> 5. You may at any time request the corrections to the perusal and error of your personal information that EpicLogue has, and it is obliged to take the necessary action. </LI>
          <LI>
            {' '}
            6. Any person who receives the Epic Log or any personal information may use the personal information to the extent you agree to, and will destroy the personal information 60 days after the
            invalidation. However, in order to prevent re-registration for 180 days after membership withdrawal, personal information can be stored only for the applicable period. I will discard it
            without delay.
          </LI>
          <LI>
            {' '}
            EpicLogue strives to protect your privacy as prescribed by the laws of your country. The relevant laws of the relevant country and the privacy policy of the Epic Log apply to the
            protection and use of personal information.
          </LI>
        </UL>
      </SPAN>
    ),

    0: (
      <SPAN>
        <UL>
          <LI> 1. 에픽로그는 회원가입 기재사항 이외에 여러분의 콘텐츠이용에 필요한 최소한의 정보를 수집할 수 있습니다. </LI>
          <LI> 2. 에픽로그가 여러분의 개인정보를 수집하는 때에는 여러분의 동의를 받습니다.</LI>
          <LI> 3. 에픽로그는 여러분이 제공한 정보를 여러분의 동의 없이 이용하거나 제3자에게 제공할 수 없습니다. </LI>
          <LI> 4. 여러분은 언제든지 회원가입 동의를 임의로 철회할 수 있습니다. 단, 철회할 경우 관련 제반 서비스를 이용할 수 없습니다. </LI>
          <LI> 5. 여러분는 언제든지 에픽로그가 가지고 있는 자신의 개인정보에 대해 열람 및 오류의 정정을 요구할 수 있으며, 에픽로그는 이에 대해 필요한 조치를 취할 의무를 집니다. </LI>
          <LI>
            {' '}
            6. 에픽로그 또는 그로부터 개인정보를 제공받은 자는 여러분가 동의한 범위 내에서 개인정보를 사용할 수 있으며, 비활성에서 60일 기간이 지난 이후 개인정보를 파기합니다. 단, 회원탈퇴 이후 180일
            동안 재가입을 방지하기 위해 해당 기간만큼 여러분의 개인정보를 보관할 수 있습니다. 이후 지체없이 파기합니다.
          </LI>
          <LI>
            {' '}
            7. 에픽로그는 정보통신망이용촉진 및 정보보호에 관한 법률 등 관계 법령이 정하는 바에 따라 여러분의 개인정보를 보호하기 위해 노력합니다. 개인정보의 보호 및 사용에 대해서는 관련법령 및
            에픽로그의 개인정보보호정책이 적용됩니다.
          </LI>
        </UL>
      </SPAN>
    ),

    1: (
      <SPAN>
        <UL>
          <LI> 1. EpicLogueは、会員登録の記載事項以外にも皆さんのコンテンツ利用に必要最小限の情報を収集できます。 </LI>
          <LI> 2. EpicLogueが個人情報を収集する際は、皆様の同意を得ます。</LI>
          <LI> 3. EpicLogueは皆様が提供した情報を皆様の同意なしに利用したり、第三者に提供することはできません。 </LI>
          <LI> 4. 皆さんは、いつでも会員登録の同意を任意に撤回できます。 ただし、撤回する場合は関連諸サービスが利用できません。 </LI>
          <LI> 5. いつでもEpicLogueが持っている自分の個人情報について閲覧およびエラーの訂正を要求することができ、EpicLogueはこれに対して必要な措置を取る義務を負います。 </LI>
          <LI>
            {' '}
            6. EpicLogueまたはそれから個人情報の提供を受けた者は、皆さんが同意された範囲内で個人情報を使用することができ、無効化から60日後は個人情報を破棄します。
            ただし、会員退会後180日間、再登録を防止するため、該当期間だけ個人情報を保管することができます。 以後遅滞なく破棄します。
          </LI>
          <LI> 7. EpicLogueは当該国の法令に基づき、皆さんの個人情報を保護するため努力します。 個人情報の保護および使用については該当国家の関連法およびEpicLogueの個人情報保護政策が適用されます。</LI>
        </UL>
      </SPAN>
    ),
  },
};

// 열 두번 째 조항 - 게시물이 삭제되는 경우와 이용이 제한되는 경우
export const removePost = {
  reason12: {
    2: ``,
    0: `게시물이 삭제되는 경우와 이용이 제한되는 경우`,
    1: ``,
  },
  definition12: {
    2: (
      <SPAN>
        <UL>
          <LI> 1. Within the Epic Log, the following actions can impose sanctions, such as deleting postings or restricting their use.</LI>
          <LI>
            <Margin>1&#41; In case other users or third parties are slandered or contain contents that are different from the facts</Margin>
          </LI>
          <LI>
            <Margin>2&#41; Where the contents contain obscene materials and abusive language against existing persons</Margin>
          </LI>
          <LI>
            <Margin>3&#41; Where it contains information deemed to be related to a criminal act</Margin>
          </LI>
          <LI>
            <Margin>4&#41; Where it includes infringement of other rights, such as copyrights of other members or third parties</Margin>
          </LI>
          <LI>
            <Margin>5&#41; Where it includes inducing religious and political disputes</Margin>
          </LI>
          <LI>
            <Margin>6&#41; In the case of infringing on other people's personal information or privacy or damaging their reputation</Margin>
          </LI>
          <LI>
            <Margin>7&#41; In case the purpose of the publication is contrary to the purpose of the publication, such as multiple postings of the same content</Margin>
          </LI>
          <LI>
            <Margin>8&#41; In case unauthorized advertisements or promotional materials are posted</Margin>
          </LI>
          <LI> 2. Service availability may be restricted if there is no room for service-related facilities, technical or business problems. </LI>
          <LI> 3. Please check out [community] for more information. </LI>
        </UL>
      </SPAN>
    ),
    0: (
      <SPAN>
        <UL>
          <LI> 1.에픽로그 내에서 다음과 같은 콘텐츠를 게시할 경우 해당 게시물을 삭제하거나 이용을 제한시키는 등의 제재를 가할 수 있습니다.</LI>
          <LI>
            <Margin>1&#41; 다른 유저 또는 제3자를 비방하거나 사실과 다른 내용이 포함되어 있는 경우</Margin>
          </LI>
          <LI>
            <Margin>2&#41; 음란물, 실존하는 인물에 대한 욕설 등이 내포되어 있는 내용이 포함되어 있는 경우</Margin>
          </LI>
          <LI>
            <Margin>3&#41; 범죄행위와 관련이 있다고 판단되는 내용이 포함되어 있는 경우</Margin>
          </LI>
          <LI>
            <Margin>4&#41; 다른 회원 또는 제3자의 저작권 등 기타 권리를 침해하는 내용이 포함되어 있는 경우</Margin>
          </LI>
          <LI>
            <Margin>5&#41; 종교적, 정치적 분쟁을 유도하는 내용이 포함되어 있는 경우</Margin>
          </LI>
          <LI>
            <Margin>6&#41; 타인의 개인정보, 사생활을 침해하거나 명예를 손상시키는 경우</Margin>
          </LI>
          <LI>
            <Margin>7&#41; 동일한 내용을 중복하여 다수 게시하는 등 게시의 목적에 어긋나는 경우</Margin>
          </LI>
          <LI>
            <Margin>8&#41; 승인되지 않은 광고, 판촉물을 게재하는 경우</Margin>
          </LI>
          <LI> 2. 서비스 관련 설비의 여유가 없거나, 기술상 또는 업무상 문제가 있는 경우 서비스 이용이 제한 될 수 있습니다. </LI>
          <LI> 3. 자세한 내용은 [커뮤니티]에서 확인바랍니다. </LI>
        </UL>
      </SPAN>
    ),
    1: (
      <SPAN>
        <UL>
          <LI> エピック ログ内での次のような行動は、掲示物の削除や利用を制限するなどの制裁を加えることができます。</LI>
          <LI>
            <Margin>1&#41; 他のユーザーまたは第三者を誹謗したり、事実と異なる内容が含まれている場合</Margin>
          </LI>
          <LI>
            <Margin>2&#41; わいせつ物、実在する人物に対する悪口等が含まれている内容が含まれている場合</Margin>
          </LI>
          <LI>
            <Margin>3&#41; 犯罪行為と関連があると判断される内容が含まれている場合</Margin>
          </LI>
          <LI>
            <Margin>4&#41; 他の会員または第三者の著作権など、その他の権利を侵害する内容が含まれている場合</Margin>
          </LI>
          <LI>
            <Margin>5&#41; 宗教的、政治的紛争を誘導する内容が含まれている場合</Margin>
          </LI>
          <LI>
            <Margin>6&#41; 他人の個人情報、プライバシーを侵害し、または名誉を傷つける場合</Margin>
          </LI>
          <LI>
            <Margin>7&#41; 同一内容を重複して多数掲示するなど、掲示の目的に反する場合</Margin>
          </LI>
          <LI>
            <Margin>8&#41; 承認されていない広告、販促物を掲載する場合</Margin>
          </LI>
          <LI> 2. サービス関連設備の余裕がなかったり、技術上または業務上問題があったりした場合、サービスの利用が制限されることがあります。 </LI>
          <LI> 3. 詳しくは「コミュニティ」にてご確認ください。 </LI>
        </UL>
      </SPAN>
    ),
  },
};

// 열 세번 째 조항 - 에픽로그에 콘텐츠를 게시하거나 이용하는 것에 대하여
export const serviceUtilization = {
  reason13: {
    2: `Regulations for posting or using content in the Epic Log`,
    0: `에픽로그에 콘텐츠를 게시하거나 이용하는 것에 대하여`,
    1: `EpicLogueにコンテンツを掲示したり利用したりすることについて`,
  },
  definition13: {
    2: (
      <SPAN>
        <UL>
          <LI> 1. When you use the Epic Log service, you must observe the following: This is a copyright-related copyright-related copyright rule and is a protocol and commitment to each other.</LI>
          <LI>
            <Margin>
              1&#41; Secondary creations can be derived for the original work. This includes derivatives such as translation, re-creation, insertion of shapes, symbols, fonts, and stories based on
              original works.
            </Margin>
          </LI>
          <LI>
            <Margin>2&#41; The copyright on the original work belongs to you who produced the original work.</Margin>
          </LI>
          <LI>
            <Margin>3&#41; The copyright on secondary creations is yours to produce secondary creations.</Margin>
          </LI>
          <LI>
            <Margin>4&#41; In the event of a conflict of rights, the original copyright holder has the authority to decide the issue.</Margin>
          </LI>
          <LI>
            <Margin>
              5&#41; Within the Epic Log, you are free to allow secondary creation. It means that you agree to this by checking the terms of service use or contracting, or by checking the consent
              column when signing up for membership. However, distribution and distribution outside of the Epic Log is prohibited. Members who wish to do so must obtain consent from the original
              copyright holder.
            </Margin>
          </LI>
          <LI>
            <Margin>
              6&#41; If the category indicates that the original author does not allow secondary creation on the contribution page in paragraph 5 above, or expresses his intention to disallow
              secondary creation, the contents of paragraph 5 shall not be valid.
            </Margin>
          </LI>
          <LI>
            <Margin>
              7&#41; When creating content that harms the original work, the original copyright holder may recommend the secondary creator to correct and delete it at any time. If the original
              copyright holder wants to do so, the secondary creator must correct and delete it immediately.
            </Margin>
          </LI>
          <LI>
            <Margin>
              8&#41; Secondary creators shall not use secondary creations commercially without the permission of the original author. Likewise, the original copyright holder prohibits commercial use
              through secondary creation without the permission of the secondary creator.
            </Margin>
          </LI>
          <LI> 2. For more information, see Copyright. </LI>
          <LI> 3. In the event of damage falling under paragraph (1), the legal responsibility shall not be borne by EpicLogue. </LI>
        </UL>
      </SPAN>
    ),

    0: (
      <SPAN>
        <UL>
          <LI> 1. 여러분이 에픽로그 서비스를 이용할 때는 다음 사항을 준수해야 합니다. 이는 저작권과 관련하여 회원간의 저작물 규칙이며 서로에 대한 규약이자 약속입니다.</LI>
          <LI>
            <Margin>1&#41; 원 저작물에 대해 2차 창작물이 파생 될 수 있습니다. 이는 원작에 대해 번역, 재창작, 도형 삽입, 부호, 글꼴 및 원 저작물을 기초로한 스토리 등의 파생 작품을 포함합니다.</Margin>
          </LI>
          <LI>
            <Margin>2&#41; 원 저작물에 대한 저작권은 원 저작물을 제작한 여러분에게 있습니다.</Margin>
          </LI>
          <LI>
            <Margin>3&#41; 2차 창작물에 대한 저작권은 2차 창작물을 제작한 여러분에게 있습니다.</Margin>
          </LI>
          <LI>
            <Margin>4&#41; 서로의 권리가 충돌할 경우 문제의 결정 권한은 원 저작권자가 가지게 됩니다.</Margin>
          </LI>
          <LI>
            <Margin>
              5&#41; 에픽로그 내에서는 2차 창작을 자유롭게 허용합니다. 여러분는 이에 대해 (서비스 이용에 동의 혹은 계약이 성립되는 조건)를 확인하거나 회원가입 시 동의란에 체크하여 회원 승인하는
              것으로서 동의함을 의미합니다. 단, 에픽로그 외부로 배포 및 유포는 금지합니다. 이를 원하는 회원은 원 저작권자에게 동의를 구하여야 합니다.
            </Margin>
          </LI>
          <LI>
            <Margin>
              6&#41; 상기 전호인 5호에서 원저작권자가 투고하기 페이지에서 2차 창작을 허용하지 않음을 카테고리에 표시하거나 2차 창작 불허 의사를 표시 할 경우에는 5호의 내용은 유효하지 않습니다.
            </Margin>
          </LI>
          <LI>
            <Margin>
              7&#41; 원저작물에 피해를 입히는 콘텐츠를 창작할 경우 원 저작권자는 2차 창작자에게 언제든지 시정 및 삭제를 권할 수 있습니다. 만약 원 저작권자가 이를 원할 경우 2차 창작자는 즉시 시정 및
              삭제를 해야합니다.
            </Margin>
          </LI>
          <LI>
            <Margin>
              8&#41; 2차 창작자는 원저작자의 허가 없이 2차 창작물을 상업적으로 이용해서는 안됩니다. 마찬가지로 원 저작권자도 2차 창작자의 허가 없이 2차 창작물을 통한 상업적 이용을 금지합니다.
            </Margin>
          </LI>
          <LI> 2. 자세한 내용은 [저작권]에서 확인바랍니다. </LI>
          <LI> 3. 1항에 해당하는 피해를 입었을 경우 법적인 책임은 에픽로그가 지지 않습니다. </LI>
        </UL>
      </SPAN>
    ),

    1: (
      <SPAN>
        <UL>
          <LI> 1. 皆さんがEpicLogueサービスを利用する際は、次の事項を遵守しなければなりません。 これは著作権に関する会員様の著作物のルールであり、お互いに対する規約であり約束します。</LI>
          <LI>
            <Margin>
              1&#41; 元著作物に対して2次創作物が派生することがあります。 これは、原作に対する翻訳、再創作、図形挿入、符号、フォント、および原著作物に基づいたストーリーなどの派生作品を含みます。
            </Margin>
          </LI>
          <LI>
            <Margin>2&#41; 元著作物の著作権は元著作物を制作した皆さんにあります。</Margin>
          </LI>
          <LI>
            <Margin>3&#41; 二次創作物の著作権は二次創作物を制作した皆さんにあります。</Margin>
          </LI>
          <LI>
            <Margin>4&#41; お互いの権利が衝突した場合、問題の決定権限は元著作権者が有します。</Margin>
          </LI>
          <LI>
            <Margin>
              5&#41; EpicLogue内では、2次創作を自由に許可します。
              皆様は、サービスの利用に同意もしくは契約が成立する条件）を確認したり、会員登録の際に同意欄にチェックして会員を承認することで同意することを意味します。
              ただし、EpicLogueの外部への配布·流布は禁止します。 これを希望する会員は、元著作権者の同意を得なければなりません。
            </Margin>
          </LI>
          <LI>
            <Margin>6&#41; 上記5号で原著作権者が投稿するページで二次創作を許可しないことをカテゴリーに表示したり二次創作不許可の意思を表示する場合は、5号の内容は有効ではありません。</Margin>
          </LI>
          <LI>
            <Margin>
              7&#41; 原著作物に被害を与えるコンテンツを創作する場合、原著作権者は2次創作者に対していつでも是正と削除をお勧めできます。
              もし元著作権者がこれを希望する場合、2次創作者は直ちに是正·削除しなければなりません。
            </Margin>
          </LI>
          <LI>
            <Margin>8&#41; 2次創作者は原著作者の許可なしに2次創作物を商業的に利用してはいけません。 同様に元著作権者も2次創作者の許可なく2次創作物による商業利用を禁止します。</Margin>
          </LI>
          <LI> 2. 詳細は[著作権]にてご確認ください。 </LI>
          <LI> 3. 1項の被害を受けた場合、法的な責任はEpicLogueが負いません。 </LI>
        </UL>
      </SPAN>
    ),
  },
};

// 열 네번 째 조항 - 서비스 이용에 동의 혹은 계약이 성립되는 조건에 대하여
export const conditionsEstablishment = {
  reason14: {
    2: `Description of conditions under which a service is agreed or contracted`,
    0: `서비스 이용에 동의 혹은 계약이 성립되는 조건에 대하여`,
    1: `サービスの利用に同意または契約が成立する条件について`,
  },
  definition14: {
    2: (
      <SPAN>
        <UL>
          <LI>
            {' '}
            1. You use the service according to the procedure provided by EpicLogue. If you proceed according to the procedure, it means that you agree to the copyright policy for publishing content.
            EpicLogue collects and provides the following information so that you can use the service without mistakes or errors.
          </LI>
          <LI>
            <Margin>1&#41; If you upload content to the Epic Log, you will be considered to have agreed at that point.</Margin>
          </LI>
          <LI>
            <Margin>2&#41; The copyright on secondary creations belongs to you who have produced secondary creations.</Margin>
          </LI>
        </UL>
      </SPAN>
    ),
    0: (
      <SPAN>
        <UL>
          <LI>
            {' '}
            1. 여러분은 에픽로그가 제공하는 절차에 의하여 서비스를 이용 합니다. 절차대로 진행할 경우 콘텐츠 게시에 대한 저작권정책에 동의함을 의미합니다. 에픽로그는 여러분이 정확하게 이해하고 실수
            또는 착오 없이 서비스를 이용할 수 있도록 다음과 같은 정보를 수집하고 또 제공합니다.
          </LI>
          <LI>
            <Margin>1&#41; 여러분이 에픽로그에 콘텐츠를 업로드를 하였을 경우 그 시점에 동의한 것으로 간주합니다.</Margin>
          </LI>
          <LI>
            <Margin>2&#41; 2차 창작물에 대한 저작권은 2차 창작물을 제작한 여러분에게 있습니다.</Margin>
          </LI>
        </UL>
      </SPAN>
    ),

    1: (
      <SPAN>
        <UL>
          <LI>
            {' '}
            1. 皆さんは、EpicLogueが提供する手順に従ってサービスを利用します。 手順通りに行う場合、コンテンツ掲示に対する著作権ポリシーに同意するという意味です。
            EpicLogueは皆さんが正確に理解しミスまたは錯誤することなくサービスを利用できるよう、次のような情報を収集·提供します。
          </LI>
          <LI>
            <Margin>1&#41; EpicLogueにコンテンツをアップロードした場合、その時点で同意したものとみなします。</Margin>
          </LI>
          <LI>
            <Margin>2&#41; 二次創作物の著作権は二次創作物を制作した皆さんにあります。</Margin>
          </LI>
        </UL>
      </SPAN>
    ),
  },
};

// 열 다섯번 째 조항 - 콘텐츠 저작권이 귀속되는 경우
export const attributionCopyright = {
  reason15: {
    2: `In case the content copyright is attributed`,
    0: `콘텐츠 저작권이 귀속되는 경우`,
    1: `コンテンツ著作権が帰属する場合`,
  },
  definition15: {
    2: (
      <SPAN>
        <UL>
          <LI>1. Copyright and other intellectual property rights to the works prepared by EpicLogue belong to EpicLogue.</LI>
          <LI>
            2. Copyright and other intellectual property rights to the works you have written belong to you. However, for the purpose of operating, exhibiting, transmitting, distributing, and
            promoting the service, EpicLogue may use the following posts to a reasonable extent without your permission
          </LI>
          <LI>
            <Margin>
              1&#41; Create compilation works within the service that do not interfere with the reproduction, modification, modification, exhibition, transfer, distribution and productivity of your
              posts
            </Margin>
          </LI>
          <LI>
            <Margin>
              2&#41; Get service alliance partners such as media, telecommunications companies to provide and promote your posts. However, in this case, EpicLogue will not provide your personal
              information other than your User ID without your consent.
            </Margin>
          </LI>
          <LI>
            <Margin>3&#41; If you intend to use the Epic Log for any purpose other than the one you post, you must obtain your consent in advance by telephone, fax, e-mail, etc. </Margin>
          </LI>
          <LI>3. Copyright and other intellectual property rights to the work provided by Affiliate Contracts among services provided by EpicLogue belong to the respective provider.</LI>
          <LI>4. You shall not use the information obtained by using the services provided by EpicLogue for profit-making purposes or third parties without the prior consent of EpicLogue.</LI>
        </UL>
      </SPAN>
    ),

    1: (
      <SPAN>
        <UL>
          <LI>1. EpicLogueが作成した著作物に関する著作権、その他の知的財産権は、EpicLogueに帰属します。</LI>
          <LI>
            2. 皆さんが作成した著作物に関する著作権その他の知的財産権は皆さんに帰属します。
            ただし、EpicLogueはサービスの運営、展示、伝送、配布、広報の目的で皆さんの別途の許諾なしに合理的な範囲内で次のように登録した掲示物を使用することができます。
          </LI>
          <LI>
            <Margin>1&#41; サービス内で皆さんの投稿の複製、修正、改造、展示、転送、配布及び著作物性を害さない範囲での編集著作物の作成</Margin>
          </LI>
          <LI>
            <Margin>
              2&#41; メディア、キャリア等サービス連携パートナーに皆様の投稿内容を提供、広報してもらうこと。
              ただし、この場合、EpicLogueは別途の同意なしに皆さんの利用者ID以外の個人情報を提供することはありません。
            </Margin>
          </LI>
          <LI>
            <Margin>3&#41; EpicLogueは、掲示した目的以外の用途で使おうとする場合、電話、ファックス、電子メールなどの方法で、事前に皆様の同意を得なければなりません。 </Margin>
          </LI>
          <LI>3. EpicLogueが提供するサービスのうち、提携契約によって提供される著作物に関する著作権、その他の知的財産権は当該提供業者に帰属します。</LI>
          <LI>
            4.
            お客様はEpicLogueが提供するサービスを利用することで得た情報をEpicLogueの事前承諾なしに複製、転送、出版、配布、放送その他の方法により営利目的で利用、または第三者に利用させてはなりません。
          </LI>
        </UL>
      </SPAN>
    ),
    0: (
      <SPAN>
        <UL>
          <LI>1. 에픽로그가 작성한 저작물에 대한 저작권, 기타 지적재산권은 에픽로그에 귀속합니다.</LI>
          <LI>
            2. 여러분이 작성한 저작물에 대한 저작권 기타 지적재산권은 여러분에 귀속합니다. 단, 에픽로그는 서비스의 운영, 전시, 전송, 배포, 홍보의 목적으로 여러분의 별도의 허락 없이 합리적인 범위
            내에서 다음과 같이 여러분이 등록한 게시물을 사용할 수 있습니다.
          </LI>
          <LI>
            <Margin>1&#41; 서비스 내에서 여러분의 게시물 복제, 수정, 개조, 전시, 전송, 배포 및 저작물성을 해치지 않는 범위 내에서의 편집 저작물 작성</Margin>
          </LI>
          <LI>
            <Margin>
              2&#41; 미디어, 통신사 등 서비스 제휴 파트너에게 여러분의 게시물 내용을 제공, 홍보하게 하는 것. 단, 이 경우 에픽로그는 별도의 동의 없이 여러분의 이용자ID 외에 여러분의 개인정보를 제공하지
              않습니다.
            </Margin>
          </LI>
          <LI>
            <Margin>3&#41; 에픽로그는 게시한 목적 이외의 용도로 사용하려고 할 경우 전화, 팩스, 전자우편 등의 방법을 통해 사전에 여러분의 동의를 얻어야 합니다. </Margin>
          </LI>
          <LI>3. 에픽로그가 제공하는 서비스 중 제휴계약에 의해 제공되는 저작물에 대한 저작권 기타 지적재산권은 해당 제공업체에 귀속합니다.</LI>
          <LI>
            4. 여러분은 에픽로그가 제공하는 서비스를 이용함으로써 얻은 정보를 에픽로그의 사전승낙 없이 복제, 전송, 출판, 배포, 방송, 기타 방법에 의하여 영리목적으로 이용하거나 제3자에게 이용하게
            하여서는 안됩니다.
          </LI>
        </UL>
      </SPAN>
    ),
  },
};

// 열 여섯번 째 조항 - 광고게재에 대한 방침
export const advertisingPolicy = {
  reason16: {
    2: `Policy on advertising`,
    0: `광고게재에 대한 방침`,
    1: `広告掲載の方針`,
  },
  definition16: {
    2: (
      <SPAN>
        <UL>
          <LI>
            1. Part of the service that EpicLogue can provide you with comes from advertising revenue. You agree with advertisements and other advertisements that are exposed to service using the
            content of your registered posts.
          </LI>
          <LI>2. EpicLogue shall not be held liable for any loss or damage caused by your participation in the advertiser's promotional activities on or through the service.</LI>
        </UL>
      </SPAN>
    ),
    0: (
      <SPAN>
        <UL>
          <LI>
            1. 에픽로그가 여러분에게 서비스를 제공할 수 있는 서비스의 일부는 광고를 통한 수익으로부터 발생합니다. 여러분은 여러분이 등록한 게시물의 내용을 활용한 광고게재 및 기타 서비스상에 노출되는
            광고게재에 대해 동의합니다.
          </LI>
          <LI>2. 에픽로그는 서비스상에 게재되어 있거나 서비스를 통한 광고주의 판촉활동에 여러분이 참여하여 발생하는 손실과 손해에 대해 책임을 지지 않습니다</LI>
        </UL>
      </SPAN>
    ),
    1: (
      <SPAN>
        <UL>
          <LI>
            1. EpicLogueが皆様にサービスを提供できるサービスの一部は、広告による収益から発生します。 皆様は登録した掲示物の内容を活用した広告やその他のサービスに露出する広告掲載に同意してください。
          </LI>
          <LI>2. EpicLogueはサービス上に掲載されていたり、サービスを通じた広告主の販促活動に皆さんが参加したことによる損失と損害に対しては責任を負いません。</LI>
        </UL>
      </SPAN>
    ),
  },
};

// 열 일곱번 째 조항 - 본 약관이 개정되는 경우에 대하여
export const termsRevised = {
  reason17: {
    2: `In the event that these Terms and Conditions are amended`,
    0: `본 약관이 개정되는 경우에 대하여`,
    1: `本約款が改正される場合について`,
  },
  definition17: {
    2: (
      <SPAN>
        <UL>
          <LI>
            EpicLogue may amend these Terms from time to time, to the extent that they do not violate international law. However, the modifications are not retrospective and only the latest version of
            this Agreement defines the relationship between you and EpicLogue.
          </LI>
          <LI>
            2. If Epic Log revises the terms and conditions, the service initialization page with the current terms and conditions will be notified 7 days prior to the application date, and the
            revised terms and conditions will be sent to you by e-mail.
          </LI>
          <LI>3. You agree to be subject to the amended terms and conditions by continuing to access and use this service after the amendments take effect.</LI>
        </UL>
      </SPAN>
    ),
    0: (
      <SPAN>
        <UL>
          <LI>
            1. 에픽로그는 온라인 디지털콘텐츠산업 발전법, 전자상거래 등에서의 소비자보호에 관한 법률, 약관의 규제에 관한 법률 등 관련법을 위배하지 않는 범위에서 이 약관을 수시로 개정할 수 있습니다.
            단, 수정사항은 소급적용되지 않으며, 본 약관의 최신 버전만이 에픽로그와 여러분 간의 관계를 규정합니다.
          </LI>
          <LI>
            2. 에픽로그가 약관을 개정할 경우에는 적용일자 및 개정사유를 명시하여 현행 약관과 함께 서비스 초기화면에 그 적용일자 7일 이전부터 공지하고, 기존 여러분에게는 개정약관을 전자우편주소로
            발송합니다.
          </LI>
          <LI>3. 여러분은 개정 사항이 발효한 이후 본 서비스를 계속해서 접근 및 이용함으로써 개정된 본 약관의 적용을 받는 것에 동의합니다.</LI>
        </UL>
      </SPAN>
    ),
    1: (
      <SPAN>
        <UL>
          <LI>1. EpicLogueは国際法を違反しない範囲内で本約款を随時改訂することができます。 ただし、修正事項は遡及適用されず、本約款の最新バージョンのみがEpicLogueと皆さんの関係を規定します。</LI>
          <LI>2. EpicLogueが約款を改訂する場合、適用日及び改訂事由を明示し、現行約款とともにサービス初期画面にその適用日の7日前から告知し、既存の皆様には改訂約款を電子メールアドレスに送信します。</LI>
          <LI>3. EpicLogueは国際法を違反しない範囲内で本約款を随時改訂することができます。 ただし、修正事項は遡及適用されず、本約款の最新バージョンのみがEpicLogueと皆さんの関係を規定します。</LI>
        </UL>
      </SPAN>
    ),
  },
};

// 열 여덟번 째 조항 - 에픽로그가 면책되는 경우
export const caseOfImmunity = {
  reason18: {
    2: `If EpicLogueue is exempted`,
    0: `에픽로그가 면책되는 경우`,
    1: `EpicLogueueが免責される場合`,
  },
  definition18: {
    2: (
      <SPAN>
        <UL>
          <LI>1. If EpicLogue is unable to provide services due to an uncontrollable natural disaster or equivalent, it will be exempted from liability under these terms and conditions.</LI>
          <LI>2. EpicLogue will not be held responsible for any disruption in the use of content and services due to your attributable reasons.</LI>
          <LI>3. EpicLogue shall not be held responsible for the information, data, reliability, and accuracy of the facts you post.</LI>
          <LI>4. EpicLogue shall not be held responsible for disputes arising between you and your membership, or between you and a third party through the medium of content.</LI>
          <LI>5. If the interpretation of the terms and conditions conflicts with each country, the terms and conditions of the Korean standard take precedence.</LI>
        </UL>
      </SPAN>
    ),
    0: (
      <SPAN>
        <UL>
          <LI>1. 에픽로그는 컨트롤 할 수 없는 천재지변 혹은 이와 맞먹는 사태로 인하여 서비스를 제공할 수 없는 경우에는 본 약관에 관한 책임이 면제됩니다.</LI>
          <LI>2. 에픽로그는 여러분의 귀책사유로 인한 콘텐츠 및 서비스 이용의 장애에 대하여는 책임을 지지 않습니다</LI>
          <LI>3. 에픽로그는 여러분이 게재한 콘텐츠와 관련하여 해당 정보, 자료, 사실의 신뢰도, 정확성 등의 내용에 관하여는 책임을 지지 않습니다.</LI>
          <LI>4. 에픽로그는 여러분와 회원 상호간 또는 여러분와 제3자 간에 콘텐츠를 매개로 하여 발생한 분쟁 등에 대하여 책임을 지지 않습니다.</LI>
          <LI>5. 해당 약관의 해석이 각국과 충돌할 경우 대한민국 기준의 약관이 우선됩니다</LI>
        </UL>
      </SPAN>
    ),
    1: (
      <SPAN>
        <UL>
          <LI>1. EpicLogueはコントロールできない天災地変、またはこれに匹敵する事態によりサービスを提供できない場合には、本約款に関する責任が免除されます。</LI>
          <LI>2. エピック ∙ ログは皆さんの帰責事由によるコンテンツおよびサービス利用の障害に対しては責任を負いません</LI>
          <LI>3. EpicLogueは皆さんが掲載したコンテンツと関連し該当情報、資料、事実の信頼度、正確性などの内容に関しては責任を負いません。</LI>
          <LI>4. EpicLogueは、皆様と会員相互間、または皆様と第三者との間にコンテンツを媒介して発生した紛争などについて、責任を負いません。</LI>
          <LI>5. 当該約款の解釈が各国と衝突する場合、韓国基準の約款が優先されます。</LI>
        </UL>
      </SPAN>
    ),
  },
};

// 열 아홉번 째 조항 - 분쟁을 해결하기 위한 노력
export const disputeOccurrence = {
  reason19: {
    2: `efforts to settle a dispute`,
    0: `분쟁을 해결하기 위한 노력`,
    1: `紛争を解決するための努力`,
  },
  definition19: {
    2: (
      <SPAN>
        EpicLogue will take appropriate and prompt action to reflect your legitimate opinions or complaints in the event of a dispute. However, if it is difficult to proceed quickly, EpicLogue will
        notify you of the reason and schedule of the processing.
      </SPAN>
    ),
    0: (
      <SPAN>
        에픽로그는 분쟁이 발생하였을 경우에 여러분이 제기하는 정당한 의견이나 불만을 반영하여 적절하고 신속한 조치를 취합니다. 다만, 신속한 처리가 곤란한 경우에 에픽로그는 여러분에게 그 사유와
        처리일정을 통보합니다
      </SPAN>
    ),
    1: (
      <SPAN>
        EpicLogueは紛争が発生した場合、皆様の提起する正当な意見や不満を反映し適切かつ迅速な措置をとります。 ただし, 迅速な処理が困難な場合にはエピック ∙ ログはあなたにその理由と処理日程を通知します
      </SPAN>
    ),
  },
};
