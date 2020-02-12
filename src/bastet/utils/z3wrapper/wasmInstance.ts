export interface WasmJSInstance extends WebAssembly.Instance {
  ccall(fname: string, returnType: string, argTypes: string[], args: any[]): any;
  stackSave():  number;
  stackRestore(stack: number);
  stackAlloc(size: number);
}
