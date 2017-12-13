# UNDER DEVELOPMENT - Liberal Buffer readable and writable continuously

[![Build Status](https://travis-ci.org/kawanet/liberal-buffer.svg?branch=master)](https://travis-ci.org/kawanet/liberal-buffer)

### Synopsis

```js
const {ReadableBuffer} = require("liberal-buffer");

const readable = new ReadableBuffer();

readable.push(Buffer.from([1, 2, 3]));
readable.push(Buffer.from([4, 5, 65]));
readable.push(Buffer.from([66, 67, 68]));

console.warn(readable.readUInt8()); // => 0x01
console.warn(readable.readUInt32BE()); // => 0x02030405
console.warn(readable.readString(4)); // => "ABCD"
```

```js
const {WritableBuffer} = require("liberal-buffer");

const writable = new WritableBuffer();

writable.writeUInt8(0x01);
writable.writeUInt32BE(0x02030405);
writable.writeString("ABCD");

console.warn(writable.toBuffer()); // => <Buffer 01 02 03 04 05 41 42 43 44>
```

See [liberal-buffer.d.ts](https://github.com/kawanet/liberal-buffer/blob/master/typings/liberal-buffer.d.ts) for more detail.

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
