/* eslint-disable import/export */
/* eslint-disable complexity */
/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/no-unnecessary-boolean-literal-compare */
/* eslint-disable @typescript-eslint/no-empty-interface */

import { encodeMessage, decodeMessage, message } from 'protons-runtime'
import type { Codec } from 'protons-runtime'
import type { Uint8ArrayList } from 'uint8arraylist'

export interface Like {
  isLike: boolean
  timestamp: bigint
  rootId: string
  userSignature: string
}

export namespace Like {
  let _codec: Codec<Like>

  export const codec = (): Codec<Like> => {
    if (_codec == null) {
      _codec = message<Like>((obj, w, opts = {}) => {
        if (opts.lengthDelimited !== false) {
          w.fork()
        }

        if ((obj.isLike != null && obj.isLike !== false)) {
          w.uint32(8)
          w.bool(obj.isLike)
        }

        if ((obj.timestamp != null && obj.timestamp !== 0n)) {
          w.uint32(16)
          w.uint64(obj.timestamp)
        }

        if ((obj.rootId != null && obj.rootId !== '')) {
          w.uint32(26)
          w.string(obj.rootId)
        }

        if ((obj.userSignature != null && obj.userSignature !== '')) {
          w.uint32(34)
          w.string(obj.userSignature)
        }

        if (opts.lengthDelimited !== false) {
          w.ldelim()
        }
      }, (reader, length) => {
        const obj: any = {
          isLike: false,
          timestamp: 0n,
          rootId: '',
          userSignature: ''
        }

        const end = length == null ? reader.len : reader.pos + length

        while (reader.pos < end) {
          const tag = reader.uint32()

          switch (tag >>> 3) {
            case 1: {
              obj.isLike = reader.bool()
              break
            }
            case 2: {
              obj.timestamp = reader.uint64()
              break
            }
            case 3: {
              obj.rootId = reader.string()
              break
            }
            case 4: {
              obj.userSignature = reader.string()
              break
            }
            default: {
              reader.skipType(tag & 7)
              break
            }
          }
        }

        return obj
      })
    }

    return _codec
  }

  export const encode = (obj: Partial<Like>): Uint8Array => {
    return encodeMessage(obj, Like.codec())
  }

  export const decode = (buf: Uint8Array | Uint8ArrayList): Like => {
    return decodeMessage(buf, Like.codec())
  }
}
