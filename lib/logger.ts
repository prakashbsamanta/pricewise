const colorCode = {
  red: "\x1b[31m",
  green: "\x1b[32m",
  warning: "\x1b[33m",
  info: "\x1b[34m",
};

export function logError(message: string) {
  console.log(`${colorCode.red}%s\x1b[0m`, message);
}

export function logSuccess(message: string) {
  console.log(`${colorCode.green}%s\x1b[0m`, message);
}
export function logWarning(message: string) {
  console.log(`${colorCode.warning}%s\x1b[0m`, message);
}
export function logInfo(message: string) {
  console.log(`${colorCode.info}%s\x1b[0m`, message);
}
