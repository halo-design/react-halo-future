const chalk = require('chalk')
const semver = require('semver')
const packageConfig = require('../package.json')

const exec = cmd => require('child_process').execSync(cmd).toString().trim()

let versionRequirements = [{
  name: 'node',
  currentVersion: semver.clean(process.version),
  versionRequirement: packageConfig.engines.node
}, {
  name: 'npm',
  currentVersion: exec('npm --version'),
  versionRequirement: packageConfig.engines.npm
}]

module.exports = () => {
  let warnings = []
  for (let i = 0; i < versionRequirements.length; i++) {
    let mod = versionRequirements[i]
    if (!semver.satisfies(mod.currentVersion, mod.versionRequirement)) {
      warnings.push(`${mod.name} : ${chalk.red(mod.currentVersion)} should be ${chalk.green(mod.versionRequirement)}`
      )
    }
  }

  if (warnings.length) {
    console.log(chalk.yellow('To use this template, you must update following to modules:\n'))
    for (let i = 0; i < warnings.length; i++) {
      let warning = warnings[i]
      console.log(`> ${warning}\n`)
    }
    process.exit(1)
  }
}
