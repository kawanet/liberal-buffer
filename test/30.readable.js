"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var assert = require("assert");
var _1 = require("../");
var TITLE = __filename.split("/").pop();
describe(TITLE, function () {
    it("ReadableBuffer", function () {
        var readable = new _1.ReadableBuffer();
        readable.push(Buffer.from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]));
        assert.equal(readable.readInt8(), 0x01);
        readable.begin();
        assert.equal(readable.readInt16BE(), 0x0203);
        assert.equal(readable.readUInt16BE(), 0x0405);
        assert.equal(readable.readInt32BE(), 0x06070809);
        assert.equal(readable.readUInt32BE(), 0x0a0b0c0d);
        // Error: BUFFER_SHORTAGE
        assert.throws(readable.readInt8.bind(readable));
        readable.rollback();
        // Error: Nothing to rollback before started
        assert.throws(readable.rollback.bind(readable));
        // restart
        assert.equal(readable.readInt16LE(), 0x0302);
        assert.equal(readable.readUInt16LE(), 0x0504);
        assert.equal(readable.readInt32LE(), 0x09080706);
        assert.equal(readable.readUInt32LE(), 0x0d0c0b0a);
        readable.end();
        assert.throws(readable.readInt8.bind(readable));
        readable.empty();
        readable.push(Buffer.from("ABCD"));
        var AB = readable.readBuffer(2);
        assert.equal(atos(AB), stos("AB"));
        var CD = readable.readString(2);
        assert.equal(CD, "CD");
        readable.push(Buffer.from("EFG"));
        readable.push(Buffer.from("HIJ"));
        var EF = readable.readBuffer(2);
        assert.equal(atos(EF), stos("EF"));
        var GH = readable.readString(2);
        assert.equal(GH, "GH");
        var IJ = readable.readBuffer(2);
        assert.equal(atos(IJ), stos("IJ"));
    });
});
function stos(string) {
    return atos([].map.call(string, function (v) {
        return v.charCodeAt(0);
    }));
}
function atos(array) {
    return [].map.call(array, function (v) {
        return (v > 15 ? "" : "0") + v.toString(16);
    }).join("-");
}
