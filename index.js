#!/usr/bin/env node

let lex = require('pug-lexer')
let parse = require('pug-parser')
let link = require('pug-linker')
let codeGen = require('pug-code-gen')
var util = require('util')
var fs = require('fs')

var fullPath = './benchmark.pug'
var contents = fs.readFileSync(fullPath, 'utf8')

var n = 200;

var tokens, ast, linkedAst, code;

console.time('lex')
for (var i = 0; i < n; i++) {
  tokens = lex(contents, {
    filename: fullPath
  });
}
console.timeEnd('lex')

console.time('parse')
for (var i = 0; i < n; i++) {
  ast = parse(tokens.slice(0), {
    filename: fullPath,
    src: contents
  });
}
console.timeEnd('parse')

linkedAst = link(ast);

console.time('codeGen')
for (var i = 0; i < n; i++) {
  code = codeGen(linkedAst, { compileDebug: false });
}
console.timeEnd('codeGen')
