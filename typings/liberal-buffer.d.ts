/**
 * @see https://github.com/kawanet/liberal-buffer
 */

type BufferLike = Uint8Array | Array<number>;

declare class LinkedBuffer {
    static from(buffer: Buffer, start?: number, end?: number);
    static from(buffer: BufferLike, start?: number, end?: number);

    buffer: Buffer;
    start: number;
    end: number;
    next: this;

    append(buffer: Buffer, start?: number, end?: number): this;
    append(buffer: BufferLike, start?: number, end?: number): this;

    clear(): this;

    toBuffer(): Buffer;
}

declare class LiberalBuffer {
    chain: LinkedBuffer;

    offset: number;

    begin(): this;

    empty(): this;

    end(): this;

    pull(length: number): Buffer;

    push(buffer: Buffer, start?: number, end?: number): this;
    push(buffer: BufferLike, start?: number, end?: number): this;

    rollback(): this;
}

export declare class ReadableBuffer extends LiberalBuffer {

    protected reserve(length: number, callback?: (buffer: Buffer, start: number, end?: number) => void): void;

    readBuffer(length: number): Buffer;

    readDoubleBE(): number;

    readDoubleLE(): number;

    readFloatBE(): number;

    readFloatLE(): number;

    readInt16BE(): number;

    readInt16LE(): number;

    readInt32BE(): number;

    readInt32LE(): number;

    readInt8(): number;

    readString(length: number): string;

    readUInt16BE(): number;

    readUInt16LE(): number;

    readUInt32BE(): number;

    readUInt32LE(): number;

    readUInt8(): number;
}

export declare class WritableBuffer extends LiberalBuffer {
    protected reserve(length: number, callback?: (buffer: Buffer, offset: number, value?: any) => any, value?: any): any;

    insertBuffer(value: Buffer, start?: number, end?: number): number;
    insertBuffer(value: BufferLike, start?: number, end?: number): number;

    toBuffer(): Buffer;

    writeBuffer(buffer: Buffer, start?: number, end?: number): number;
    writeBuffer(buffer: BufferLike, start?: number, end?: number): number;

    writeDoubleBE(value: number): number;

    writeDoubleLE(value: number): number;

    writeFloatBE(value: number): number;

    writeFloatLE(value: number): number;

    writeInt16BE(value: number): number;

    writeInt16LE(value: number): number;

    writeInt32BE(value: number): number;

    writeInt32LE(value: number): number;

    writeInt8(value: number): number;

    writeString(string: string): number;

    writeUInt16BE(value: number): number;

    writeUInt16LE(value: number): number;

    writeUInt32BE(value: number): number;

    writeUInt32LE(value: number): number;

    writeUInt8(value: number): number;
}