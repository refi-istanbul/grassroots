/* eslint-disable import/export */

/* eslint-disable complexity */

/* eslint-disable @typescript-eslint/no-namespace */

/* eslint-disable @typescript-eslint/no-unnecessary-boolean-literal-compare */

/* eslint-disable @typescript-eslint/no-empty-interface */
import { decodeMessage, encodeMessage, message } from "protons-runtime";
import type { Codec } from "protons-runtime";
import type { Uint8ArrayList } from "uint8arraylist";

export interface Root {
  id: string;
  tag: string;
  timestamp: bigint;
  title: string;
  description: string;
  imageURL: string;
  relatedPosts: string;
  location: string;
}

export namespace Root {
  let _codec: Codec<Root>;

  export const codec = (): Codec<Root> => {
    if (_codec == null) {
      _codec = message<Root>(
        (obj, w, opts = {}) => {
          if (opts.lengthDelimited !== false) {
            w.fork();
          }

          if (obj.id != null && obj.id !== "") {
            w.uint32(10);
            w.string(obj.id);
          }

          if (obj.tag != null && obj.tag !== "") {
            w.uint32(18);
            w.string(obj.tag);
          }

          if (obj.timestamp != null && obj.timestamp !== 0n) {
            w.uint32(24);
            w.uint64(obj.timestamp);
          }

          if (obj.title != null && obj.title !== "") {
            w.uint32(34);
            w.string(obj.title);
          }

          if (obj.description != null && obj.description !== "") {
            w.uint32(42);
            w.string(obj.description);
          }

          if (obj.imageURL != null && obj.imageURL !== "") {
            w.uint32(50);
            w.string(obj.imageURL);
          }

          if (obj.relatedPosts != null && obj.relatedPosts !== "") {
            w.uint32(58);
            w.string(obj.relatedPosts);
          }

          if (obj.location != null && obj.location !== "") {
            w.uint32(66);
            w.string(obj.location);
          }

          if (opts.lengthDelimited !== false) {
            w.ldelim();
          }
        },
        (reader, length) => {
          const obj: any = {
            id: "",
            tag: "",
            timestamp: 0n,
            title: "",
            description: "",
            imageURL: "",
            relatedPosts: "",
            location: "",
          };

          const end = length == null ? reader.len : reader.pos + length;

          while (reader.pos < end) {
            const tag = reader.uint32();

            switch (tag >>> 3) {
              case 1: {
                obj.id = reader.string();
                break;
              }
              case 2: {
                obj.tag = reader.string();
                break;
              }
              case 3: {
                obj.timestamp = reader.uint64();
                break;
              }
              case 4: {
                obj.title = reader.string();
                break;
              }
              case 5: {
                obj.description = reader.string();
                break;
              }
              case 6: {
                obj.imageURL = reader.string();
                break;
              }
              case 7: {
                obj.relatedPosts = reader.string();
                break;
              }
              case 8: {
                obj.location = reader.string();
                break;
              }
              default: {
                reader.skipType(tag & 7);
                break;
              }
            }
          }

          return obj;
        },
      );
    }

    return _codec;
  };

  export const encode = (obj: Partial<Root>): Uint8Array => {
    return encodeMessage(obj, Root.codec());
  };

  export const decode = (buf: Uint8Array | Uint8ArrayList): Root => {
    return decodeMessage(buf, Root.codec());
  };
}
