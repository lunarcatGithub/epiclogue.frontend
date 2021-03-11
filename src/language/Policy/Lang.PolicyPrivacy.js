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
    font-size: 0.9em;
  }
`;

const UL = styled.ul``;
const LI = styled.li`
  text-indent: -1.1em;
  margin-left: 1em;
`;
const Margin = styled.span``;

// 첫번째 - 에픽로그는 회원의 개인정보를 중요하게 생각합니다
export const personalInform = {
  reason1: {
    2: `EpicLogue value members' personal information.`,
    0: `에픽로그는 회원의 개인정보를 중요하게 생각합니다`,
    1: `EpicLogueは会員の個人情報が重要だと考えています`,
  },
  definition1: {
    2: (
      <SPAN>
        Our EpicLogue is very important in protecting users' personal information, and we do our best to protect the personal information provided to Epic Log online while using the related services
        of Epic Log. EpicLogue complies with the laws and regulations of privacy that information and communication service providers must follow.
      </SPAN>
    ),
    0: (
      <SPAN>
        저희 에픽로그는 이용자의 개인정보보호를 매우 중요시하며, 이용자가 에픽로그의 관련 서비스를 이용함과 동시에 온라인상에서 에픽로그에 제공한 개인정보가 보호 받을 수 있도록 최선을 다하고 있습니다.
        에픽로그는 정보통신 서비스제공자가 지켜야 하는 법규 및 개인정보보호에 관한 규정을 준수하고 있습니다.
      </SPAN>
    ),
    1: (
      <SPAN>
        私たちEpicLogueは利用者の個人情報保護を非常に重要視しており、利用者がEpicLogueの関連サービスを利用すると同時にオンライン上でEpicLogueに提供した個人情報が保護されるよう最善を尽くしています。
        EpicLogueは情報通信サービス提供者が守らなければならない法規および個人情報保護に関する規定を遵守しています。
      </SPAN>
    ),
  },
};
// 두번째 - 귀하의 정보를 수집하려는 이유

export const reasonCollection = {
  reason2: {
    2: `Why do you want to collect your information?`,
    0: `귀하의 정보를 수집하려는 이유`,
    1: `会員の情報を収集しようとする理由`,
  },
  definition2: {
    2: (
      <SPAN>
        Personal information refers to information about a surviving individual that identifies that individual user (including information that can be easily combined with other information, even if
        that information alone cannot identify that individual).
        <SubTitle>Purpose of collecting personal information</SubTitle>
        The purpose of EpicLogue is to collect personal information from users is to provide optimal service to users.Epic Log provides various contents for free or for free.Epicog displays customized
        content and advertisements that you may be interested in based on information collected from you and third parties.Epic logs always use this information based on appropriate legal grounds.
        <SubTitle>Use of personal information</SubTitle>
        It can be used for the process of identification, personal identification, prevention of fraudulent use and non-authorization of membership, complaints, complaint handling, notice delivery,
        other communication procedures, personalized services, age-specific services, etc.
      </SPAN>
    ),
    0: (
      <SPAN>
        개인정보란 생존하는 개인에 관한 정보로서 해당 이용자 개인을 식별할 수 있는 정보(당해 정보만으로는 특정 개인을 식별할 수 없더라도 다른 정보와 용이하게 결합하여 식별할 수 있는 것을 포함함)를
        말합니다.
        <SubTitle>개인정보 수집목적</SubTitle>
        에픽로그가 이용자 개인의 정보를 수집하는 목적은 이용자에게 최적의 서비스를 제공하기 위한 것입니다.에픽로그는 각종의 콘텐츠를 유/무료로 서비스하고 있습니다.에픽로그는 회원님과 타사로부터 수집한
        정보를 토대로 회원님이 관심을 가질 만한 맞춤 콘텐츠와 광고를 표시합니다.에픽로그는 항상 적절한 법적 근거를 바탕으로 이러한 정보를 사용합니다.
        <SubTitle>개인정보 이용</SubTitle>
        회원제 서비스 이용에 따른 본인확인, 개인 식별, 불량회원의 부정 이용 방지와 비인가 사용 방지, 가입 의사 확인, 불만처리, 민원처리, 고지사항 전달, 기타 의사소통을 위한 절차 및 이벤트,
        개인맞춤서비스, 연령별 서비스 등 정보의 전달을 위한 절차에 이용될 수 있습니다.
      </SPAN>
    ),
    1: (
      <SPAN>
        個人情報とは、生存する個人に関する情報であって、当該利用者個人を識別できる情報（当該情報だけでは特定の個人を識別できなくても、他の情報と容易に結合して識別できるものを含む。）をいいます。
        <SubTitle>個人情報収集目的</SubTitle>
        EpicLogueが利用者個人の情報を収集する目的は、利用者に最適のサービスを提供するためのものです。EpicLogueは各種のコンテンツを有料もしくは無料でサービスしております。
        EpicLogueは、会員様と他社から収集した情報に基づき、会員様が関心を持ちそうなマッチュムコンテンツと広告を表示します。EpicLogueは常に適切な法的根拠に基づいてこのような情報を使用します。
        <SubTitle>個人情報の利用</SubTitle>
        会員制サービスの利用による本人確認、個人識別、不良会員の不正利用の防止と不認可使用の防止、登録意思の確認、苦情処理、苦情処理、告知事項の伝達、その他の意思疎通のための手続き及びイベント、個人カスタマイズサービス、年齢別サービスなど、情報伝達のための手続きに利用することができます。
      </SPAN>
    ),
  },
};

