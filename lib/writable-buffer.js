"use strict";

const {LiberalBuffer} = require("./liberal-buffer");
const {LinkedBuffer} = require("./linked-buffer");

const BUFFER_LENGTH = 4;
const undef = void 0;
const noAssert = true;

/**
 * WritableBuffer
 */

class WritableBuffer extends LiberalBuffer {
  pull(length) {
    return Buffer.alloc(length);
  }

  reserve(length, callback, value) {
    const that = this;

    let chain = that.chain || (that.chain = _withdraw(that, length));

    if (!this._begun) {
      this.begin();
    }

    let offset = that.offset;

    that.offset += length;

    if (that.offset > chain.end) {
      chain.end = offset;
      const next = _withdraw(that, length);
      chain.next = next;
      that.chain = chain = next;
      offset = chain.start;
      that.offset = length;
    }

    if (callback) return callback(chain.buffer, offset, value);
  }

  writeString(value) {
    const tempLength = value.length * 3;
    const realLength = this.reserve(tempLength, _writeString, value);
    this.offset -= tempLength - realLength;
    return realLength;
  }

  writeBuffer(value, start, end) {
    const tmp = LinkedBuffer.from(value, start, end);
    const length = tmp.end - tmp.start;
    return this.reserve(length, _writeBuffer, tmp);
  }

  insertBuffer(value, start, end) {
    const that = this;
    const offset = that.offset;
    const chain1 = that.chain;
    const chain4 = chain1.next;

    // trim
    chain1.end = offset;

    // buffer to insert
    const chain2 = LinkedBuffer.from(value, start, end);

    // reuse rest of the current beffer
    const chain3 = LinkedBuffer.from(chain1.buffer, offset, chain1.end);

    // link them
    chain1.next = chain2;
    chain2.next = chain3;
    chain3.next = chain4;

    that.chain = chain3;

    return chain2.end - chain2.start;
  }

  toBuffer() {
    const that = this;
    const chain = that.chain;
    if (!chain) return;

    const end = chain.end;
    chain.end = that.offset;
    chain.next = undef;
    const buffer = that._chain.toBuffer();
    chain.start = that.offset;
    chain.end = end;
    that.end();
    that.begin();
    return buffer;
  }
}

exports.WritableBuffer = WritableBuffer;

((P) => {
  const methods = {
    writeUInt8: 1,
    writeUInt16LE: 2,
    writeUInt16BE: 2,
    writeUInt32LE: 4,
    writeUInt32BE: 4,
    writeInt8: 1,
    writeInt16LE: 2,
    writeInt16BE: 2,
    writeInt32LE: 4,
    writeInt32BE: 4,
    writeFloatLE: 4,
    writeFloatBE: 4,
    writeDoubleLE: 8,
    writeDoubleBE: 8,
  };

  for (const method in methods) {
    P[method] = wrap(method, methods[method]);
  }

  function wrap(method, length) {
    return function(value) {
      this.reserve(length, write, value);
      return length;
    };

    function write(buffer, offset, value) {
      return buffer[method](value, offset, noAssert);
    }
  }
})(WritableBuffer.prototype);

/**
 * @private
 */

function _withdraw(that, length) {
  const size = (length > BUFFER_LENGTH) ? length : BUFFER_LENGTH;
  return LinkedBuffer.from(that.pull(size));
}

function _writeString(buffer, offset, value) {
  return buffer.write(value, offset);
}

function _writeBuffer(buffer, offset, value) {
  return value.buffer.copy(buffer, offset, value.start, value.end);
}
