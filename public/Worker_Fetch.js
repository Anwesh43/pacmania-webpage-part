function update() {
    postMessage(1);
    setTimeout("update()",100);
}
update();