document.addEventListener('paste', (e) => {
    var clipboardData = e.clipboardData;
    if (!(clipboardData && clipboardData.items)) {//是否有粘贴内容
        return;
    }

    for (var i = 0, len = clipboardData.items.length; i < len; i++) {
        var item = clipboardData.items[i];
        if (item.kind === "string" && item.type == "text/plain") {
            item.getAsString(function (str) {
                // str 是获取到的字符串,创建文本框
                //处理粘贴的文字内容
            })
        } else if (item.kind === "file") {//file 一般是各种截图base64数据
            var pasteFile = item.getAsFile();
            // pasteFile就是获取到的文件
            var reader = new FileReader();
            reader.onload = (event) => {
                var base64Img = event.target.result;
                init(base64Img);
            };
            reader.readAsDataURL(pasteFile);
        }
        var copy_content = e.clipboardData.getData('text/plain');
    }
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
