#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

const srcDir = 'src'
const buildDir = 'build'

fs.rmSync(buildDir, { recursive: true, force: true })
fs.mkdirSync(buildDir, { recursive: true })

const layoutTemplate = fs.readFileSync(path.join(srcDir, 'layout.html'), 'utf8')

const isDevelopment = process.argv.includes('--dev')
const basePath = isDevelopment ? '/' : '/mask/'

let layout = layoutTemplate.replace(/{base}/g, basePath)

fs.readdirSync(srcDir).forEach(file => {
  const srcPath = path.join(srcDir, file)
  const destPath = path.join(buildDir, file)

  if (file === 'layout.html') return

  if (file.endsWith('.html')) {
    const content = fs.readFileSync(srcPath, 'utf8')
    let html = layout.replace('{content}', content)

    // Add active class to current page nav link
    const pageName = file.replace('.html', '')
    const navPages = ['way', 'investors']

    navPages.forEach(page => {
      const isActive = page === pageName
      html = html.replace(
        `href="${page}"`,
        `href="${page}"${isActive ? ' class="active"' : ''}`,
      )
    })

    fs.writeFileSync(destPath, html)
    console.log(`Built ${file}`)
  } else {
    fs.cpSync(srcPath, destPath, { recursive: true })
    console.log(`Copied ${file}`)
  }
})

console.log('Build complete!')
