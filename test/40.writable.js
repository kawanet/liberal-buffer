"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var assert = require("assert");
var _1 = require("../");
var TITLE = __filename.split("/").pop();
describe(TITLE, function () {
    it("WritableBuffer", function () {
        var writable = new _1.WritableBuffer();
        assert.equal(writable.writeInt8(1), 1);
        assert.equal(atos(writable.toBuffer()), atos([1]));
        assert.equal(writable.writeInt16BE(0x0203), 2);
        assert.equal(writable.writeInt32BE(0x04050607), 4);
        assert.equal(atos(writable.toBuffer()), atos([2, 3, 4, 5, 6, 7]));
        assert.equal(writable.writeUInt16BE(0x0809), 2);
        assert.equal(writable.writeUInt32BE(0x0a0b0c0d), 4);
        assert.deepEqual(atos(writable.toBuffer()), atos([8, 9, 10, 11, 12, 13]));
        assert.equal(writable.writeInt16LE(0x0203), 2);
        assert.equal(writable.writeInt32LE(0x04050607), 4);
        assert.equal(atos(writable.toBuffer()), atos([3, 2, 7, 6, 5, 4]));
        assert.equal(writable.writeUInt16LE(0x0809), 2);
        assert.equal(writable.writeUInt32LE(0x0a0b0c0d), 4);
        assert.equal(atos(writable.toBuffer()), atos([9, 8, 13, 12, 11, 10]));
        // string and buffer
        assert.equal(writable.writeString("AB"), 2);
        assert.equal(writable.writeBuffer(Buffer.from("CD")), 2);
        assert.equal(writable.toBuffer().toString(), "ABCD");
        // insert Buffer
        assert.equal(writable.writeBuffer([1, 2]), 2);
        assert.equal(writable.insertBuffer([3, 4]), 2);
        assert.equal(writable.writeBuffer([5, 6]), 2);
        assert.equal(atos(writable.toBuffer()), atos([1, 2, 3, 4, 5, 6]));
        // UInt8, Int8
        writable.writeUInt8(255);
        writable.writeInt8(-1);
        assert.equal(atos(writable.toBuffer()), atos([255, 255]));
    });
});
function atos(array) {
    return [].map.call(array, function (v) {
        return (v > 15 ? "" : "0") + v.toString(16);
    }).join("-");
}
