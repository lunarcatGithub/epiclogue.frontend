import {useContext} from 'react';
import { LanguageContext } from '@store/App_Store';

import { langUpload } from '@language/Lang.Upload';
import { langUploadCategory } from '@language/Lang.Upload';
import { langUploadSource } from '@language/Lang.Upload';

export default function UploadLanguage(){
  const { langState } = useContext(LanguageContext);
  const { selectedLanguage, defaultLanguage } = langState;
  
  // upload file
  const { dropImage } = langUpload;
  const _dropImage = dropImage[selectedLanguage] || dropImage[defaultLanguage];

  //upload category
  const { titlePlaceholder, alertPlaceholder, descPlaceholder, uploadBtn, fileSizeErr, sourceAlert } = langUploadCategory;

  const _titlePlaceholder = titlePlaceholder[selectedLanguage] || titlePlaceholder[defaultLanguage],
        _alertPlaceholder = alertPlaceholder[selectedLanguage] || titlePlaceholder[defaultLanguage],
        _descPlaceholder = descPlaceholder[selectedLanguage] || descPlaceholder[defaultLanguage],
        _uploadBtn = uploadBtn[selectedLanguage] || uploadBtn[defaultLanguage],
        _fileSizeErr = fileSizeErr[selectedLanguage] || fileSizeErr[defaultLanguage],
        _sourceAlert = sourceAlert[selectedLanguage] || sourceAlert[defaultLanguage];

  // upload category form
  const {
    thisComic,
    thisIllust,
    comicFillterCategory,
    comicFillterDesc,
    thisPublic,
    thisSecret,
    publicCategory,
    publicDesc,
    reCreateAllow,
    reCreateDisallow,
    reCreateCategory,
    reCreateDesc,
    koreanSet,
    japaneseSet,
    englishSet,
    thisLanguage,
    thisLanguageEnd,
    languageCategory,
    languageDesc,
  } = langUploadCategory;

  const _thisComic = thisComic[selectedLanguage] || thisComic[defaultLanguage],
        _thisIllust = thisIllust[selectedLanguage] || thisIllust[defaultLanguage],
        _comicFillterCategory = comicFillterCategory[selectedLanguage] || comicFillterCategory[defaultLanguage],
        _comicFillterDesc = comicFillterDesc[selectedLanguage] || comicFillterDesc[defaultLanguage],
        _thisPublic = thisPublic[selectedLanguage] || thisPublic[defaultLanguage],
        _thisSecret = thisSecret[selectedLanguage] || thisSecret[defaultLanguage],
        _publicCategory = publicCategory[selectedLanguage] || publicCategory[defaultLanguage],
        _publicDesc = publicDesc[selectedLanguage] || publicDesc[defaultLanguage],
        _reCreateAllow = reCreateAllow[selectedLanguage] || reCreateAllow[defaultLanguage],
        _reCreateDisallow = reCreateDisallow[selectedLanguage] || reCreateDisallow[defaultLanguage],
        _reCreateCategory = reCreateCategory[selectedLanguage] || reCreateCategory[defaultLanguage],
        _reCreateDesc = reCreateDesc[selectedLanguage] || reCreateDesc[defaultLanguage],
        _koreanSet = koreanSet[selectedLanguage] || koreanSet[defaultLanguage],
        _japaneseSet = japaneseSet[selectedLanguage] || japaneseSet[defaultLanguage],
        _englishSet = englishSet[selectedLanguage] || englishSet[defaultLanguage],
        _thisLanguage = thisLanguage[selectedLanguage] || thisLanguage[defaultLanguage],
        _thisLanguageEnd = thisLanguageEnd[selectedLanguage] || thisLanguageEnd[defaultLanguage],
        _languageCategory = languageCategory[selectedLanguage] || languageCategory[defaultLanguage],
        _languageDesc = languageDesc[selectedLanguage] || languageDesc[defaultLanguage];

  // upload source
  const { externalSource, uploadPermission } = langUploadSource;

  const _externalSource = externalSource[selectedLanguage] || externalSource[defaultLanguage],
        _uploadPermission = uploadPermission[selectedLanguage] || uploadPermission[defaultLanguage];

  return {
    // upload file
    _dropImage,
    // upload category
    _titlePlaceholder,
    _alertPlaceholder,
    _descPlaceholder,
    _uploadBtn,
    _fileSizeErr,
    _sourceAlert,
    // upload categoru form
    _thisComic,
    _thisIllust,
    _comicFillterCategory,
    _comicFillterDesc,
    _thisPublic,
    _thisSecret,
    _publicCategory,
    _publicDesc,
    _reCreateAllow,
    _reCreateDisallow,
    _reCreateCategory,
    _reCreateDesc,
    _koreanSet,
    _japaneseSet,
    _englishSet,
    _thisLanguage,
    _thisLanguageEnd,
    _languageCategory,
    _languageDesc,
    // upload source
    _externalSource,
    _uploadPermission
  }
}