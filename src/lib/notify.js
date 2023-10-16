function event_animationEnd(elem, callback) {
    elem.addEventListener("animationend", (event) => {
        elem.remove();
        callback();
    });
}

export function notify(id, callback) {   
    const container = document.querySelector('.container');
    const div = document.createElement('div');
    div.innerText = `新增成功 - No.${id}`;
    // Event binding
    event_animationEnd(div, callback);

    // Insert element
    document.body.insertBefore(div, container);

    // Running animation
    div.classList.toggle('notify__sucess');

}



