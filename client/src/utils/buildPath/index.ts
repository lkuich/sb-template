export default function buildPath(...args: (string | undefined)[]) {
  return args
    .filter((arg) => arg)
    .map((arg) => arg?.replace(/^\//, ''))
    .join('/');
}
