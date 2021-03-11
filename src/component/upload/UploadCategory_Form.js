import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { langUploadCategory } from '@language/Lang.Upload';

// Hooks&&reducer
import { useToggle } from '@hooks/useToggle';
import { LanguageContext } from '@store/App_Store';
import { uploadContext } from './UploadCategory';

export default function UploadCategoryForm({ type, initialNum }) {
  const { setPublic, setSecondCreate, setSendLang, setCategory } = useContext(uploadContext);

  const [isCategory, toggleModal_Category] = useToggle();
  const [categoryIcon, setCategoryIcon] = useState();
  const [categoryNum, setCategoryNum] = useState(type && initialNum);
  const [categoryTxt, setCategoryTxt] = useState();
  const [contents, setContents] = useState([]);
  const [scriptTxt, setScriptTxt] = useState({ title: null, sub: null });

  const [languageTxt, setlanguageTxt] = useState();

  //언어 변수
  const { langState } = useContext(LanguageContext);
  const { selectedLanguage, defaultLanguage } = langState;
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

  const typeHandler = () => {
    switch (type) {
      case 'CONTENTS':
        if (categoryNum === 0) {
          setCategoryIcon(<IllustIcon />);
          setCategoryTxt(_thisIllust);
          setCategory(0);
        } else if (categoryNum === 1) {
          setCategoryIcon(<ComicIcon />);
          setCategoryTxt(_thisComic);
          setCategory(1);
        }
        setScriptTxt({ title: _comicFillterCategory, sub: _comicFillterDesc });
        setContents([
          { id: 0, title: 'illust', lang: _thisIllust },
          { id: 1, title: 'comic', lang: _thisComic },
        ]);
        break;
      case 'PUB':
        if (categoryNum === 0) {
          setCategoryIcon(<SecretIcon />);
          setCategoryTxt(_thisSecret);
          setPublic(0);
        } else if (categoryNum === 1) {
          setCategoryIcon(<PublicIcon />);
          setCategoryTxt(_thisPublic);
          setPublic(1);
        }
        setScriptTxt({ title: _publicCategory, sub: _publicDesc });
        setContents([
          { id: 0, title: 'secret', lang: _thisSecret },
          { id: 1, title: 'public', lang: _thisPublic },
        ]);
        break;
      case 'SECONDARY':
        if (categoryNum === 0) {
          setCategoryTxt(_reCreateDisallow);
          setSecondCreate(0);
        } else if (categoryNum === 1) {
          setCategoryTxt(_reCreateAllow);
          setSecondCreate(1);
        }
        setScriptTxt({ title: _reCreateCategory, sub: _reCreateDesc });
        setContents([
          { id: 0, title: 'noneAllow', lang: _reCreateDisallow },
          { id: 1, title: 'allow', lang: _reCreateAllow },
        ]);
        break;
      case 'LANGUAGE':
        if (categoryNum === 0) {
          setCategoryTxt(`${_thisLanguage} ${_koreanSet} ${_thisLanguageEnd}`);
          setlanguageTxt('KOR');
          setSendLang(0);
        } else if (categoryNum === 1) {
          setCategoryTxt(`${_thisLanguage} ${_japaneseSet} ${_thisLanguageEnd}`);
          setlanguageTxt('JAN');
          setSendLang(1);
        } else if (categoryNum === 2) {
          setCategoryTxt(`${_thisLanguage} ${_englishSet} ${_thisLanguageEnd}`);
          setlanguageTxt('ENG');
          setSendLang(2);
        }
        setScriptTxt({ title: _languageCategory, sub: _languageDesc });
        setContents([
          { id: 0, title: 'korean', lang: _koreanSet },
          { id: 1, title: 'japanese', lang: _japaneseSet },
          { id: 2, title: 'english', lang: _englishSet },
        ]);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    typeHandler();
  }, [type, categoryNum, initialNum]);

  return (
    <>
      <CategoryBox>
        <CategoryBtn onClick={toggleModal_Category}>
          {type === 'SECONDARY' && <RecreateIcon>{categoryNum === 1 ? 'CC' : 'ND'}</RecreateIcon>}
          {type === 'LANGUAGE' && <RecreateIcon styling={type}>{languageTxt}</RecreateIcon>}
          {categoryIcon}
          <CategoryTxt>{categoryTxt}</CategoryTxt>
        </CategoryBtn>
        {isCategory && (
          <ModalLayout>
            <ModalInnerTop onClick={() => toggleModal_Category(false)}>
              {contents.map((value) => (
                <CategoryBtnTxt key={value.id} onClick={() => setCategoryNum(value.id)}>
                  <SelectTxt>{value.lang}</SelectTxt>
                </CategoryBtnTxt>
              ))}
            </ModalInnerTop>
            <DummyLine />
            <ModalInnerBottom>
              <CategoryTxt>{scriptTxt.title}</CategoryTxt>
              <CategoryDescript>{scriptTxt.sub}</CategoryDescript>
            </ModalInnerBottom>
          </ModalLayout>
        )}
      </CategoryBox>
      {isCategory && <Modal id="modal" onClick={() => toggleModal_Category(false)} />}
    </>
  );
}