// 세번째 - 에픽로그가 회원의 정보를 수집하는 항목과 수집방법

export const collectionItem = {
  reason3: {
    2: `What and how the EpicLogue collects information about its members`,
    0: `에픽로그가 회원의 정보를 수집하는 항목과 수집방법`,
    1: `EpicLogueが会員の情報を収集する項目と収集方法`,
  },
  definition3: {
    2: (
      <SPAN>
        EpicLogue collects minimal personal information for smooth service delivery. Users can collect minimal information when they sign up (required by agreement of terms and conditions) or
        according to the service usage process, and the details are as follows.
        <SubTitle>Personal Information Collection Items</SubTitle>
        <UL>
          <LI>Collection list when signing up - ID, password, nickname, email</LI>
          <LI>
            List that can be collected when using the service - Service usage record, cookie, IP address, location, photo, comment, device information, defect usage record, gender, age, member
            information modification, etc.
          </LI>
          <LI>
            When reporting a post - Personal information included in the user's inquiry/answer, copy of business registration certificate/copy of personal identification card/delegation (agent's
            information), etc. when reporting copyright/personal information.
          </LI>
        </UL>
        <SubTitle>Matters concerning the automatic collection, operation, and refusal of personal information</SubTitle>
        <UL>
          <LI>
            When you use websites, mobile apps, or other Internet services, specific Internet and electronic network activity information is automatically generated and recorded. The same is true of
            using EpicLogue. The following types of information are collected from the EpicLogue
          </LI>
          <LI>
            <Margin>
              1&#41; Purpose of customized service provided through cookies - To provide customized information optimized for users by tracking usage patterns and traces such as users' access
              frequency and visit time, identifying users' tastes and interests.
            </Margin>
          </LI>
        </UL>
        <SubTitle>Installing, operating, and rejecting cookies</SubTitle>
        <UL>
          <LI>1&#41; Log Analysis with Google Analytics </LI>
          <LI>
            <Margin>
              -EpicLogue is using Google Analytics to analyze logs. The user cannot be identified and is used only for overall log analysis. Users can refuse to collect Google Analytics. (Use 'Cookie
              Settings Blocker' or 'Google Analytics Blocking Browser Add-ons')
            </Margin>
          </LI>
        </UL>
      </SPAN>
    ),
    0: (
      <SPAN>
        에픽로그는 원활한 서비스 제공을 위해 최소한의 개인정보를 수집하고 있습니다. 이용자는 회원 가입 시(약관동의 필수) 또는 서비스 이용 과정에 따라 최소한의 정보가 수집될 수 있으며 해당 내용은
        아래와 같습니다.
        <SubTitle>개인정보 수집항목</SubTitle>
        <UL>
          <LI>회원가입 시 - 아이디, 비밀번호, 닉네임, 이메일</LI>
          <LI>서비스 이용 시 - 서비스 이용 기록, 쿠키, IP주소, 위치, 사진, 댓글, 기기 정보, 불량 이용 기록, 성별, 나이, 회원정보 수정 등</LI>
          <LI>게시물 신고 시 - 이용자의 문의/답변 내용에 포함된 개인정보, 저작권/개인정보침해 신고 시 사업자등록증 사본/개인 신분증 사본/위임장 정보(대리인 정보) 등</LI>
        </UL>
        <SubTitle>개인정보 자동 수집과 운영 및 거부에 관한 사항</SubTitle>
        <UL>
          <LI>
            웹사이트, 모바일 앱, 기타 인터넷 서비스를 사용할 때는 특정 인터넷 및 전자 네트워크 활동 정보가 자동으로 생성되어 기록됩니다.에픽로그를 사용할 때에도 마찬가지입니다.에픽로그에서 수집하는
            정보의 유형은 다음과 같습니다.
          </LI>
          <LI>
            <Margin>
              1&#41; 쿠키를 통한 맞춤화 서비스 제공 쿠키의 사용 목적 - 이용자들의 접속 빈도나 방문 시간 등 이용형태와 자취 등을 추적해 이용자들의 취향과 관심분야를 파악하여 이용자에게 최적화된 맞춤형
              정보를 제공하기 위함입니다.
            </Margin>
          </LI>
        </UL>
        <SubTitle>쿠키 설치, 운영 및 거부</SubTitle>
        <UL>
          <LI>1&#41; 구글 애널리틱스를 통한 로그 분석 </LI>
          <LI>
            <Margin>
              -에픽로그는 구글 애널리틱스(Google Analytics)를 이용하여 로그 분석을 하고 있습니다. 이용자를 식별할 수 없으며 전체적인 로그 분석에만 이용합니다. 이용자는 구글 애널리틱스 수집을 거부할 수
              있습니다. ('쿠키 설정 차단' 혹은 '구글 애널리틱스 차단 브라우저 부가 기능' 사용)
            </Margin>
          </LI>
        </UL>
      </SPAN>
    ),
    1: (
      <SPAN>
        EpicLogueは、円滑なサービス提供のため、最小限の個人情報を収集しております。
        利用者は、会員登録時(約款の同意が必要)またはサービスの利用過程によっては最小限の情報が収集されることがあり、この内容は以下の通りです。
        <SubTitle>個人情報収集項目</SubTitle>
        <UL>
          <LI>会員登録時に収集リスト - ID、パスワード、ニックネーム、メールアドレス</LI>
          <LI>サービス利用時 - サービス利用記録、クッキー、IPアドレス、位置、写真、コメント、機器情報、不良利用記録、性別、年齢、会員情報の修正など</LI>
          <LI>掲示物を申告する場合 - 利用者の問い合わせ回答内容に含まれた個人情報、著作権個人情報侵害の申告時、事業者登録証のコピー個人身分証のコピー委任状情報(代理人情報)など</LI>
        </UL>
        <SubTitle>個人情報の自動収集と運営及び拒否に関する事項</SubTitle>
        <UL>
          <LI>
            ウェブサイト、モバイルアプリ、その他のインターネットサービス使用時は、特定のインターネット及び電子ネットワーク活動情報が自動で生成·記録されます。 エピック ログを使用する場合にも同じです。
            EpicLogueで収集する情報のタイプは以下のとおりです。
          </LI>
          <LI>
            <Margin>
              1&#41; クッキーによるカスタマイズ化サービスの提供クッキーの使用目的
              利用者達の接続頻度や訪問時間など利用形態と自炊などを追跡して利用者の好みと関心分野を把握し、利用者に最適化されたカスタマイズ型情報を提供するためです。
            </Margin>
          </LI>
        </UL>
        <SubTitle>クッキーのインストール、運営、拒否</SubTitle>
        <UL>
          <LI>1&#41; Googleアナリティクスによるログ分析 </LI>
          <LI>
            <Margin>
              -EpicLogueはグーグルアナリティクス(Google Analytics)を利用してログ分析を行っています。 利用者を識別することはできず、全体的なログ分析にのみ利用します。
              ユーザーは、グーグルアナリティクス収集を拒否することができます。 (「Cookie 設定ブロック」または「Google アナリティクスブロックブラウザ付加機能」を使用)
            </Margin>
          </LI>
        </UL>
      </SPAN>
    ),
  },
};

