
import { Dictionary, beginCell, Cell, Address } from "@ton/core";
import { sha256_sync } from "@ton/crypto";


const ONCHAIN_CONTENT_PREFIX = 0x00;
const SNAKE_PREFIX = 0x00;

const toKey = (key: string) => {
  return BigInt(`0x${sha256_sync(key).toString("hex")}`);
};

export function buildOnchainMetadata(data: {
  name: string;
  description: string;
  image: string;
  symbol: string;
}): Cell {
  let dict = Dictionary.empty(
    Dictionary.Keys.BigInt(256),
    Dictionary.Values.Cell()
  );
  Object.entries(data).forEach(([key, value]) => {
    dict.set(toKey(key), beginCell()
      .storeUint(SNAKE_PREFIX, 8)
      .storeStringTail(value)
    .endCell());
  });

  return beginCell()
   .storeInt(ONCHAIN_CONTENT_PREFIX, 8)
   .storeDict(dict)
   .endCell();
}
