#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const projectName = process.argv[2];
if (!projectName) {
  console.error('Please specify a project name.');
  process.exit(1);
}

const projectPath = path.join(process.cwd(), projectName);
if (fs.existsSync(projectPath)) {
  console.error(`Directory ${projectName} already exists.`);
  process.exit(1);
}

fs.mkdirSync(projectPath);

const templatePath = path.join(__dirname, '../template');
fs.cpSync(templatePath, projectPath, { recursive: true });

process.chdir(projectPath);
execSync('npm install', { stdio: 'inherit' });

console.log(`Project ${projectName} successfully created!`);
console.log(`Navigate to the directory: cd ${projectName}`);
console.log(`Start development: npm start`);