// 네번째 - 개인정보 수집할 때, 귀하의 동의
export const consentStatus = {
  reason4: {
    2: `Your consent when collecting personal information`,
    0: `개인정보 수집할 때, 귀하의 동의`,
    1: `個人情報を収集する際、あなたの同意`,
  },
  definition4: {
    2: (
      <>
        <SPAN>
          EpicLogue acknowledges that the user has agreed to collect personal information when signing up as a member. During the membership registration process, you will be deemed to have agreed to
          collect personal information by checking the personal information collection agreement column or checking policies for members' notification and service use (e.g. by using the service).
        </SPAN>
        <SPAN>
          Where there is a request from the relevant institution pursuant to the provisions of Acts and subordinate statutes or in accordance with the procedures and methods prescribed in Acts and
          subordinate statutes for investig
        </SPAN>
        <SPAN>Where an individual is provided in an unidentifiable form for market research and marketing</SPAN>
      </>
    ),
    0: (
      <>
        <SPAN>
          에픽로그는 이용자가 회원가입을 할 경우 개인정보 수집에 대하여 동의를 하였다고 인정합니다. 회원가입 절차 중 이용약관 및 개인정보처리방침에 개인정보 수집 동의절차에서 해당 이용약관 동의란에
          체크하거나 수시로 당사가 회원들에게 알림 및 서비스 이용에 대한 정책 확인(예를 들어 서비스를 이용함으로서 회원들이 당사가 정보를 수집하고 있다는 것을 인지하고 있을 때)개인정보 수집에 대해
          동의한 것으로 간주합니다.
        </SPAN>
        <SPAN>법령의 규정에 의거하거나, 수사상 목적으로 법령에 정해진 절차와 방법에 따라 관련기관의 요구가 있는 경우</SPAN>
        <SPAN>시장조사 및 마케팅을 위하여 개인을 식별할 수 없는 형태로 제공하는 경우</SPAN>
      </>
    ),
    1: (
      <>
        <SPAN>
          EpicLogueは、利用者が会員登録をする際、個人情報の収集に同意したと認めます。
          会員登録手続きのうち利用約款及び個人情報処理方針に関する個人情報収集同意手続きにおいて当該利用約款の同意欄にチェックしたり、随時当社が会員に通知及びサービス利用に関するポリシー確認（例えば、サービスを利用することにより会員が当社が情報を収集していることを認知しているとき）個人情報の収集に同意したものとみなします。
        </SPAN>
        <SPAN>法令の規定に基づき、または捜査上の目的で法令に定められた手続と方法により関係機関の要求がある場合</SPAN>
        <SPAN>市場調査及びマーケティングのために個人を識別できない形で提供する場合</SPAN>
      </>
    ),
  },
};

