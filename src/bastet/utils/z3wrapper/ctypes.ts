import {assert} from "./util"
type WasmHeap = DataView;

export abstract class CType {
  // Base class for all CTypes
}

interface CTypeClass<U> {
  // Interface describing the CType CLASS OBJECTS.
  // Specifically for every CType class, we statically know
  // its size, and how to build it from the heap.
  sizeof(): number;
  from_heap(heap: WasmHeap, off: number): U;
}

export class Void implements CType {
  static sizeof(): number {
    throw new Error("void doesn't have a size");
  }
  static from_heap(heap: WasmHeap, off: number): Void {
    throw new Error("void can't be instantiated");
  }
  constructor() {}
}

abstract class NumberCType implements CType {
  protected _val: number;
  abstract min(): number;
  abstract max(): number;

  constructor(arg: number) {
    assert (arg >= this.min() && arg <= this.max(),
      "Bad number " + arg + " out of range [" + this.min() + "," + this.max() + "]");
    this._val = arg;
  }
  val(): number { return this._val; };
}

export class Uint8 extends NumberCType {
  min(): number { return 0 };
  max(): number { return (1<<8-1); };
  static sizeof(): number { return 8 };
  static from_heap(heap: WasmHeap, off: number): Uint8
  {
    return new Uint8(heap.getUint8(off));
  }
}

export class Sint8 extends NumberCType {
  min(): number { return -(1<<7); };
  max(): number { return (1<<7)-1; };
  static sizeof(): number { return 8 };
  static from_heap(heap: WasmHeap, off: number): Sint8
  {
    return new Sint8(heap.getInt8(off));
  }
}

export class Uint16 extends NumberCType {
  min(): number { return 0 };
  max(): number { return (1<<16-1); };
  static sizeof(): number { return 16 };
  static from_heap(heap: WasmHeap, off: number): Uint16
  {
    return new Uint16(heap.getUint16(off));
  }
}

export class Sint16 extends NumberCType {
  min(): number { return -(1<<15); };
  max(): number { return (1<<15)-1; };
  static sizeof(): number { return 16 };
  static from_heap(heap: WasmHeap, off: number): Sint16
  {
    return new Sint16(heap.getInt16(off));
  }
}

export class Uint32 extends NumberCType {
  min(): number { return 0 };
  max(): number { return (1<<30) + (1<<30) + (1<<30) + ((1<<30) - 1); };
  static sizeof(): number { return 32 };
  static from_heap(heap: WasmHeap, off: number): Uint32
  {
    return new Uint32(heap.getUint32(off));
  }
}

export class Sint32 extends NumberCType {
  sizeof(): number { return 32 };
  min(): number { return -((1<<30) + (1<<30)); };
  max(): number { return ((1<<30) + ((1<<30)-1)); };
  static sizeof(): number { return 32 };
  static from_heap(heap: WasmHeap, off: number): Sint32
  {
    return new Sint32(heap.getInt32(off));
  }
}

export class Uint64 extends NumberCType {
  min(): number { return 0 };
  max(): number { return (1<<64-1); };
  static sizeof(): number { return 64 };
  static from_heap(heap: WasmHeap, off: number): Uint64
  {
    throw "64 bit numbers NYI";
  }
}

export class Sint64 extends NumberCType {
  sizeof(): number { return 64 };
  min(): number { return -(1<<31); };
  max(): number { return (1<<31)-1; };
  static sizeof(): number { return 64 };
  static from_heap(heap: WasmHeap, off: number): Sint64
  {
    throw "64 bit numbers NYI";
  }
}

export class Float extends NumberCType {
  sizeof(): number { return 32 };
  min(): number { return -(1<<31); };
  max(): number { return (1<<31)-1; };
  static sizeof(): number { return 32 };
  static from_heap(heap: WasmHeap, off: number): Float
  {
    return new Float(heap.getFloat32(off));
  }
}


export class Double extends NumberCType {
  sizeof(): number { return 64 };
  min(): number { return -(1<<31); };
  max(): number { return (1<<31)-1; };
  static sizeof(): number { return 64 };
  static from_heap(heap: WasmHeap, off: number): Double
  {
    return new Double(heap.getFloat64(off));
  }
}

export class Ptr extends Uint32 {
  deref<U>(heap: WasmHeap, typ: CTypeClass<U>): U {
    return typ.from_heap(heap, this._val);
  }

  static nullPtr(): Ptr {
    return new Ptr(0);
  }
}

export class CString extends Ptr {
  str(): string {
    return "TODO";
  }
}
