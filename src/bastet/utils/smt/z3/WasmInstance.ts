export interface WasmJSInstance extends WebAssembly.Instance {

  ccall(fname: string, returnType: string, argTypes: string[], args: any[]): any;

  stackSave():  number;

  stackRestore(stack: number);

  stackAlloc(size: number);

  _malloc(size: number): any;

  _free(ptr: any);

  HEAPU8: Uint8Array;

}
