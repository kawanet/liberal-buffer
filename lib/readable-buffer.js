"use strict";

const {LiberalBuffer} = require("./liberal-buffer");
const {LinkedBuffer} = require("./linked-buffer");

const noAssert = true;
const UTF8 = "utf8";
const undef = void 0;

/**
 * ReadableBuffer
 */

class ReadableBuffer extends LiberalBuffer {
  pull(length) {
    return undef;
  }

  reserve(length, callback) {
    const that = this;
    let chain = that.chain;
    let start = that.offset;
    let end = start + length;

    if (end > chain.end) {
      _reserve(that, length);
      chain = that.chain;
      start = that.offset;
      end = start + length;
    }

    that.offset = end;

    if (callback) {
      return callback(chain.buffer, start, end);
    }
  }

  readUInt8() {
    return this.reserve(1, _readUInt8);
  }

  readString(length) {
    return this.reserve(length, _readString);
  }

  readBuffer(length) {
    return this.reserve(length, _readBuffer);
  }
}

exports.ReadableBuffer = ReadableBuffer;

((P) => {
  const methods = {
    // readUInt8: 1,
    readUInt16LE: 2,
    readUInt16BE: 2,
    readUInt32LE: 4,
    readUInt32BE: 4,
    readInt8: 1,
    readInt16LE: 2,
    readInt16BE: 2,
    readInt32LE: 4,
    readInt32BE: 4,
    readFloatLE: 4,
    readFloatBE: 4,
    readDoubleLE: 4,
    readDoubleBE: 4
  };

  for (const method in methods) {
    P[method] = wrap(method, methods[method]);
  }

  function wrap(method, length) {
    return function() {
      return this.reserve(length, read);
    };

    function read(buffer, value, offset) {
      return buffer[method](value, offset, noAssert);
    }
  }
})(ReadableBuffer.prototype);

/**
 * @private
 */

function _reserve(that, length) {
  const offset = that.offset;
  const former = that.chain;
  let latter = former.next;
  const rest = former.end - offset;

  // Enough space available
  if (length <= rest) {
    return;
  }

  // skip the latter buffer if empty
  while (!latter || latter.start === latter.end) {
    if (latter) {
      former.next = latter.next
    } else {
      const buffer = that.pull(length);
      if (!buffer) {
        throw new RangeError("Out of range");
      }
      latter = former.next = LinkedBuffer.from(buffer);
    }
  }

  if (rest === 0) {
    // if whole of the former buffer is already read, just switch to the latter
    that.chain = latter;
    that.offset = latter.start;

  } else {
    // combine the rest part of former buffer with the first part of the latter
    const tmp = LinkedBuffer.from(former.buffer, offset, former.end);
    const end = Math.max(latter.start, Math.min(latter.end, (latter.start + length - rest)));
    tmp.append(latter.buffer, latter.start, end);
    const combined = LinkedBuffer.from(tmp.toBuffer());

    // insert the buffer combined
    former.next = combined;
    former.end = offset;
    combined.next = latter;
    latter.start = end;

    that.chain = combined;
    that.offset = 0;
  }

  _reserve(that, length);
}

function _readBuffer(buffer, start, end) {
  return buffer.slice(start, end);
}

function _readString(buffer, start, end) {
  return buffer.toString(UTF8, start, end);
}

function _readUInt8(buffer, start, end) {
  return buffer[start] & 255;
}