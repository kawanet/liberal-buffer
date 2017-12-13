"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require("assert");
const _1 = require("../");
const TITLE = __filename.split("/").pop();
describe(TITLE, () => {
    it("ReadableBuffer", () => {
        const readable = new _1.ReadableBuffer();
        // LiberalBuffer methods
        assert.equal(typeof readable.begin, "function");
        assert.equal(typeof readable.end, "function");
        assert.equal(typeof readable.rollback, "function");
        assert.equal(typeof readable.empty, "function");
        assert.equal(typeof readable.push, "function");
        assert.equal(typeof readable.pull, "function");
        // ReadableBuffer methods
        assert.equal(typeof readable.readBuffer, "function");
        assert.equal(typeof readable.readString, "function");
        assert.equal(typeof readable.readUInt8, "function");
        assert.equal(typeof readable.readUInt16LE, "function");
        assert.equal(typeof readable.readUInt16BE, "function");
        assert.equal(typeof readable.readUInt32LE, "function");
        assert.equal(typeof readable.readUInt32BE, "function");
        assert.equal(typeof readable.readInt8, "function");
        assert.equal(typeof readable.readInt16LE, "function");
        assert.equal(typeof readable.readInt16BE, "function");
        assert.equal(typeof readable.readInt32LE, "function");
        assert.equal(typeof readable.readInt32BE, "function");
        assert.equal(typeof readable.readFloatLE, "function");
        assert.equal(typeof readable.readFloatBE, "function");
        assert.equal(typeof readable.readDoubleLE, "function");
        assert.equal(typeof readable.readDoubleBE, "function");
    });
    it("WritableBuffer", () => {
        const writable = new _1.WritableBuffer();
        // LiberalBuffer methods
        assert.equal(typeof writable.begin, "function");
        assert.equal(typeof writable.end, "function");
        assert.equal(typeof writable.rollback, "function");
        assert.equal(typeof writable.empty, "function");
        assert.equal(typeof writable.push, "function");
        assert.equal(typeof writable.pull, "function");
        // WritableBuffer methods
        assert.equal(typeof writable.toBuffer, "function");
        assert.equal(typeof writable.insertBuffer, "function");
        assert.equal(typeof writable.writeBuffer, "function");
        assert.equal(typeof writable.writeString, "function");
        assert.equal(typeof writable.writeUInt8, "function");
        assert.equal(typeof writable.writeUInt16LE, "function");
        assert.equal(typeof writable.writeUInt16BE, "function");
        assert.equal(typeof writable.writeUInt32LE, "function");
        assert.equal(typeof writable.writeUInt32BE, "function");
        assert.equal(typeof writable.writeInt8, "function");
        assert.equal(typeof writable.writeInt16LE, "function");
        assert.equal(typeof writable.writeInt16BE, "function");
        assert.equal(typeof writable.writeInt32LE, "function");
        assert.equal(typeof writable.writeInt32BE, "function");
        assert.equal(typeof writable.writeFloatLE, "function");
        assert.equal(typeof writable.writeFloatBE, "function");
        assert.equal(typeof writable.writeDoubleLE, "function");
        assert.equal(typeof writable.writeDoubleBE, "function");
    });
});