// 다섯번째 - 자신의 개인정보를 열람하거나 수정하고 싶을 때
export const informModification = {
  reason5: {
    2: `When you want to access or modify your personal information`,
    0: `자신의 개인정보를 열람하거나 수정하고 싶을 때`,
    1: `自分の個人情報を閲覧し、又は修正したいとき`,
  },
  definition5: {
    2: (
      <SPAN>
        The member may access the personal information of the registered member or request correction at any time. The member's personal information can be read or corrected directly through the
        "member information" menu after logging in to our service. When the company requests correction of personal information errors, it shall not use or provide such personal information until the
        correction is completed. In addition, if wrong personal information is already provided to a third party, we will notify the third party of the result of correction without delay so that the
        correction can be made.
      </SPAN>
    ),
    0: (
      <SPAN>
        회원은 언제든지 등록되어 있는 회원의 개인정보를 열람하거나 정정을 요청할 수 있습니다. 회원 개인정보의 열람 및 정정은 당사 서비스 로그인 후 '회원정보' 메뉴를 통하여 직접 열람 또는 정정할 수
        있습니다. 당사는 개인정보의 오류에 대한 정정을 요청할 경우에는 정정을 완료하기 전까지 당해 개인정보를 이용 또는 제공하지 않습니다. 또한 잘못된 개인정보를 제3자에게 이미 제공한 경우에는 정정
        처리결과를 제3자에게 지체 없이 통지하여 정정이 이루어지도록 조치하겠습니다.
      </SPAN>
    ),
    1: (
      <SPAN>
        会員は、いつでも登録されている会員の個人情報を閲覧したり訂正を要請することができます。
        会員個人情報の閲覧および訂正は、当社サービスにログインした後、「会員情報」メニューで直接閲覧または訂正できます。
        当社は、個人情報のエラーに関する訂正を要請する場合、訂正が完了するまで当該個人情報を利用または提供しません。
        また、誤った個人情報を第三者にすでに提供した場合は、訂正処理結果を第三者に遅滞なく通知し訂正できるよう措置いたします。
      </SPAN>
    ),
  },
};
// 여섯번째 - 개인정보의 보유기간
export const informationPeriod = {
  reason6: {
    2: `Retention period of personal information`,
    0: `개인정보의 보유기간`,
    1: `個人情報の保有期間`,
  },
  definition6: {
    2: (
      <SPAN>
        The member may access the personal information of the registered member or request correction at any time. The member's personal information can be read or corrected directly through the
        "member information" menu after logging in to our service.
        <UL>
          <LI>
            <Margin>1&#41; (IP with membership, final access time): 3 months </Margin>
          </LI>
          <LI>
            <Margin>2&#41; Records of advertising: 6 months </Margin>
          </LI>
          <LI>
            <Margin>3&#41; Records of consumer complaints or dispute handling: three years </Margin>
          </LI>
        </UL>
      </SPAN>
    ),
    0: (
      <SPAN>
        회원은 언제든지 등록되어 있는 회원의 개인정보를 열람하거나 정정을 요청할 수 있습니다. 회원 개인정보의 열람 및 정정은 당사 서비스 로그인 후 '회원정보' 메뉴를 통하여 직접 열람 또는 정정할 수
        있습니다.
        <UL>
          <LI>
            <Margin>1&#41; 이용자 접속 정보(회원 가입 시 IP, 최종 접속 시간): 3개월 (통신비밀보호법)</Margin>
          </LI>
          <LI>
            <Margin>2&#41; 광고에 관한 기록: 6개월 (전자상거래등에서의 소비자보호에 관한 법률)</Margin>
          </LI>
          <LI>
            <Margin>3&#41; 소비자의 불만 또는 분쟁처리에 관한 기록: 3년 (전자상거래등에서의 소비자보호에 관한 법률)</Margin>
          </LI>
        </UL>
      </SPAN>
    ),
    1: (
      <SPAN>
        会員は、いつでも登録されている会員の個人情報を閲覧したり訂正を要請することができます。
        会員個人情報の閲覧および訂正は、当社サービスにログインした後、「会員情報」メニューで直接閲覧または訂正できます。
        <UL>
          <LI>
            <Margin>1&#41; (会員登録時IP、最終接続時間):3か月</Margin>
          </LI>
          <LI>
            <Margin>2&#41; 広告に関する記録:6か月 </Margin>
          </LI>
          <LI>
            <Margin>3&#41; 消費者の苦情又は紛争処理に関する記録:3年 </Margin>
          </LI>
        </UL>
      </SPAN>
    ),
  },
};

