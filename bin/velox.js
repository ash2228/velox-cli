#!/usr/bin/env node
import { program } from 'commander'
import chalk from 'chalk'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { copyComponent } from '../utils/fsHelpers.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

program
  .name('velox')
  .description('Velox CLI - Add 3D components to your project')
  .version('0.1.0')

program
  .command('add')
  .argument('<component>', 'Component name to add (e.g., Cube)')
  .option('-o, --out <folder>', 'Output folder', './components')
  .action((component, options) => {
    const fromPath = path.join(__dirname, '../components', `${component}.js`)
    const toFolder = path.resolve(options.out)
    const toPath = path.join(toFolder, `${component}.js`)

    if (!fs.existsSync(fromPath)) {
      console.log(chalk.red(`❌ Component ${component} not found.`))
      process.exit(1)
    }

    copyComponent(fromPath, toPath)
    console.log(chalk.green(`✅ ${component} added to ${toFolder}`))
  })

program.parse()
