import { useState } from 'react';
import ReportLanguage from '@component/report/Report_Language';

export default function reportType() {
  const [value, setValue] = useState();
    // 언어 import
    const { reportList } = ReportLanguage();

  const typeFind = (type = null) => {
    reportList.map(({id, title}) => {
      if(type === id){  
        setValue(title);
      } else {
        return;
      }
  
    })
  }

  return [value, typeFind]
  
}
