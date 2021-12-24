const { exec } = require('child_process')
const fs = require('fs')
const moment = require('moment')
const getCommandArgs = require('./lib/get-command-args')

const defaultArgs = {
	appVersion: '最新',
	mode: '',
	packageManager: 'npm',
}
const { appVersion, mode, packageManager } = getCommandArgs(defaultArgs)

const envFileName = '.env'
const envFile = fs.readFileSync(envFileName)
const envFileString = envFile.toString()
const newEnvFileString = envFileString.replace(
	/VITE_APP_VERSION=.*/,
	`VITE_APP_VERSION=${moment().format('YY.MM.DD.')}${appVersion}`,
)

fs.writeFileSync(envFileName, newEnvFileString)

const build = exec(`${packageManager} run build${mode ? `:${mode}` : ''}`)
build.stdout.on('data', data => console.log(data))
build.stderr.on('data', data => console.error(data))
build.on('close', code => console.log(`child process exited with code ${code}`))
