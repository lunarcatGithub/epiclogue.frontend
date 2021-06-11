import { useContext } from 'react';

import { LangCommon } from '@language/Lang.Common';
// import { ReplyListContext } from './Viewer';
import { LangReport, LangCopyRightReport } from '@language/Lang.Report'
import { LanguageContext } from '@store/App_Store';

export default function ReportLanguage(){

    const { langState } = useContext(LanguageContext);

    //언어 변수
    const { selectedLanguage, defaultLanguage } = langState;
    const { closeBtn } = LangCommon;
    const { // 일반 신고
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
            illegalDescReport,
        } = LangReport;
    const {
            // 저작권 신고
            privateAgree,
            swearAgree,
            privateAlert,
            swearAlert,
            nameInput,
            corporateName,
            contactInput,
            emailInput,
            nationInput,
            copyrightReportTitle,
            remindCopyright,
            reporterInfo,
            infringedConfirm,
            filloutContents,
            proofOrigin,
            violationsDeal,
            processDesc,
            agreeAbove,
            signatureFill,
            beforeSubmit
        } = LangCopyRightReport;

    // 일반 신고
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
        // 저작권 신고
    const _privateAgree = privateAgree[selectedLanguage] || privateAgree[defaultLanguage],
        _swearAgree = swearAgree[selectedLanguage] || swearAgree[defaultLanguage],
        _privateAlert = privateAlert[selectedLanguage] || privateAlert[defaultLanguage],
        _swearAlert = swearAlert[selectedLanguage] || swearAlert[defaultLanguage],
        _nameInput = nameInput[selectedLanguage] || nameInput[defaultLanguage],
        _corporateName = corporateName[selectedLanguage] || corporateName[defaultLanguage],
        _contactInput = contactInput[selectedLanguage] || contactInput[defaultLanguage],
        _emailInput = emailInput[selectedLanguage] || emailInput[defaultLanguage],
        _nationInput = nationInput[selectedLanguage] || nationInput[defaultLanguage],
        _copyrightReportTitle = copyrightReportTitle[selectedLanguage] || copyrightReportTitle[defaultLanguage],
        _remindCopyright = remindCopyright[selectedLanguage] || remindCopyright[defaultLanguage],
        _reporterInfo = reporterInfo[selectedLanguage] || reporterInfo[defaultLanguage],
        _infringedConfirm = infringedConfirm[selectedLanguage] || infringedConfirm[defaultLanguage],
        _filloutContents = filloutContents[selectedLanguage] || filloutContents[defaultLanguage],
        _proofOrigin = proofOrigin[selectedLanguage] || proofOrigin[defaultLanguage],
        _violationsDeal = violationsDeal[selectedLanguage] || violationsDeal[defaultLanguage],
        _processDesc = processDesc[selectedLanguage] || processDesc[defaultLanguage],
        _agreeAbove = agreeAbove[selectedLanguage] || agreeAbove[defaultLanguage],
        _signatureFill = signatureFill[selectedLanguage] || signatureFill[defaultLanguage],
        _beforeSubmit = beforeSubmit[selectedLanguage] || beforeSubmit[defaultLanguage];


        // 일반 신고 리스트
        const reportList = [
            {   id: 0,
                title: _spamReport,
                desc: _spamDescReport,
                value: 'spam',
            },
            {   id: 1,
                title: _obsceneReport,
                desc: _obsceneDescReport,
                value: 'obscene',
            },
            {   id: 2,
                title: _disgustReport,
                desc: _disgustDescReport,
                value: 'disgust',
            },
            {   id: 3,
                title: _violentReport,
                desc: _violentDescReport,
                value: 'violence',
            },
            {   id: 4,
                title: _invalidReport,
                desc: _invalidDescReport,
                value: 'untruth',
            },
            {   id: 5,
                title: _disputeReport,
                desc: _disputeDescReport,
                value: 'dispute',
            },
            {   id: 6,
                title: _illegalReport,
                desc: _illegalDescReport,
                value: 'illegality',
            },
        ];
        // 저작권 신고 리스트
        const copyRightinformArr = [
            { id: 0, title: _nameInput, name: 'name', required:true },
            { id: 1, title: _corporateName, name: 'company', required:false },
            { id: 2, title: _contactInput, name: 'contact', required:false },
            { id: 3, title: _emailInput, name: 'email', required:true },
            { id: 4, title: _nationInput, name: 'country', required:false },
        ];
        
        const agreeList = [
            { id: 'private', title: _privateAgree, isChecked: false },
            { id: 'swear', title: _swearAgree, isChecked: false },
        ]
        
        
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
            reportList,
            // 저작권 신고
            _privateAgree,
            _swearAgree,
            _privateAlert,
            _swearAlert,
            _copyrightReportTitle,
            _remindCopyright,
            _reporterInfo,
            _infringedConfirm,
            _filloutContents,
            _proofOrigin,
            _violationsDeal,
            _processDesc,
            _agreeAbove,
            _signatureFill,
            _beforeSubmit,
            copyRightinformArr,
            agreeList
        }
    }