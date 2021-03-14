import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';

const AgreeCheckBtn = styled.span`
  text-align: center;
  font-weight: ${(props) => props.theme.fontWeight.font700};
  border-bottom: 1px solid ${(props) => props.theme.color.pinkColor};
  color: ${(props) => props.theme.color.pinkColor};
  margin: 2px 0;
  cursor: pointer;
`;

export const LangLogin = {
  idPlaceHolder: {
    2: 'Email or ID',
    0: '이메일/아이디',
    1: '登録メール / ID',
  },
  pwPlaceHolder: { 2: 'Password', 0: '비밀번호', 1: 'パスワード' },
  loginButton: { 2: 'LOGIN', 0: '로그인', 1: 'ログイン' },
  signUpButton: { 2: 'SIGN UP', 0: '회원가입', 1: '会員登録' },
  backLogin: {
    2: 'Go back',
    0: '뒤로가기',
    1: '後ろ向き',
  },
  snsLoginDesc: {
    2: (
      <>
        If you Login to SNS,
        <br />
        you will be considered to
        <br />
        agree to the&nbsp;
        <Link href="/policy/service">
          <a target="_blank">
            <AgreeCheckBtn>Terms</AgreeCheckBtn>
          </a>
        </Link>
        &nbsp;and&nbsp;
        <Link href="/policy/private">
          <a target="_blank">
            <AgreeCheckBtn>Privacy policy</AgreeCheckBtn>
          </a>
        </Link>
      </>
    ),
    0: (
      <>
        SNS 로그인을 하시면
        <br />
        <Link href="/policy/service">
          <a target="_blank">
            <AgreeCheckBtn>이용약관</AgreeCheckBtn>
          </a>
        </Link>
        &nbsp;및&nbsp;
        <Link href="/policy/private">
          <a target="_blank">
            <AgreeCheckBtn>개인정보 취급방침</AgreeCheckBtn>에
          </a>
        </Link>
        <br />
        동의하는 것으로 간주됩니다.
      </>
    ),
    1: (
      <>
        SNSにログインすると、
        <br />
        <Link href="/policy/service">
          <a target="_blank">
            <AgreeCheckBtn>利用規約</AgreeCheckBtn>
          </a>
        </Link>
        &nbsp;及び&nbsp;
        <Link href="/policy/private">
          <a target="_blank">
            <AgreeCheckBtn>個人情報取扱方針</AgreeCheckBtn>に
          </a>
        </Link>
        <br />
        同意するものとみなされます
      </>
    ),
  },
  loginFailHolder: {
    2: 'Check your login information again',
    0: '로그인 정보를 다시 확인해주세요!',
    1: 'ログイン情報をもう一度確認してください',
  },
  leaveUser: {
    2: 'This member does not exist or has left',
    0: '존재하지 않거나 탈퇴한 회원입니다',
    1: '存在しないまたは脱退した会員です',
  },
  lostPassword: {
    2: 'Did you forget your login information?',
    0: '로그인 정보를 잃어버리셨나요?',
    1: 'ログイン情報をお忘れですか？',
  },
};

export const langSignInPopup = {
  lostTitle: {
    2: (
      <>
        Send a link to change information
        <br /> to the email you subscribed to.
      </>
    ),
    0: (
      <>
        가입했던 이메일로
        <br />
        정보 변경 링크를 보내드려요
      </>
    ),
    1: (
      <>
        登録した電子メールに
        <br />
        情報変更リンクをお送りします
      </>
    ),
  },
  inputEmail: { 2: 'Email', 0: '이메일 입력', 1: '電子メール入力' },
  sendButton: { 2: 'SEND', 0: '발송하기', 1: '発送' },
};

