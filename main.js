// main.js
const { app,ipcMain, BrowserWindow} = require("electron");
 
const path = require("path");
 
const createWindow = () => {
    // 创建窗口
    const mainWindow = new BrowserWindow({
        fullscreen:true,
        frame: false,  
        webPreferences: {
          preload: path.join(app.getAppPath(), 'preload.js')
        }
    });
    // 加载本地文件(在Electron-Vue中会有所不同)
    mainWindow.loadFile(path.join(__dirname, "index.html"));
 
    // 开启调试模式
    mainWindow.webContents.openDevTools();
    ipcMain.on('opendev',()=>{
      mainWindow.webContents.openDevTools();
    })
    //去掉顶部菜单
    mainWindow.setMenu(null);  
     
    // 最小化窗口（自定义导航条时）
    ipcMain.on('window-min',()=>{
      mainWindow.minimize()
    })
    // 最大化窗口（自定义导航条时）
    ipcMain.on('window-max',()=>{
      // 如果已经是最大化窗口就还原
      if(mainWindow.isMaximized()){
          mainWindow.restore();
      }else{
          mainWindow.maximize()
      }
    })
    // 关闭窗口（自定义导航条时）
    ipcMain.on('window-close',()=>{
      mainWindow.close()
    })
}
app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