// 일곱번째 - 개인정보는 어떻게 파기되는가
export const destructionInformation = {
  reason7: {
    2: `How is personal information destroyed?`,
    0: `개인정보는 어떻게 파기되는가`,
    1: `個人情報はどのように破棄されるのか`,
  },
  definition7: {
    2: (
      <SPAN>
        <SubTitle>Destruction procedure</SubTitle>
        <UL>
          <LI>
            <Margin>
              1&#41; The information entered by the user for membership registration, etc. is later transferred to a separate DB (in case of paper, a separate document box) and is stored and destroyed
              for a certain period of time in accordance with the internal policy (refer to the retention and use period).
            </Margin>
          </LI>
          <LI>
            <Margin>2&#41; Personal information transferred to a separate DB is not used for any other purpose except for legal issues.</Margin>
          </LI>
        </UL>
        <SubTitle>Destruction method</SubTitle>
        <UL>
          <LI>
            <Margin>1&#41; Personal information stored in the form of an electronic file is deleted using technical methods that cannot be played back.</Margin>
          </LI>
          <LI>
            <Margin>2&#41; The personal information printed on the paper is shredded with a grinder or destroyed through incineration.</Margin>
          </LI>
        </UL>
      </SPAN>
    ),
    0: (
      <SPAN>
        <SubTitle>파기절차</SubTitle>
        <UL>
          <LI>
            <Margin>
              1&#41; 이용자가 회원가입 등을 위해 입력한 정보는 이후 별도의 DB로 옮겨져(종이의 경우 별도의 서류함) 내부 방침에 따라(개인정보의 보유 및 이용기간 참조) 일정 기간 저장된 후 파기되어
              집니다.
            </Margin>
          </LI>
          <LI>
            <Margin>2&#41; 별도 DB로 옮겨진 개인정보는 법적인 문제에 의한 경우가 아니고서는 다른 목적으로 이용되지 않습니다.</Margin>
          </LI>
        </UL>
        <SubTitle>파기방법</SubTitle>
        <UL>
          <LI>
            <Margin>1&#41; 전자적 파일형태로 저장된 개인정보는 기록을 재생할 수 없는 기술적 방법을 사용하여 삭제합니다.</Margin>
          </LI>
          <LI>
            <Margin>2&#41; 종이에 출력된 개인정보는 분쇄기로 분쇄하거나 소각을 통하여 파기합니다.</Margin>
          </LI>
        </UL>
      </SPAN>
    ),
    1: (
      <SPAN>
        <SubTitle>破棄手続き</SubTitle>
        <UL>
          <LI>
            <Margin>
              1&#41; 利用者が会員登録等のために入力した情報は、その後別途のDBに移され(紙の場合は別途の書類箱)、内部方針に従って(個人情報の保有及び利用期間を参照)、一定期間保存された後に破棄されます。
            </Margin>
          </LI>
          <LI>
            <Margin>2&#41; 別途のDBに移された個人情報は、法的な問題による場合でない限り、他の目的で利用されません。</Margin>
          </LI>
        </UL>
        <SubTitle>破棄方法</SubTitle>
        <UL>
          <LI>
            <Margin>1&#41; 電磁的ファイルの形で保存された個人情報は、記録を再生することができない技術的方法を使用して削除します。</Margin>
          </LI>
          <LI>
            <Margin>2&#41; 紙に印刷された個人情報は、シュレッダーや焼却で破棄します。</Margin>
          </LI>
        </UL>
      </SPAN>
    ),
  },
};

