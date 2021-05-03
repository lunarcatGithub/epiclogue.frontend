import {useContext} from 'react';
import { LanguageContext } from '@store/App_Store';
import { 
  LangLogin, 
  socialLogin, 
  langSignUpComplete, 
  langSignUp, 
  signUpError,
  langSignInPopup,
  authPage
} from '@language/Lang.Login';
import { LangCommon } from '@language/Lang.Common';

export default function LoginLanguage(){
  const { langState } = useContext(LanguageContext);
  const { selectedLanguage, defaultLanguage } = langState;

  // signin
  const { idPlaceHolder, pwPlaceHolder, loginButton, signUpButton, snsLoginDesc, loginFailHolder, leaveUser, lostPassword, backLogin } = LangLogin;
  const { googleAccount, facebookAccount, kakaoAccount, loginErr } = socialLogin;
  const _idPlaceHolder = idPlaceHolder[selectedLanguage] || idPlaceHolder[defaultLanguage],
        _pwPlaceHolder = pwPlaceHolder[selectedLanguage] || pwPlaceHolder[defaultLanguage],
        _loginButton = loginButton[selectedLanguage] || loginButton[defaultLanguage],
        _signUpButton = signUpButton[selectedLanguage] || signUpButton[defaultLanguage],
        _snsLoginDesc = snsLoginDesc[selectedLanguage] || snsLoginDesc[defaultLanguage],
        _loginFailHolder = loginFailHolder[selectedLanguage] || loginFailHolder[defaultLanguage],
        _googleAccount = googleAccount[selectedLanguage] || googleAccount[defaultLanguage],
        _facebookAccount = facebookAccount[selectedLanguage] || facebookAccount[defaultLanguage],
        _kakaoAccount = kakaoAccount[selectedLanguage] || kakaoAccount[defaultLanguage],
        _loginErr = loginErr[selectedLanguage] || loginErr[defaultLanguage],
        _leaveUser = leaveUser[selectedLanguage] || leaveUser[defaultLanguage],
        _lostPassword = lostPassword[selectedLanguage] || lostPassword[defaultLanguage],
        _backLogin = backLogin[selectedLanguage] || backLogin[defaultLanguage];
  
  // signup
  const { signUpTitle, signUpEmail, signUpPw, signUpPwConfirm, signUpNick, signUpDesc, agreeButton } = langSignUp;

  const { emailError, noEmail, dupliEmail, pwError, rePwError, nickError } = signUpError;

  const _signUpTitle = signUpTitle[selectedLanguage] || signUpTitle[defaultLanguage],
        _signUpEmail = signUpEmail[selectedLanguage] || signUpEmail[defaultLanguage],
        _signUpPw = signUpPw[selectedLanguage] || signUpPw[defaultLanguage],
        _signUpPwConfirm = signUpPwConfirm[selectedLanguage] || signUpPwConfirm[defaultLanguage],
        _signUpNick = signUpNick[selectedLanguage] || signUpNick[defaultLanguage],
        _signUpDesc = signUpDesc[selectedLanguage] || signUpDesc[defaultLanguage],
        _agreeButton = agreeButton[selectedLanguage] || agreeButton[defaultLanguage],
        _emailError = emailError[selectedLanguage] || emailError[defaultLanguage],
        _noEmail = noEmail[selectedLanguage] || noEmail[defaultLanguage],
        _dupliEmail = dupliEmail[selectedLanguage] || dupliEmail[defaultLanguage],
        _pwError = pwError[selectedLanguage] || pwError[defaultLanguage],
        _rePwError = rePwError[selectedLanguage] || rePwError[defaultLanguage],
        _nickError = nickError[selectedLanguage] || nickError[defaultLanguage];

  // signup complete

  const { completeTitle, completeTxt, backHome, mailConfirmBtn } = langSignUpComplete;

  const _completeTitle = completeTitle[selectedLanguage] || completeTitle[defaultLanguage],
        _completeTxt = completeTxt[selectedLanguage] || completeTxt[defaultLanguage],
        _backHome = backHome[selectedLanguage] || backHome[defaultLanguage],
        _mailConfirmBtn = mailConfirmBtn[selectedLanguage] || mailConfirmBtn[defaultLanguage];

  // login info popup
  const { closeBtn } = LangCommon;
  const { lostTitle, inputEmail, sendButton } = langSignInPopup;

  const _lostTitle = lostTitle[selectedLanguage] || lostTitle[defaultLanguage],
        _inputEmail = inputEmail[selectedLanguage] || inputEmail[defaultLanguage],
        _sendButton = sendButton[selectedLanguage] || sendButton[defaultLanguage],
        _closeBtn = closeBtn[selectedLanguage] || closeBtn[defaultLanguage];

  // auth
  const { authTitle, authSubTitle, authFailTitle, authFailSub, contact } = authPage;

  const _authTitle = authTitle[selectedLanguage] || authTitle[defaultLanguage],
        _authSubTitle = authSubTitle[selectedLanguage] || authSubTitle[defaultLanguage],
        _authFailTitle = authFailTitle[selectedLanguage] || authFailTitle[defaultLanguage],
        _authFailSub = authFailSub[selectedLanguage] || authFailSub[defaultLanguage],
        _contact = contact[selectedLanguage] || contact[defaultLanguage];

  return {
    // signin
    _idPlaceHolder,
    _pwPlaceHolder,
    _loginButton,
    _signUpButton,
    _snsLoginDesc,
    _loginFailHolder,
    _googleAccount,
    _facebookAccount,
    _kakaoAccount,
    _loginErr,
    _leaveUser,
    _lostPassword,
    _backLogin,
    // signup
    _signUpTitle,
    _signUpEmail,
    _signUpPw,
    _signUpPwConfirm,
    _signUpNick,
    _signUpDesc,
    _agreeButton,
    _emailError,
    _noEmail,
    _dupliEmail,
    _pwError,
    _rePwError,
    _nickError,
    // signup complete
    _completeTitle,
    _completeTxt,
    _backHome,
    _mailConfirmBtn,
    // login info popup
    _lostTitle,
    _inputEmail,
    _sendButton,
    _closeBtn,
    // auth
    _authTitle,
    _authSubTitle,
    _authFailTitle,
    _authFailSub,
    _contact,
  }
}
