export function assert(b: boolean, msg?: string): void {
  if (!b) {
    if (msg == undefined) {
        msg == "assert"
    }
    throw new Error(msg);
  }
}

