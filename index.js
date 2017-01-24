#!/usr/bin/env node

let lex = require('pug-lexer')
let parse = require('pug-parser')
let link = require('pug-linker')
let codeGen = require('pug-code-gen')
var runtimeWrap = require('pug-runtime/wrap')
var util = require('util')
var fs = require('fs')

var fullPath = './benchmark.pug'
var contents = fs.readFileSync(fullPath, 'utf8')

var n = 200;

var tokens, ast, linkedAst, code, fn, html;

console.time('lex')
for (var i = 0; i < n; i++) {
  tokens = lex(contents, {
    filename: fullPath
  });
}
console.timeEnd('lex')

console.time('parse')
for (var i = 0; i < n; i++) {
  // parse mutates the tokens, so we clone with .slice.
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

console.time('runtimeWrap')
for (var i = 0; i < n; i++) {
  fn = runtimeWrap(code)
}
console.timeEnd('runtimeWrap')

console.time('render')
for (var i = 0; i < n; i++) {
  html = fn();
}
console.timeEnd('render')

// Check that we actually rendered the whole thing:
//console.log(html)
