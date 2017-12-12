# UNDER DEVELOPMENT

[![Build Status](https://travis-ci.org/kawanet/liberal-buffer.svg?branch=master)](https://travis-ci.org/kawanet/liberal-buffer)

### Synopsis

```js
const ReadableBuffer = require("liberal-buffer").ReadableBuffer;

const buffer = new ReadableBuffer();

buffer.append(Buffer.from([0xFF, 0x73, 0x6f, 0x6d, 0x65, 0x76, 0x61, 0x6c, 0x75, 0x65]));

console.warn(buffer.readUInt8()); // => 255
console.warn(buffer.readString(4)); // => "some"
console.warn(buffer.readString(5)); // => "value"
```

### GitHub

- [https://github.com/kawanet/liberal-buffer](https://github.com/kawanet/liberal-buffer)

### The MIT License (MIT)

Copyright (c) 2017 Yusuke Kawasaki

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
