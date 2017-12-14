"use strict";

const {LiberalBuffer} = require("./liberal-buffer");
const {LinkedBuffer} = require("./linked-buffer");

const noAssert = true;
const UTF8 = "utf8";

/**
 * ReadableBuffer
 */

class ReadableBuffer extends LiberalBuffer {

  reserve(length, callback) {
    const that = this;
    let prevOffset = that.offset;
    let nextOffset = prevOffset + length;
    let chain = that.chain;

    if (nextOffset > chain.end) {
      chain = that.chain = _reserve(that, length);
      prevOffset = chain.start;
      nextOffset = prevOffset + length;
    }

    that.offset = nextOffset;

    if (callback) {
      return callback(chain.buffer, prevOffset, nextOffset);
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
  const latter = former.next || (former.next = _pull(that, length));

  // the former buffer is already read. just switch to the latter.
  const rest = former.end - offset;
  if (!rest) {
    return latter;
  }

  // combine the rest part of former buffer  with the first part of the latter
  const tmp = LinkedBuffer.from(former.buffer, offset, former.end);
  const end = latter.start + length - rest;
  tmp.append(latter.buffer, latter.start, end);
  const combined = LinkedBuffer.from(tmp.toBuffer());

  // insert the buffer combined
  former.next = combined;
  former.end = offset;
  combined.next = latter;
  latter.start = end;

  return combined;
}

function _pull(that, length) {
  const buffer = that.pull(length);

  if (!buffer) {
    throw new RangeError("Out of range");
  }

  return LinkedBuffer.from(buffer);
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