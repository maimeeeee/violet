import type { ApiMessage, RevisionId } from '@violet/api/types'

export type Methods = {
  get: {
    resBody: { revisionId: RevisionId; messages: ApiMessage[] }
  }
}