// 여덟번째 - 개인정보를 공유하는 파트너스
export const sharingInformation = {
  reason8: {
    2: `Partners Sharing Personal Information`,
    0: `개인정보를 공유하는 파트너스`,
    1: `個人情報を共有するパートナーズ`,
  },
  definition8: {
    2: (
      <>
        <SPAN>
          We do not currently entrust the processing of personal information, and if necessary, we can work with partners to share personal information with them. However, before doing so, we make a
          notice through the revision of the policy and obtain the consent of the members.
        </SPAN>
        <SPAN>[Third Party Information Delivery Guide]</SPAN>
        <SPAN>
          We use personal information of users only within the scope of consent at the time of collection, and do not use or disclose personal information to the outside world without prior consent
          from users.
        </SPAN>
      </>
    ),
    0: (
      <>
        <SPAN>
          당사는 현재 개인정보 처리에 대한 위탁은 하지 않고 있으며, 필요한 경우 파트너스와 협력하여 해당 업체에 개인정보를 공유할 수 있습니다. 다만 그러기 전에 정책의 개정을 통하여 공지를 하고 회원의
          동의를 얻습니다.
        </SPAN>
        <SPAN>[제3자 정보 제공 안내]</SPAN>
        <SPAN>당사는 이용자들의 개인정보를 수집 당시 동의 받은 범위 내에서만 사용하며, 이용자의 사전 동의 없이는 해당 범위를 초과하여 개인정보를 이용하거나 외부에 공개 또는 제공하지 않습니다.</SPAN>
      </>
    ),
    1: (
      <>
        <SPAN>
          当社は、現在個人情報処理に関する委託はしておらず、必要な場合はパートナーズと協力して当該企業に個人情報を共有することができます。
          但し、その前に政策の改定を通じてお知らせし、会員の同意を得ます。
        </SPAN>
        <SPAN>[第三者情報提供のご案内]</SPAN>
        <SPAN>当社は、利用者の個人情報を収集する際に同意を得た範囲内でのみ使用し、利用者の事前の同意なくして当該範囲を超過し、個人情報を利用したり外部に公開·提供することはありません。</SPAN>
      </>
    ),
  },
};

