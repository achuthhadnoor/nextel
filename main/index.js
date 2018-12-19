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
const { getConfig } = require('./utils/config')
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
let base64Icon = `data:image/png;base64,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`

// Prepare the renderer once the app is ready
app.on('ready', async () => {
  await prepareNext('./renderer')

  app.config = await getConfig()
     createWindow()
})

// Quit the app once all windows are closed
app.on('window-all-closed', app.quit)
 