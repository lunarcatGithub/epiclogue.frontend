import {useContext} from 'react';
import { LangMypage, LangMypageGene, LangMypageInform } from '@language/Lang.Mypage';
import { LanguageContext } from '@store/App_Store';
import { LangMypageProfile } from '@language/Lang.Mypage';
import { LangPush } from '@language/Lang.Common';

export default function MypageLanguage (){
  const { langState } = useContext(LanguageContext);

  const { selectedLanguage, defaultLanguage } = langState;
  // mypage
  const { settingProfile, profileTab, pushSetTab, generalSetTab } = LangMypage;

  const _settingProfile = settingProfile[selectedLanguage] || settingProfile[defaultLanguage],
        _profileTab = profileTab[selectedLanguage] || profileTab[defaultLanguage],
        _pushSetTab = pushSetTab[selectedLanguage] || pushSetTab[defaultLanguage],
        _generalSetTab = generalSetTab[selectedLanguage] || generalSetTab[defaultLanguage];
    
    const navArr = [
      { name: 'profile', lang: _profileTab },
      { name: 'inform', lang: _pushSetTab },
      { name: 'setting', lang: _generalSetTab },
    ];
  
    // mypage - profile
    const {
      introPlaceHoder,
      errorintro,
      setChange,
      profileEmail,
      nickChange,
      idChange,
      pwChange,
      originPw,
      newPassword,
      confirmPw,
      widthDrawl,
      widthDrawlBtn,
      widthDrawlAlert,
      changeSmallBtn,
      changeNickError,
      changeIdError,
      alreadyId,
      originPwError,
      changePwError,
      valiPwError,
      sizeError,
    } = LangMypageProfile;

    const _introPlaceHoder = introPlaceHoder[selectedLanguage] || introPlaceHoder[defaultLanguage],
          _errorintro = errorintro[selectedLanguage] || errorintro[defaultLanguage],
          _setChange = setChange[selectedLanguage] || setChange[defaultLanguage],
          _profileEmail = profileEmail[selectedLanguage] || profileEmail[defaultLanguage],
          _nickChange = nickChange[selectedLanguage] || nickChange[defaultLanguage],
          _idChange = idChange[selectedLanguage] || idChange[defaultLanguage],
          _pwChange = pwChange[selectedLanguage] || pwChange[defaultLanguage],
          _originPw = originPw[selectedLanguage] || originPw[defaultLanguage],
          _newPassword = newPassword[selectedLanguage] || newPassword[defaultLanguage],
          _confirmPw = confirmPw[selectedLanguage] || confirmPw[defaultLanguage],
          _widthDrawl = widthDrawl[selectedLanguage] || widthDrawl[defaultLanguage],
          _widthDrawlBtn = widthDrawlBtn[selectedLanguage] || widthDrawlBtn[defaultLanguage],
          _widthDrawlAlert = widthDrawlAlert[selectedLanguage] || widthDrawlAlert[defaultLanguage],
          _changeSmallBtn = changeSmallBtn[selectedLanguage] || changeSmallBtn[defaultLanguage],
          _changeNickError = changeNickError[selectedLanguage] || changeNickError[defaultLanguage],
          _changeIdError = changeIdError[selectedLanguage] || changeIdError[defaultLanguage],
          _alreadyId = alreadyId[selectedLanguage] || alreadyId[defaultLanguage],
          _originPwError = originPwError[selectedLanguage] || originPwError[defaultLanguage],
          _changePwError = changePwError[selectedLanguage] || changePwError[defaultLanguage],
          _valiPwError = valiPwError[selectedLanguage] || valiPwError[defaultLanguage],
          _sizeError = sizeError[selectedLanguage] || sizeError[defaultLanguage];
  // mypage - form
  const { notServicePush } = LangPush;

  const { contrySetting, viewLanguage, InterestLanguage, InterestLangDesc, muteSetting, muteSetDesc, changeBtn } = LangMypageGene;

  const { pushSetting, pushSetDesc, generalSetting, generalSetDesc } = LangMypageInform;

  const _contrySetting = contrySetting[selectedLanguage] || contrySetting[defaultLanguage],
        _viewLanguage = viewLanguage[selectedLanguage] || viewLanguage[defaultLanguage],
        _InterestLanguage = InterestLanguage[selectedLanguage] || InterestLanguage[defaultLanguage],
        _InterestLangDesc = InterestLangDesc[selectedLanguage] || InterestLangDesc[defaultLanguage],
        _muteSetting = muteSetting[selectedLanguage] || muteSetting[defaultLanguage],
        _muteSetDesc = muteSetDesc[selectedLanguage] || muteSetDesc[defaultLanguage],
        _changeBtn = changeBtn[selectedLanguage] || changeBtn[defaultLanguage],
        _notServicePush = notServicePush[selectedLanguage] || notServicePush[defaultLanguage],
        _pushSetting = pushSetting[selectedLanguage] || pushSetting[defaultLanguage],
        _pushSetDesc = pushSetDesc[selectedLanguage] || pushSetDesc[defaultLanguage],
        _generalSetting = generalSetting[selectedLanguage] || generalSetting[defaultLanguage],
        _generalSetDesc = generalSetDesc[selectedLanguage] || generalSetDesc[defaultLanguage];

  return {
    // mypage
    _settingProfile,
    _generalSetTab,
    navArr,
    // mypage - profile
    _introPlaceHoder,
    _errorintro,
    _setChange,
    _profileEmail,
    _nickChange,
    _idChange,
    _pwChange,
    _originPw,
    _newPassword,
    _confirmPw,
    _widthDrawl,
    _widthDrawlBtn,
    _widthDrawlAlert,
    _changeSmallBtn,
    _changeNickError,
    _changeIdError,
    _alreadyId,
    _originPwError,
    _changePwError,
    _valiPwError,
    _sizeError,
    // mypage - form
    _contrySetting,
    _viewLanguage,
    _InterestLanguage,
    _InterestLangDesc,
    _muteSetting,
    _muteSetDesc,
    _changeBtn,
    _notServicePush,
    _pushSetting,
    _pushSetDesc,
    _generalSetting,
    _generalSetDesc
  }
}