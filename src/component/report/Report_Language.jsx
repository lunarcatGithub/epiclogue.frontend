import { useContext } from 'react';

import { LangCommon } from '@language/Lang.Common';
// import { ReplyListContext } from './Viewer';
import { LangReport } from '@language/Lang.Report'
import { LanguageContext } from '@store/App_Store';

export default function ReportLanguage(){

    const { langState } = useContext(LanguageContext);

    //언어 변수
    const { selectedLanguage, defaultLanguage } = langState;
    const { closeBtn } = LangCommon;
    const { 
            spamReport,
            obsceneReport,
            disgustReport,
            violentReport,
            invalidReport,
            disputeReport,
            illegalReport,
            infringementlReport,
            doReport,
            reportSubReport,
            spamDescReport,
            obsceneDescReport,
            disgustDescReport,
            violentDescReport,
            invalidDescReport,
            disputeDescReport,
            illegalDescReport
        } = LangReport;
    const _closeBtn = closeBtn[selectedLanguage] || closeBtn[defaultLanguage];
    const _spamReport = spamReport[selectedLanguage] || spamReport[defaultLanguage],
        _obsceneReport = obsceneReport[selectedLanguage] || obsceneReport[defaultLanguage],
        _disgustReport = disgustReport[selectedLanguage] || disgustReport[defaultLanguage],
        _violentReport = violentReport[selectedLanguage] || violentReport[defaultLanguage],
        _invalidReport = invalidReport[selectedLanguage] || invalidReport[defaultLanguage],
        _disputeReport = disputeReport[selectedLanguage] || disputeReport[defaultLanguage],
        _illegalReport = illegalReport[selectedLanguage] || illegalReport[defaultLanguage],
        _infringementlReport = infringementlReport[selectedLanguage] || infringementlReport[defaultLanguage],
        _doReport = doReport[selectedLanguage] || doReport[defaultLanguage],
        _reportSubReport = reportSubReport[selectedLanguage] || reportSubReport[defaultLanguage],
        _spamDescReport  = spamDescReport[selectedLanguage] || spamDescReport[defaultLanguage],
        _obsceneDescReport = obsceneDescReport[selectedLanguage] || obsceneDescReport[defaultLanguage],
        _disgustDescReport = disgustDescReport[selectedLanguage] || disgustDescReport[defaultLanguage],
        _violentDescReport = violentDescReport[selectedLanguage] || violentDescReport[defaultLanguage],
        _invalidDescReport = invalidDescReport[selectedLanguage] || invalidDescReport[defaultLanguage],
        _disputeDescReport = disputeDescReport[selectedLanguage] || disputeDescReport[defaultLanguage],
        _illegalDescReport = illegalDescReport[selectedLanguage] || illegalDescReport[defaultLanguage];
        
        const reportList = [
            {
                title: _spamReport,
                desc: _spamDescReport,
                value: 'spam',
            },
            {
                title: _obsceneReport,
                desc: _obsceneDescReport,
                value: 'obscene',
            },
            {
                title: _disgustReport,
                desc: _disgustDescReport,
                value: 'disgust',
            },
            {
                title: _violentReport,
                desc: _violentDescReport,
                value: 'violence',
            },
            {
                title: _invalidReport,
                desc: _invalidDescReport,
                value: 'untruth',
            },
            {
                title: _disputeReport,
                desc: _disputeDescReport,
                value: 'dispute',
            },
            {
                title: _illegalReport,
                desc: _illegalDescReport,
                value: 'illegality',
            },
            ];
            
        return {
            _closeBtn,
            _spamReport,
            _obsceneReport,
            _disgustReport,
            _violentReport,
            _invalidReport,
            _disputeReport,
            _illegalReport,
            _infringementlReport,
            _doReport,
            _reportSubReport,
            reportList
        }
    }