export const langSignUp = {
  signUpTitle: {
    2: 'Signing up for membership🤩',
    0: '회원가입 하기🤩',
    1: '会員登録🤩',
  },
  signUpEmail: {
    2: 'EMAIL(Send authentication mail)',
    0: '이메일(인증메일 발송)',
    1: '電子メール(認証メール送信)',
  },
  signUpPw: { 2: 'PASSWORD', 0: '비밀번호', 1: 'パスワード' },
  signUpPwConfirm: {
    2: 'CONFIRM PASSWORD',
    0: '비밀번호 확인',
    1: 'パスワード確認',
  },
  signUpNick: { 2: 'NICKNAME', 0: '닉네임', 1: 'ニックネーム' },
  signUpDesc: {
    2: (
      <>
        I agree to the
        <Link href="/policy/service">
          <a target="_blank">
            <AgreeCheckBtn>&nbsp;Terms&nbsp;</AgreeCheckBtn>
          </a>
        </Link>
        &nbsp;And&nbsp;
        <Link href="/policy/private">
          <a target="_blank">
            <AgreeCheckBtn>&nbsp;Privacy policy&nbsp;</AgreeCheckBtn>
          </a>
        </Link>
      </>
    ),
    0: (
      <>
        <Link href="/policy/service">
          <a target="_blank">
            <AgreeCheckBtn>&nbsp;이용약관&nbsp;</AgreeCheckBtn>
          </a>
        </Link>
        &nbsp;및&nbsp;
        <Link href="/policy/private">
          <a target="_blank">
            <AgreeCheckBtn>&nbsp;개인정보 취급방침&nbsp;</AgreeCheckBtn>에 동의
          </a>
        </Link>
      </>
    ),
    1: (
      <>
        <Link href="/policy/service">
          <a target="_blank">
            <AgreeCheckBtn>&nbsp;利用規約&nbsp;</AgreeCheckBtn>
          </a>
        </Link>
        &nbsp;及び&nbsp;
        <Link href="/policy/private">
          <a target="_blank">
            <AgreeCheckBtn>&nbsp;個人情報取扱方針&nbsp;</AgreeCheckBtn>
          </a>
          に同意します。
        </Link>
      </>
    ),
  },
  agreeButton: { 2: 'AGREE', 0: '동의하기', 1: '同意します' },
  signUpButton: { 2: 'SIGNUP', 0: '가입완료', 1: '登録完了' },
};
export const langSignUpComplete = {
  completeTitle: {
    2: '✨Send authentication mail completed✨',
    0: '✨인증메일 발송 완료✨',
    1: '✨認証メール送信完了✨',
  },
  completeTxt: {
    2: (
      <>
        Authentication request attempted with subscribed email💘 <br />
        Your subscription will be completed by clicking on the link <br />
        in the email you sent!😀😋
      </>
    ),
    0: (
      <>
        가입한 이메일로 인증 요청을 시도했어요💘💘 <br />
        발송 된 메일의 링크를 클릭하시면
        <br />
        가입이 완료된답니다!😀
      </>
    ),
    1: (
      <>
        加入した電子メールを通じて認証要請を送りました💘 <br />
        送信されたメールのリンクをクリックすると,
        <br />
        登録が完了します!😀😋
      </>
    ),
  },
  backHome: { 2: 'Go Back', 0: '처음으로', 1: '初めての移動' },
  mailConfirmBtn: {
    2: 'Check My Mail',
    0: '메일 확인하기',
    1: 'メールを確認',
  },
};

export const authPage = {
  authTitle: {
    2: 'Authentication completed!',
    0: '인증이 완료되었습니다!',
    1: '認証が完了しました!',
  },
  authSubTitle: {
    2: 'Teleporting to the Login Page',
    0: '로그인 화면으로 텔레포트 중',
    1: 'ログインページでテレポート中',
  },
  authFailTitle: {
    2: 'Something is wrong with the authentication..😥',
    0: '인증에 실패했습니다..😥',
    1: '認証に失敗しました..😥',
  },
  authFailSub: {
    2: 'Please contact the Admin',
    0: '관리자에게 문의해주세요',
    1: '管理者にお問い合わせください',
  },
  contact: { 2: 'contact', 0: '문의하기', 1: '問い合わせる' },
};

export const signUpError = {
  emailError: {
    2: 'Email format is invali',
    0: '이메일 형식이 유효하지 않습니다',
    1: '電子メール形式が無効です',
  },
  noEmail: {
    2: 'Please enter your e-mail',
    0: '이메일을 입력해주세요',
    1: 'メールアドレスを入力してください',
  },
  dupliEmail: {
    2: 'Email already subscribed or withdrawn',
    0: '이미 가입되었거나 탈퇴한 이메일입니다',
    1: '登録済みまたは退会済みのメールアドレスです',
  },

  pwError: {
    2: 'Enter at least 8 characters, including numbers and special characters',
    0: '숫자와 특수문자 포함 8자 이상 입력해주세요',
    1: '数字と特殊文字を含めて8文字以上入力してください',
  },
  rePwError: {
    2: 'Please check again if the password is correct',
    0: '비밀번호가 정확한지 다시 확인해주세요',
    1: 'パスワードが正しいかもう一度確認してください',
  },

  nickError: {
    2: 'Please fill it out in 2 ~ 30 characters',
    0: '2 ~ 30자 내외로 작성해주세요',
    1: '2 ~ 30文字以内に作成してください',
  },
};

export const socialLogin = {
  googleAccount: {
    2: 'Login with Google',
    0: 'Google 계정으로 로그인',
    1: 'Googleアカウントでログイン',
  },
  facebookAccount: {
    2: 'Login with Facebook',
    0: 'Facebook 계정으로 로그인',
    1: 'Facebookアカウントでログイン',
  },
  kakaoAccount: {
    2: 'Login with Kakao',
    0: 'Kakao 계정으로 로그인',
    1: 'Kakaoアカウントでログイン',
  },
  loginErr: {
    2: 'Login canceled',
    0: '로그인이 취소되었습니다',
    1: 'ログインがキャンセルされました',
  }
};
