'use strict'

const { homedir } = require('os')
const { join } = require('path')

const { readJSON, writeJSON } = require('fs-extra')
const pathExists = require('path-exists')

const paths = {
  config: '.snip.json'
}

for (const file in paths) {
  if (!{}.hasOwnProperty.call(paths, file)) {
    continue
  }

  paths[file] = join(homedir(), paths[file])
}

const hasConfig = async () => {
  const configExists = await pathExists(paths.config)

  return configExists
}
 
const createConfig = async () => {
  const cfg = {
    pro: false,
    lastUpdate: new Date()
  }

  await writeJSON(paths.config, cfg, {
    spaces: 2
  })
}
 

exports.getConfig = async () => {
  if (!await hasConfig() ) {
    await createConfig()

    const user = await readJSON(paths.config)

    return { user }
  }

  const user = await readJSON(paths.config) 

  return { user  }
}