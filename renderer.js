var root = document.getElementById("root")
var quit = document.getElementById("quit")
var back = document.getElementById("back")
root.style.height=screen.height+"px"

document.addEventListener("keydown",keydown);
var quit = function(){
    var if_confirmbox = document.getElementById("confirmbox");
    if(if_confirmbox!=null){
        console.log("已经存在")
        return
    }
    var confirmbox = document.createElement("div")
    confirmbox.id="confirmbox"
    confirmbox.innerHTML="确定要退出吗？"
    var confirmbutton = document.createElement("div")
    confirmbutton.innerHTML="退出"
    var cancelbutton = document.createElement("div")
    cancelbutton.innerHTML="取消"
    confirmbox.style="position: absolute;left: 50%;top: 50%;background-color: #fffc;padding:20px;transform: translate(-50%, -50%);"
    confirmbutton.style="margin:auto;padding:10px;"
    cancelbutton.style="margin:auto;padding:10px;"
    confirmbutton.onclick = function(){
        window.electronAPI.win_close()
    }
    cancelbutton.onclick = function(){
        this.parentNode.parentNode.removeChild(this.parentNode)
    }
    confirmbox.appendChild(confirmbutton)
    confirmbox.appendChild(cancelbutton)
    document.body.appendChild(confirmbox)
}
function keydown(event){
    console.log(event.keyCode)
    switch(event.keyCode){
        case 27:
            //window.electronAPI.win_close();
            quit();

            break;
    }
}