// 옵션 선택란

const CategoryBox = styled.div`
  position: relative;
  width: auto;
  user-select: none;
`;

const CategoryBtn = styled.button`
  display: flex;
  align-items: center;
  width: auto;
  padding: 0.4em 1em;
  border-radius: 1.5em;
  cursor: pointer;
  &:hover {
    background: ${(props) => props.theme.color.softGrayColor};
  }
`;
const CategoryBtnTxt = styled(CategoryBtn)`
  padding: 0.3em 0;
`;

const CategoryTxt = styled.span`
  color: ${(props) => props.theme.color.blackColor};
  font-size: ${(props) => props.theme.fontSize.font15};
  font-weight: ${(props) => props.theme.fontWeight.font300};
`;

const CategoryDescript = styled.span`
  margin-top: 4px;
  line-height: 1.4em;
  color: ${(props) => props.theme.color.blackOpacity};
  font-size: ${(props) => props.theme.fontSize.font14};
  font-weight: ${(props) => props.theme.fontWeight.font300};
`;
// 카테고리 아이콘 이미지
const ComicIcon = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${(props) => props.theme.color.popupColor};
  margin-right: 10px;
  margin-left: 2px;
  border-radius: 3px;
  &::before {
    content: '';
    background: url('/static/comic_Icon.svg') no-repeat center center / contain;
    width: 1.6em;
    height: 1.6em;
  }
`;
const IllustIcon = styled(ComicIcon)`
  &::before {
    background: url('/static/illust_Icon.svg') no-repeat center center / contain;
  }
`;
const PublicIcon = styled(ComicIcon)`
  border-radius: 50%;
  &::before {
    background: url('/static/publicshare.svg') no-repeat center center / contain;
  }
`;
const SecretIcon = styled(ComicIcon)`
  background: none;
  &::before {
    background: url('/static/secretcontent.svg') no-repeat center center / contain;
  }
`;
const RecreateIcon = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 25px;
  height: 20px;
  margin-right: 0.8em;
  border-radius: 4px;
  background: ${(props) => (props.styling === 'LANGUAGE' ? props.theme.color.greenColor : props.theme.color.brownColor)};
  font-size: ${(props) => (props.styling === 'LANGUAGE' ? `10px` : `12px`)};
  font-weight: ${(props) => (props.styling === 'LANGUAGE' ? props.theme.fontWeight.font500 : props.theme.fontWeight.font700)};
  color: ${(props) => props.theme.color.whiteColor};
  user-select: none;
`;

// 카테고리 선택 모달

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 99999;
  @media (max-width: 900px) {
    background: ${(props) => props.theme.color.popupColor};
  }
`;

const ModalLayout = styled.div`
  position: absolute;
  top: 32px;
  left: -142px;
  transform: translateX(50%);
  display: flex;
  flex-direction: column;
  width: 300px;
  height: auto;
  overflow: hidden;
  border-radius: 8px;
  background: ${(props) => props.theme.color.whiteColor};
  padding: 0.3em 1.5em;
  z-index: 999999;
  box-shadow: ${(props) => props.theme.boxshadow.popup2};
  @media (max-width: 900px) {
    position: fixed;
    top: initial;
    left: 0;
    bottom: 0;
    transform: none;
    width: 100%;
    border-radius: 12px 12px 0 0;
  }
`;

const ModalInnerTop = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.5em 0;
`;

const ModalInnerBottom = styled(ModalInnerTop)`
  @media (max-width: 900px) {
    padding-bottom: 30px;
  }
`;
const DummyLine = styled.div`
  width: 100%;
  height: 3px;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 2em;
  margin: 0.3em 0;
`;
const SelectTxt = styled(CategoryTxt)`
  font-size: ${(props) => props.theme.fontSize.font16};
  font-weight: ${(props) => props.theme.fontWeight.font700};
  margin: 0.1em 0;
`;
