export function dataHiddenFilter(data, lang) {
    const languageDivied = data.filter(data => (lang.indexOf(Number(data.language)) >= 0 ));

    const arr = []
    languageDivied.filter((i) => {
            if (i.pub === 1) {
                arr.push(i);
            } else if (i.pub === 0) {
                if (i.writer.screenId === localStorage.getItem('userid')) {
                arr.push(i);
                } else {
                return;
                }
            }
        });
    
    return arr;
}
