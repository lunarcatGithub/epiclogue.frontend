import styled from 'styled-components';

const UL = styled.ul`
  font-weight: 500;
  line-height: 1.2em;
`;
const LI = styled.li`
  font-weight: 400;
  line-height: 1.2em;
  padding-left: 0.2em;
  padding-top: 0.4em;
`;
export const Develop201212 = {
  developTitle201212: {
    2: '📢Quadratic function improvement',
    0: '📢4차 기능 개선',
    1: '📢4次機能改善',
  },
  developSub201212: {
    2: (
      <UL>
        The way you write your feedback has changed. Below are the added patches!
        <LI>✔️ When you post, you can now use the tag function. Tag search is not yet done😥 but you can write with hashtags in the Viewer or Myboard!</LI>
        <LI>✔️ We fixed a bug that didn't follow Myboard🐞</LI>
        <LI>⌛ The editor development has been completed and is being published in service.</LI>
        <LI>⌛ The Notification has a function bug. It's under repair!</LI>
      </UL>
    ),

    0: (
      <UL>
        피드백 작성 방식이 변경되었어요 아래는 추가된 패치 내용이랍니다!
        <LI>✔️ 글을 작성할 때, 이제는 태그 기능을 이용할 수 있어요. 태그 검색은 아직이지만😥 내 게시물 혹은 마이보드에서 해시태그를 이용해 글을 작성할 수 있습니다!</LI>
        <LI>✔️ 마이보드 내에서 팔로우 기능에 있던 버그를 수정했어요🐞 팔로잉 되지 않던 문제를 해결했습니다!</LI>
        <LI>⌛ 현재 에디터 개발이 완료되어 서비스 내 탑재중이에요</LI>
        <LI>⌛ 알림에 기능 버그가 생겨 수리중에 있어요!</LI>
      </UL>
    ),

    1: (
      <UL>
        フィードバックの作成方式が変更されました。 以下は追加されたパッチ内容です
        <LI>✔️ 投稿の際、タグ機能を利用することができます。 タグ検索はまだですが😥 ビューアーまたはマイボードでハッシュタグを利用して投稿できます!</LI>
        <LI>✔️ マイボード内でフォロー機能にあったバグを修正しました🐞 フォロー中が作動しなかった問題を解決しました</LI>
        <LI>⌛ 現在エディタの開発が完了したため、サービス内に搭載中です</LI>
        <LI>⌛ 通知に機能バグができて修理中です🐞</LI>
      </UL>
    ),
  },
};

export const Develop201210 = {
  developTitle201210: {
    2: '📢Third function improvement',
    0: '📢3차 기능 개선',
    1: '📢3次機能改善',
  },
  developSub201210: {
    2: <UL>Add social login capabilities🔒 You can log-in through Google and Facebook! And then we added notification function that can be checked when a post is bookmarked and liked.🔔</UL>,
    0: <UL>소셜 로그인 기능을 추가했어요🔒 구글과 페이스북으로 로그인이 가능합니다! 그리고 알림 기능을 추가했어요🔔 이제 팔로우와 게시물에 좋아요, 북마크를 하면 알림으로 확인할 수 있답니다🤗</UL>,
    1: <UL>ソーシャルログイン機能を追加しました🔒 GoogleとFacebookでログインできます！ そして通知機能を追加しました🔔もしフォローと投稿にいいねやブックマークをすると通知で確認できます🤗</UL>,
  },
};

export const Develop201130 = {
  developTitle201130: {
    2: '📢Second function improvement',
    0: '📢2차 기능 개선',
    1: '📢2次機能改善',
  },
  developSub201130: {
    2: (
      <UL>
        ❗In this patch, We hid the header while scrolling so that you can focus more on posts We also blocked the background from scrolling when it was popup😉 Now You can't see the deleted contents
        and private posts!
      </UL>
    ),
    0: (
      <UL>
        ❗이번 패치에서 콘텐츠 감상에 집중할 수 있게 헤더를 스크롤 할 때는 숨겨놓았어요👍 또 팝업 띄울 때 백그라운드가 스크롤 되지 않도록 막았답니다😉 삭제된 콘텐츠와 비공개 게시물은 이제
        보이지않아요!
      </UL>
    ),
    1: (
      <UL>
        ❗今回のパッチで作品の感想に集中できるように、ヘッダーをスクロールするときは隠しておきました👍 またポップアップ表示の時、バックグラウンドが スクロールされないように防ぎました😉
        削除されたコンテンツと非公開投稿はもう見えません!
      </UL>
    ),
  },
};

export const Develop201126 = {
  developTitle201126: {
    2: '📢First function improvement',
    0: '📢1차 기능 개선',
    1: '📢1次機能改善',
  },
  developSub201126: {
    2: (
      <UL>
        ✨We solved the error of not being able to sign up by browser when registering as a member! We also improved the feedback viewing function and loading bar layout🎉 You can put your
        long-awaited contents on Myboard! Finally, you're able to create a second one, so please use it a lot😘
      </UL>
    ),
    0: (
      <UL>
        ✨회원가입시 브라우저별 가입이 안되던 오류를 해결했어요 그리고 피드백 더보기 기능과 로딩바 레이아웃을 개선했답니다🎉 대망의 마이보드에 콘텐츠를 담을 수 있게 되었어요! 마지막으로 2차 창작이
        가능해졌으니 많은 이용 부탁드려요😘
      </UL>
    ),
    1: (
      <UL>
        ✨会員登録時にブラウザ別に登録ができなかったエラーを解決しました。 そして、フィードバックザ表示機能とローディングバーレイアウトを改善しました🎉
        待ちに待ったマイボードにコンテンツを保存できるようになったんです! 最後に2次創作が可能になったので 多くの利用をお願いします😘
      </UL>
    ),
  },
};

export const Develop201116 = {
  developTitle201116: {
    2: '🎈Alpha Test Open🎈',
    0: '🎈알파테스트 오픈🎈',
    1: '🎈アルファテスト·オープン🎈',
  },
  developSub201116: {
    2: (
      <UL>
        Welcome to EpicLogue!🙆‍♂️ All functions under development or functions to be developed with feedback will be recorded in the development note. We will do our best to make it a service that grows
        together🥰
      </UL>
    ),
    0: <UL>에픽로그 방문을 환영합니다!🙆‍♂️ 개발중인 기능 혹은 피드백을 받아 개발하는 기능은 전부 개발노트에 기록할 예정이니, 함께 성장해 나가는 서비스가 될 수 있도록 노력하겠습니다🥰</UL>,
    1: <UL>EpicLogueへようこそ!🙆‍♂️ 開発中の機能やフィードバックを受けて開発する機能はすべて開発ノートに記録する予定ですので、一緒に成長していくサービスができるように努力します🥰</UL>,
  },
};
