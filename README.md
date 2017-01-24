This is a quick benchmark of various Pug components.

## Usage

```sh
npm install
node index.js
```

## Output on my machine

With Node v6.9.0 on Linux:

```
lex: 1753.248ms
parse: 251.063ms
codeGen: 2304.035ms
runtimeWrap: 6.797ms
render: 6.182ms
```

## Note

Don't use this code as an example of how to use the Pug API. We're misusing it
and skipping steps to drill down into the timings for each component.