// 아홉번째 - 회원들의 개인정보를 보호하기 위한 관리 대책
export const informationProtection = {
  reason9: {
    2: `Management measures to protect members' personal information`,
    0: `회원들의 개인정보를 보호하기 위한 관리 대책`,
    1: `会員の個人情報を保護するための管理策`,
  },
  definition9: {
    2: (
      <SPAN>
        Each member's personal information is protected by your password. The technical and management measures to protect our personal information are as follows.
        <UL>
          <LI>
            <Margin>1&#41; To prevent personal information infringement by computer viruses, we use vaccine programs and prepare for new viruses through periodic updates.</Margin>
          </LI>
          <LI>
            <Margin>2&#41; In order to prevent direct access to personal information, some information is not accessible using the security function of the database.</Margin>
          </LI>
          <LI>
            <Margin>3&#41; We use firewalls and intrusion detection systems to ensure security against illegal intrusion by hackers over the Internet.</Margin>
          </LI>
          <LI>
            <Margin>
              4&#41; The authority to access personal information shall be limited to persons who perform personal information management, such as the person in charge of personal information
              protection, and other persons who are inevitable to process personal information.
            </Margin>
          </LI>
          <LI>
            <Margin>5&#41; We do not mix personal information and general data and manage it through a separate account.</Margin>
          </LI>
          <LI>
            <Margin>6&#41; We are committed to having all the technical devices available to ensure system security.</Margin>
          </LI>
        </UL>
      </SPAN>
    ),
    0: (
      <SPAN>
        각 회원의 개인정보는 귀하의 비밀번호에 의해 보호되고 있습니다. 당사의 개인정보보호를 위한 기술적, 관리적 대책은 다음과 같습니다.
        <UL>
          <LI>
            <Margin>1&#41; 컴퓨터 바이러스에 의한 개인정보의 침해를 방지하기 위하여 백신프로그램을 이용하며 주기적인 업데이트를 통해 새로운 바이러스에 대비하고 있습니다.</Margin>
          </LI>
          <LI>
            <Margin>2&#41; 개인정보에 대한 직접적인 접근을 방지하기 위하여 데이터베이스의 보안기능을 이용하여 일부 정보는 열람할 수 없도록 하고 있습니다.</Margin>
          </LI>
          <LI>
            <Margin>3&#41; 인터넷망을 통한 해커의 불법적 침입에 대비하여 방화벽과 침입탐지 시스템을 사용하여 보안에 만전을 기하고 있습니다.</Margin>
          </LI>
          <LI>
            <Margin>
              4&#41; 개인정보에 대한 접근권한을 개인정보보호 책임자 등 개인정보관리업무를 수행하는 자, 기타 업무상 개인정보의 처리가 불가피한 자로 제한하며, 그 이외의 인원이 개인정보에 접근하는 것을
              허용하지 않습니다.
            </Margin>
          </LI>
          <LI>
            <Margin>5&#41; 개인정보와 일반 데이터를 혼합하여 탑재하지 않으며, 별도의 계정을 통하여 관리하고 있습니다.</Margin>
          </LI>
          <LI>
            <Margin>6&#41; 시스템적으로 보안성을 확보하기 위해 가능한 모든 기술적 장치를 갖추려 노력하고 있습니다.</Margin>
          </LI>
        </UL>
      </SPAN>
    ),
    1: (
      <SPAN>
        各会員の個人情報は、パスワードによって保護されています。 当社の個人情報保護のための技術的、管理的対策は次のとおりです。
        <UL>
          <LI>
            <Margin>1&#41; コンピュータウイルスによる個人情報の侵害を防止するため、ワクチンプログラムを利用して周期的なアップデートを通じて新しいウイルスに備えています</Margin>
          </LI>
          <LI>
            <Margin>2&#41; 個人情報への直接的アクセスを防止するため、データベースのセキュリティ機能を利用して、一部の情報は閲覧できないようにしています。</Margin>
          </LI>
          <LI>
            <Margin>3&#41; インターネット網によるハッカーの不法侵入に備え、ファイアウォールと侵入探知システムを使用し、セキュリティに万全を期しています。</Margin>
          </LI>
          <LI>
            <Margin>
              4&#41;
              個人情報へのアクセス権限を個人情報保護責任者等の個人情報管理業務を行う者、その他の業務上の個人情報の処理が避けられない者に制限し、それ以外の者が個人情報にアクセスすることは許可されません。
            </Margin>
          </LI>
          <LI>
            <Margin>5&#41; 個人情報と一般データを併用せず、別のアカウントで管理しています。</Margin>
          </LI>
          <LI>
            <Margin>6&#41; システム的にセキュリティを確保するために可能な限り全ての技術的装置を備えようと努力しています。</Margin>
          </LI>
        </UL>
      </SPAN>
    ),
  },
};

