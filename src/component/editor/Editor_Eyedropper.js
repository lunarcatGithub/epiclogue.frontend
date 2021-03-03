import { fabric } from 'fabric';

export const EditorEyedropper = (e, canvas) => {
    // console.log(e)
    // console.log(canvas._offset.top)
    // console.log(canvas)
    if(!canvas) return;
    const ctx = canvas.getContext('2d');
    const zoom = canvas.getZoom();
    let x;
    let y;
    let adjustY = canvas.viewportTransform[5] - canvas._offset.top
    // x = (canvas._absolutePointer.x+canvas.viewportTransform[4]) * fabric.devicePixelRatio*canvas.getZoom()
    // y = (canvas._absolutePointer.y+canvas.viewportTransform[5]) * fabric.devicePixelRatio*canvas.getZoom()
    if(e.e.type === 'touchstart'){
        // x = (e.absolutePointer.x+canvas.viewportTransform[4]) * fabric.devicePixelRatio*canvas.getZoom()
        // y = (e.absolutePointer.y+canvas.viewportTransform[5]) * fabric.devicePixelRatio*canvas.getZoom() + adjustY
        // x = e.e.targetTouches[0].pageX - canvas._offset.left
        // y = e.e.targetTouches[0].pageY - canvas._offset.top

        x = (e.absolutePointer.x + canvas.viewportTransform[4]) *fabric.devicePixelRatio*canvas.getZoom() + adjustY
        y = (e.absolutePointer.y + canvas.viewportTransform[5]) *fabric.devicePixelRatio*canvas.getZoom()

        // x = e.absolutePointer.x - canvas.vptCoords.tl.x
        // y = e.absolutePointer.y
    } else {
        x = e.e.offsetX
        y = e.e.offsetY
    }
    // x = e.e.touches[0].clientX
    // y = e.e.touches[0].clientY
    // console.log(zoom)
    // console.log(fabric.devicePixelRatio)
    // console.log('standard',{'x':x,'y':y})
    // console.log(e.e.offsetX, e.e.offsetY)

    const data = ctx.getImageData(parseInt(x), parseInt(y), 1, 1).data;
    
    // hex 변환
    const hexArr = [data[0], data[1], data[2]];
    let hex = hexArr.map( _hex => {
        _hex = parseInt(_hex).toString(16);
        return _hex.length === 1 ? "0" + _hex : _hex;
    });
     hex = "#" + hex.join("");
     
     return hex

}

