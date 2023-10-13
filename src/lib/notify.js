export function notify(callback) {
    const div = document.createElement('div');
    const container = document.querySelector('.container');
    div.innerText = '新增成功';
    div.id = 'notify__sucess';
    document.body.insertBefore(div, container);

    div.addEventListener("animationend", (event) => {
        div.remove();
        console.log('completed');
        callback();
    });
    // div.style.animationPlayState = 'running';
    // container.insertBefore(div);
}



