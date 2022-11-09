const{contextBridge, ipcRenderer}=require('electron')
// 最小化

window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }
  
  for (const dependency of ['chrome', 'node', 'electron']) {
    replaceText(`${dependency}-version`, process.versions[dependency])
  }
  document.getElementById("main-viewer").onclick=mainWindow.close();
})
contextBridge.exposeInMainWorld('electronAPI', {
  win_min(){
    ipcRenderer.send('window-min');  
  },
  win_max(){
   
    ipcRenderer.send('window-max');
  },
  win_close(){
    ipcRenderer.send('window-close');
  }
})