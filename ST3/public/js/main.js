let draggableFlag = false;

const background = document.getElementById('main');
background.addEventListener('dblclick', (e)=> {
    const x = e.clientX;
    const y = e.clientY;
    const message = document.createElement('div');
    message.className = 'message';
    const input = document.createElement('input');
    input.autofocus = true;
    message.appendChild(input);
    background.appendChild(message);
    message.style.top = (+y - (message.offsetHeight + 12)) + 'px';
    message.style.left = (+x - (message.offsetWidth - 25)) + 'px';
    message.addEventListener('mousedown', draggable);
    message.addEventListener('mouseup', () => draggableFlag = false);
});

function draggable(e) {
    draggableFlag = true;

    const elementY = e.clientY - this.offsetTop;
    const elementX = e.clientX - this.offsetLeft;
    let interval = setInterval(() => {
        if(!draggableFlag){
            clearInterval(interval);
        }
        console.log((+e.pageY - +elementY));
        this.style.top = (+e.clientY - +elementY) + 'px';
        //console.log(e.clientY + ' - ' + e.offsetY + ' = ' + (+e.clientY - +e.offsetY));

    }, 100);
}