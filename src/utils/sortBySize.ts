import { sizeType } from "./types/productsType";

export function sortBySize(arr: any[]): sizeType[] {
  return arr?.sort((a, b) => parseInt(String(a.size)) - parseInt(String(b.size)));
}