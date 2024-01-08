export function getMousePos(e){
    let x, y;
    if ((e.type === 'touchstart' || e.type === 'touchmove' ) && e.touches) {
        x = e.touches[0].clientX;
        y = e.touches[0].clientY;  
    } else if (e.type === 'touchend' && e.changedTouches) {
        x = e.changedTouches[0].clientX;
        y = e.changedTouches[0].clientY;  
    } else {
        x = e.clientX;
        y = e.clientY;
    }
    return [x, y];
}