"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require("assert");
const _1 = require("../");
const TITLE = __filename.split("/").pop();
describe(TITLE, () => {
    it("ReadableBuffer", () => {
        const readable = new _1.ReadableBuffer();
        readable.push(Buffer.from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]));
        assert.equal(readable.readInt8(), 0x01);
        readable.begin();
        assert.equal(readable.readInt16BE(), 0x0203);
        assert.equal(readable.readUInt16BE(), 0x0405);
        assert.equal(readable.readInt32BE(), 0x06070809);
        assert.equal(readable.readUInt32BE(), 0x0a0b0c0d);
        // RangeError: Out of range
        assert.throws(() => readable.readInt8());
        readable.rollback();
        // Error: Nothing to rollback before started
        assert.throws(() => readable.rollback());
        // restart
        assert.equal(readable.readInt16LE(), 0x0302);
        assert.equal(readable.readUInt16LE(), 0x0504);
        assert.equal(readable.readInt32LE(), 0x09080706);
        assert.equal(readable.readUInt32LE(), 0x0d0c0b0a);
        readable.end();
        // RangeError: Out of range
        assert.throws(() => readable.readInt8());
        readable.empty();
        readable.push(Buffer.from("ABCD"));
        assert.equal(atos(readable.readBuffer(2)), stos("AB"));
        assert.equal(readable.readString(2), "CD");
        readable.push(Buffer.from("EFG"));
        readable.push(Buffer.from("HIJ"));
        assert.equal(atos(readable.readBuffer(2)), stos("EF"));
        assert.equal(readable.readString(2), "GH");
        assert.equal(atos(readable.readBuffer(2)), stos("IJ"));
        // UInt8, Int8
        readable.push([255, 255]);
        assert.equal(readable.readUInt8(), 255);
        assert.equal(readable.readInt8(), -1);
    });
});
function stos(string) {
    return atos([].map.call(string, (v) => {
        return v.charCodeAt(0);
    }));
}
function atos(array) {
    return [].map.call(array, (v) => {
        return (v > 15 ? "" : "0") + v.toString(16);
    }).join("-");
}
