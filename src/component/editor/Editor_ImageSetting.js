
export const ImageSetting = (imageSize) => {

    let imgWidth = imageSize.width; // Current image width
    let imgHeight = imageSize.height; // Current image height
    let maxWidth = window.innerWidth;
    let maxHeight = window.innerHeight;
    const widthFactor = maxWidth / imgWidth
    const heightFactor = maxHeight / imgHeight
    const minFactor = Math.min(widthFactor, heightFactor)

    // 중앙정렬
    let finalHeight = imgHeight * minFactor;
    let finalWidth = imgWidth * minFactor;

    let imgTop = 0;
    if (maxHeight > finalHeight) {
      imgTop = (Math.round(maxHeight) - Math.round(finalHeight)) / 2;
    }
    
    let imgLeft = 0;
    if (maxWidth > finalWidth) {
        imgLeft = (Math.round(maxWidth) - Math.round(finalWidth)) / 2;
    }
    return [imgTop, imgLeft, minFactor]
}