// 열 열번 째 조항 - 만 14세 미만 아동의 개인정보
export const childInformation = {
  reason10: {
    2: `Personal information of children under 14 years of age`,
    0: `만 14세 미만 아동의 개인정보`,
    1: `満14歳未満の児童の個人情報`,
  },
  definition10: {
    2: <SPAN> EpicLogue does not allow children under the age of 14 to sign up for membership.</SPAN>,
    0: <SPAN> 에픽로그는 만 14세 미만의 아동의 회원 가입을 허용하지 않습니다.</SPAN>,
    1: <SPAN> EpicLogueは、満14歳未満の子どもの会員登録を許可しません。</SPAN>,
  },
};

// 열 한번 째 조항 - 개인정보가 침해되었을 경우
export const infringementInformation = {
  reason11: {
    2: `If personal information is violated`,
    0: `개인정보가 침해되었을 경우`,
    1: `個人情報が侵害された場合`,
  },
  definition11: {
    2: (
      <>
        <SPAN>
          EpicLogue strives to protect members' personal information and to promptly deal with complaints related to personal information. If you have any questions regarding your personal
          information, please contact the privacy center below.
        </SPAN>
        <SPAN>E-mail : support@epiclogue.com</SPAN>
      </>
    ),
    0: (
      <>
        <SPAN>
          에픽로그는 회원의 개인정보를 보호하고 개인정보와 관련한 불만을 신속하게 처리하기 위하여 개인정보보호에 힘을 쓰고 있습니다. 이용자의 개인정보와 관련한 문의사항이 있으시면 아래의 개인정보보호
          센터로 연락 주시기 바랍니다.
        </SPAN>
        <SPAN>이메일 : support@epiclogue.com</SPAN>
      </>
    ),
    1: (
      <>
        <SPAN>
          EpicLogueは、会員の個人情報を保護し、個人情報に関する苦情を迅速に処理するため個人情報保護に力を入れています。
          利用者の個人情報に関するご不明な点がありましたら、以下の個人情報保護センターへご連絡ください。
        </SPAN>
        <SPAN>Eメール : support@epiclogue.com</SPAN>
      </>
    ),
  },
};

// 열 두번 째 조항 - 그 외 정보
export const besidesThat = {
  reason12: {
    2: `Other Information`,
    0: `그 외 정보`,
    1: `その他の情報`,
  },
  definition12: {
    2: (
      <>
        <SPAN>
          This personal information processing policy will be applied from December 22, 2020, and if there is any addition, deletion, or modification of this personal information processing policy, it
          will be notified at least 7 days before the revision. However, when a significant change in user rights occurs, such as changes in personal information collected and the purpose of use, it
          shall be notified at least 15 days in advance, and the members who do not agree with the change can withdraw from the membership.
        </SPAN>
        <SPAN>Announcement date : 12/15/2020</SPAN>
        <SPAN>Effective date : 12/22/2020</SPAN>
      </>
    ),
    0: (
      <>
        <SPAN>
          이 개인정보처리방침은 2020년 12월 22일부터 적용되며, 본 개인정보처리방침의 내용 추가, 삭제 및 수정이 있을 경우 개정 최소 7일전에 당사 서비스 내의 공지사항을 통하여 고지할 것 입니다. 다만,
          수집하는 개인정보의 항목, 이용목적의 변경 등과 같이 이용자 권리의 중대한 변경이 발생할 때에는 최소 15일 전에 공지하며, 이 때 변경 내용에 대해 동의하지 않는 회원에 대해 회원 탈퇴를 할 수 있는
          안내를 포함합니다.
        </SPAN>
        <SPAN>개인정보처리방침 공고일자 : 2020년 12월 15일</SPAN>
        <SPAN>개인정보처리방침 시행일자 : 2020년 12월 30일</SPAN>
      </>
    ),
    1: (
      <>
        <SPAN>
          本個人情報処理方針は、2020年12月22日から適用され、本個人情報処理方針の内容の追加、削除、修正がある場合、改定の最低7日前までに当社サービス内のお知らせ事項を通じて告知します。
          ただし、収集する個人情報の項目、利用目的の変更などのように利用者の権利の重大な変更が発生した場合は、最低15日前に通知し、その際に変更内容に同意しない会員に対しては会員退会ができる案内が含まれます。
        </SPAN>
        <SPAN>公告日付 : 2020年 12月 15日</SPAN>
        <SPAN>施行日付 : 2020年 12月 30日</SPAN>
      </>
    ),
  },
};
