export default function toCapitalize(string) {
  return string.replace(/[-_]/g, " ").replace(/\b[a-zA-Z]/g, (c) => c.toUpperCase());
}
