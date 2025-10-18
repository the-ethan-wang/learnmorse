export const morseMap: { [key: string]: string } = {
  A: ".-",    B: "-...",  C: "-.-.",  D: "-..",   E: ".",     F: "..-.",
  G: "--.",   H: "....",  I: "..",    J: ".---",  K: "-.-",   L: ".-..",
  M: "--",    N: "-.",    O: "---",   P: ".--.",  Q: "--.-",  R: ".-.",
  S: "...",   T: "-",     U: "..-",   V: "...-",  W: ".--",   X: "-..-",
  Y: "-.--",  Z: "--..",
  "0": "-----", "1": ".----", "2": "..---", "3": "...--", "4": "....-", 
  "5": ".....", "6": "-....", "7": "--...", "8": "---..", "9": "----."
};

export function encode(text: string): string {
  return text
    .toUpperCase()
    .split("")
    .map((char) => morseMap[char] || "")
    .filter(Boolean)
    .join(" ");
}

export function decode(morse: string): string {
  const invMap = Object.entries(morseMap).reduce(
    (acc, [k, v]) => ({ ...acc, [v]: k }),
    {}
  );
  return morse
    .split(" ")
    .map((code) => invMap[code] || "")
    .join("");
}