"use strict";

/**
 * Linked List of Buffers
 */

class LinkedBuffer {

  static from(buffer, start, end) {
    const chain = new LinkedBuffer();
    return init(chain, buffer, start, end);
  }

  append(buffer, start, end) {
    const chain = this;

    if (chain.buffer) {
      last(chain).next = LinkedBuffer.from(buffer, start, end);
      return chain;
    } else {
      return init(chain, buffer, start, end);
    }
  }

  clear() {
    return reset(this);
  }

  toBuffer() {
    const chain = this;
    return chain.next ? combineBuffer(chain) : getBuffer(chain);
  }
}

exports.LinkedBuffer = LinkedBuffer;

/**
 * @private
 */

function init(chain, buffer, start, end) {
  buffer = chain.buffer = bufferify(buffer);

  if (!buffer) {
    throw new TypeError("Buffer required");
  }

  const length = buffer.length;
  start = chain.start = +start || 0;
  end = chain.end = (end >= 0 ? +end : length) || 0;

  if (end < start || start < 0 || length < end) {
    throw new RangeError("Out of range");
  }

  return chain;
}

function getBuffer(chain) {
  const buffer = chain.buffer;
  const start = chain.start;
  const end = chain.end;

  // whole buffer
  if (!start && end === buffer.length) {
    return buffer;
  }

  // partial buffer
  return buffer.slice(start, end);
}

function combineBuffer(chain) {
  const total = getTotalLength(chain);
  const buffer = Buffer.alloc(total);
  let offset = 0;

  each(chain, (chain) => {
    const length = chain.end - chain.start;
    if (chain.buffer && length) {
      chain.buffer.copy(buffer, offset, chain.start, chain.end);
      offset += length;
    }
  });

  return buffer;
}

function getTotalLength(chain) {
  let total = 0;

  each(chain, (chain) => {
    total += chain.end - chain.start;
  });

  return total;
}

function last(chain) {
  while (chain.next) {
    chain = chain.next;
  }
  return chain;
}

function each(chain, it) {
  do {
    it(chain);
    chain = chain.next;
  } while (chain);
}

function reset(chain) {
  chain.buffer = chain.next = void 0;
  chain.start = chain.end = 0;
  return chain;
}

function bufferify(buffer) {
  return (buffer && !Buffer.isBuffer(buffer)) ? Buffer.from(buffer) : buffer;
}
