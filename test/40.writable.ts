"use strict";

import * as assert from "assert";
import {WritableBuffer} from "../";

const TITLE = __filename.split("/").pop();

describe(TITLE, () => {

    it("WritableBuffer", () => {
        const writable = new WritableBuffer();

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

    it("insertBuffer", () => {
        let writable;

        writable = new WritableBuffer();
        assert.equal(writable.insertBuffer([1, 2]), 2);
        assert.equal(writable.insertBuffer([3, 4]), 2);
        assert.equal(atos(writable.toBuffer()), atos([1, 2, 3, 4]));

        writable = new WritableBuffer();
        assert.equal(writable.insertBuffer([]), 0);
        assert.equal(writable.insertBuffer([5, 6]), 2);
        assert.equal(writable.insertBuffer([]), 0);
        assert.equal(atos(writable.toBuffer()), atos([5, 6]));

        writable = new WritableBuffer();
        assert.equal(writable.insertBuffer([]), 0);
        assert.equal(writable.insertBuffer([]), 0);
        assert.equal(atos(writable.toBuffer()), atos([]));

        writable = new WritableBuffer();
        assert.equal(writable.writeBuffer([]), 0);
        assert.equal(writable.writeBuffer([7, 8]), 2);
        assert.equal(writable.writeBuffer([]), 0);
        assert.equal(atos(writable.toBuffer()), atos([7, 8]));

        writable = new WritableBuffer();
        assert.equal(writable.insertBuffer([]), 0);
        assert.equal(writable.writeBuffer([9, 10]), 2);
        assert.equal(writable.insertBuffer([]), 0);
        assert.equal(atos(writable.toBuffer()), atos([9, 10]));
    });
});

function atos(array) {
    return [].map.call(array, (v) => {
        return (v > 15 ? "" : "0") + v.toString(16);
    }).join("-");
}