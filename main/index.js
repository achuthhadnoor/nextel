'use strict'

// Native
const { format } = require('url')
const { join } = require('path')
const { platform } = require('os')
var electron = require('electron')
// Packages
const { BrowserWindow, app, Menu , Tray, nativeImage } = require('electron')
const isDev = require('electron-is-dev')
const prepareNext = require('electron-next')
const { resolve } = require('app-root-path')

// Utils
// const { getConfig } = require('./utils/config')
// const autoUpdater = require('./updater')

//constants
let mainWindow, tray;

const devPath = 'http://localhost:8000/start'

const prodPath = format({
  pathname: resolve('renderer/out/start/index.html'),
  protocol: 'file:',
  slashes: true
})

const url = isDev ? devPath : prodPath

const TRAY_ARROW_HEIGHT = 90;
const WINDOW_WIDTH = 350;
const WINDOW_HEIGHT = 500;
const HORIZ_PADDING = 30;
const VERT_PADDING = 30;

function createWindow() {

  let icon = nativeImage.createFromDataURL(base64Icon);
  tray = new Tray(icon);

  tray.setToolTip('Snip');
  
  tray.on('click', (event) => {
    var screen = electron.screen;
    const cursorPosition = screen.getCursorScreenPoint();
    const primarySize = screen.getPrimaryDisplay().workAreaSize;
    const trayPositionVert = cursorPosition.y >= primarySize.height / 2 ? 'bottom' : 'top';
    const trayPositionHoriz = cursorPosition.x >= primarySize.width / 2 ? 'right' : 'left';
    mainWindow.setPosition(getTrayPosX(), getTrayPosY());
    mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show();

    function getTrayPosX() {
      const horizBounds = {
        left: cursorPosition.x - WINDOW_WIDTH / 2,
        right: cursorPosition.x + WINDOW_WIDTH / 2
      }
      if (trayPositionHoriz == 'left') {
        return horizBounds.left <= HORIZ_PADDING ? HORIZ_PADDING : horizBounds.left;
      } else {
        return horizBounds.right >= primarySize.width ? primarySize.width - HORIZ_PADDING - WINDOW_WIDTH : horizBounds.right - WINDOW_WIDTH;
      }
    }

    function getTrayPosY() {
      return trayPositionVert == 'bottom' ? cursorPosition.y - WINDOW_HEIGHT - VERT_PADDING : cursorPosition.y + VERT_PADDING;
    }
    if (process.platform === 'darwin') {
      const template = [{
          label: 'Application',
          submenu: [{
              label: 'About Application',
              selector: 'orderFrontStandardAboutPanel:'
            },
            {
              type: 'separator'
            },
            {
              label: 'Quit',
              accelerator: 'Command+Q',
              click: () => app.quit()
            }
          ]
        },
        {
          label: 'Edit',
          submenu: [{
              label: 'Undo',
              accelerator: 'CmdOrCtrl+Z',
              selector: 'undo:'
            },
            {
              label: 'Redo',
              accelerator: 'Shift+CmdOrCtrl+Z',
              selector: 'redo:'
            },
            {
              type: 'separator'
            },
            {
              label: 'Cut',
              accelerator: 'CmdOrCtrl+X',
              selector: 'cut:'
            },
            {
              label: 'Copy',
              accelerator: 'CmdOrCtrl+C',
              selector: 'copy:'
            },
            {
              label: 'Paste',
              accelerator: 'CmdOrCtrl+V',
              selector: 'paste:'
            },
            {
              label: 'Select All',
              accelerator: 'CmdOrCtrl+A',
              selector: 'selectAll:'
            }
          ]
        },
        {
          label: 'View',
          submenu: [{
            label: 'Developer Tools',
            accelerator: 'CmdOrCtrl+alt+I',
            click: (item, focusedWindow) => {
              const webContents = focusedWindow.webContents

              if (webContents.isDevToolsOpened()) {
                webContents.closeDevTools()
              } else {
                webContents.openDevTools({
                  mode: 'detach'
                })
              }
            }
          }]
        }
      ]
      Menu.setApplicationMenu(Menu.buildFromTemplate(template))
    }
    // Make the popup window for the menubar
  })
  
  mainWindow = new BrowserWindow({
    width: WINDOW_WIDTH,
    height: WINDOW_HEIGHT,
    minWidth: 320,
    minHeight: 500,
    maxWidth: 320,
    maxHeight: 500,
    resizable: true,
    backgroundColor: '#000000',
    frame: platform() !== 'win32',
    titleBarStyle: 'hiddenInset',
    icon: platform() === 'win32' ?
    join(__dirname, 'main/static/icon.ico') :
      join(__dirname, 'main/static/icon.icns')
    })
    mainWindow.setSkipTaskbar(true)
    mainWindow.loadURL(url)
    
  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

if (app.dock) app.dock.hide()
let base64Icon = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAGYSURBVHgBtZU/SAJRHMe/77BSsjjCwcxBsKxBQYOgJZsiqKWW/tCQ1lZLbQ2NDTVENLhmm7VIDrXnWlSQg1BBQ2FDf4SkNKTr9ztyMLxK7/zAg/fucZ/fn3e8EyB6YiGX0oQoTf00ZNSKggPxgeX09O6t+Jae6xKWkxUFBCSlEVsGShmZq5cgMAbj8UuoD3K9xPhV3GV1qKMWTJUetpjMWPfOIZN/gdVkgYfks6ebeC2+Q5c4IHciV8xjLR1T11POIII2L5KPl2ogu7mNgltondIUV2xFjjLjFgRkt7reu0vi8OEEAzYfIv5FqqADI/Y+zLuGqxOfZW+wkopi0jmIeP9qmYAD7FOg7esEeqkyLTR7nMk/kXwH7VQ2i0cpQwX/p2LGnOkEDSaTf8ZV7l7tazVUFHNPOdOIfwEb3jAdnA9H1IJqEN3xkGaFfPJMNZ9ZCZPWRnMkjc/S/MdeYciBoqcVNYnfZtzab1n+vgk0xYrcAD1w6CzqAN/HFzCehCSAMIzNOisElqT0OP34BAIcBfrg5I7Zxc4vBd5ya476H9kAAAAASUVORK5CYII=`

// Prepare the renderer once the app is ready
app.on('ready', async () => {
  await prepareNext('./renderer')

  // app.config = await getConfig()
     createWindow()
})

// Quit the app once all windows are closed
app.on('window-all-closed', app.quit)
 