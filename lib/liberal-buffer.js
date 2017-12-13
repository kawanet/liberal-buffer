"use strict";

const {LinkedBuffer} = require("./linked-buffer");

const undef = void 0;
const YES = true;

/**
 * LiberalBuffer
 */

class LiberalBuffer {
  // override this to fetch the next buffer from source
  pull(length) {
    //
  }

  push(buffer, start, end) {
    const that = this;
    let chain = that.chain;

    if (chain) {
      chain.append(buffer, start, end);
    } else {
      chain = that.chain = LinkedBuffer.from(buffer, start, end);
      that.offset = chain.start;
    }

    return that;
  }

  begin() {
    const that = this;
    that._offset = that.offset;
    that._chain = that.chain;
    that._begun = YES;
    return that;
  }

  rollback() {
    const that = this;
    if (!that._begun) {
      throw new Error("Nothing to rollback before started");
    }
    that.offset = that._offset;
    that.chain = that._chain;
    that.end();
    return that;
  }

  end() {
    const that = this;
    that._chain = undef;
    that._offset = 0;
    that._begun = false;
    return that;
  }

  empty() {
    const that = this;
    const chain = that.chain;
    that.end();
    if (chain) chain.clear();
    that.offset = 0;
    return that;
  }
}

exports.LiberalBuffer = LiberalBuffer;

((P) => {
  P.chain = undef;
  P.offset = 0;
})(LiberalBuffer.prototype);
