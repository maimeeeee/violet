import type { ApiProject } from '@violet/lib/types/api'

export type Methods = {
  get: {
    resBody: ApiProject
  }
  put: {
    reqBody: Pick<ApiProject, 'name'>
    resBody: ApiProject
  }
}
