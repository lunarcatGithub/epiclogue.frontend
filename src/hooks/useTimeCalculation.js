import { useState, useEffect, useContext } from 'react';
import { LanguageContext } from '@store/App_Store';
import { LangTime } from '@language/Lang.Common';

export const useTimeCalculation = (_Date) => {
  const [currentTime, setCurrentTime] = useState(null);

  const { langState } = useContext(LanguageContext);
  //언어 변수
  const { selectedLanguage, defaultLanguage } = langState;
  const { moment, minutes, hourAgo, dayAgo, weekAgo, monthAgo } = LangTime;
  const _moment = moment[selectedLanguage] || moment[defaultLanguage],
    _minutes = minutes[selectedLanguage] || minutes[defaultLanguage],
    _hourAgo = hourAgo[selectedLanguage] || hourAgo[defaultLanguage],
    _dayAgo = dayAgo[selectedLanguage] || dayAgo[defaultLanguage],
    _weekAgo = weekAgo[selectedLanguage] || weekAgo[defaultLanguage],
    _monthAgo = monthAgo[selectedLanguage] || monthAgo[defaultLanguage];

  useEffect(() => {
    const today = new Date();
    const timeValue = new Date(_Date);
    let spiteYear = timeValue.getFullYear().toString().substr(2, 3);

    const betweenTime = Math.floor((today.getTime() - timeValue.getTime()) / 1000 / 60);
    // const betweenTime = 39460
    const betweenTimeHour = Math.floor(betweenTime / 60);
    const betweenTimeDay = Math.floor(betweenTimeHour / 24);
    const betweenTimeWeek = Math.floor(betweenTimeDay / 7);
    const betweenTimeMonth = Math.floor(betweenTimeWeek / 4);

    if (betweenTime < 1) {
      setCurrentTime(_moment);
    } else if (betweenTime < 60) {
      setCurrentTime(`${betweenTime}${_minutes}`);
    } else if (betweenTimeHour < 24) {
      setCurrentTime(`${betweenTimeHour}${_hourAgo}`);
    } else if (betweenTimeDay < 7) {
      setCurrentTime(`${betweenTimeDay}${_dayAgo}`);
    } else if (betweenTimeWeek < 4) {
      setCurrentTime(`${betweenTimeWeek}${_weekAgo}`);
    } else {
      if (selectedLanguage === 0) {
        setCurrentTime(`${spiteYear}년 ${timeValue.getMonth() + 1}월 ${timeValue.getDate()}일`);
      } else if (selectedLanguage === 1) {
        setCurrentTime(`${spiteYear}年 ${timeValue.getMonth() + 1}月 ${timeValue.getDate()}日`);
      } else {
        setCurrentTime(`${timeValue.getMonth() + 1}h ${timeValue.getDate()}m ${spiteYear}y`);
      }
    }

    // if(betweenTimeMonth < 12){
    //   indicateDate = `${betweenTimeMonth}개월 전`;
    // }

    // } else {
    //   indicateDate = `${betweenTimeMonth}년 전`;
    // }
    // indicateDate = `${Math.floor(betweenTimeDay / 365)}년전`;
  }, [_Date]);

  return [currentTime];
};
