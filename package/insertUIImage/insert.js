document.addEventListener('paste', (e) => {
    const { clipboardData } = e;
    
    Object.keys(clipboardData.items).map((key) => {
        const item = clipboardData.items[key];

        switch(item.kind) {
            case 'string':
                item.getAsString((str) => {
                    console.log(str);
                });
                break;
            case 'file':
                const pasteFile = item.getAsFile();
                const reader = new FileReader();
                reader.onload = (event) => {
                    init(event.target.result);
                };
                reader.readAsDataURL(pasteFile);
                break;
        }
    });
});

function init(data) {
    let oMouseX = 0;
    let oMouseY = 0;

    const img = new Image();
    img.src = data;
    img.addEventListener('mousedown', (e) => {
        e.preventDefault();
        oMouseX = e.clientX - div.offsetLeft;
        oMouseY = e.clientY - div.offsetTop;
        img.addEventListener('mousemove', addMove, false);
    });
    img.addEventListener('mouseup', () => {
        img.removeEventListener('mousemove', addMove, false);
    });

    const div = document.createElement('div');
    const addMove = (e) => {
        div.style.left = e.clientX - oMouseX + 'px';
        div.style.top = e.clientY - oMouseY + 'px';
    }

    div.id = 'hxf';
    div.appendChild(img);

    document.body.appendChild(div);
}
