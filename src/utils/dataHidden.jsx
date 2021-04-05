export function dataHiddenFilter(data) {

    const arr = []
        data.filter((i) => {
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
