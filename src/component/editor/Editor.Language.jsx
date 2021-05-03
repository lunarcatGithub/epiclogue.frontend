import { useContext } from 'react';
import { LanguageContext } from '@store/App_Store';
import { EditorCommon, EditorMain } from '@language/Lang.Editor';

import { EditorText } from '@language/Lang.Editor';

export default function EditorLanguage(){
  const { langState } = useContext(LanguageContext);
  const { selectedLanguage, defaultLanguage } = langState;

  // image editor
  const { colorTxt } = EditorCommon;
  const { brushTxt, txtSize, outlineTxt, resetConfirm } = EditorMain;

  const _colorTxt = colorTxt[selectedLanguage] || colorTxt[defaultLanguage],
        _brushTxt = brushTxt[selectedLanguage] || brushTxt[defaultLanguage],
        _txtSize = txtSize[selectedLanguage] || txtSize[defaultLanguage],
        _outlineTxt = outlineTxt[selectedLanguage] || outlineTxt[defaultLanguage],
        _resetConfirm = resetConfirm[selectedLanguage] || resetConfirm[defaultLanguage];
  
  // text setting
  const { detailText, heightText, spacingText } = EditorText;

  const _detailText = detailText[selectedLanguage] || detailText[defaultLanguage],
        _heightText = heightText[selectedLanguage] || heightText[defaultLanguage],
        _spacingText = spacingText[selectedLanguage] || spacingText[defaultLanguage];

  return {
    _colorTxt,
    _brushTxt,
    _txtSize,
    _outlineTxt,
    _resetConfirm,
    //text setting
    _detailText,
    _heightText,
    _spacingText,
  }
}