import type { ApiDesk, ApiProject } from '@violet/lib/types/api'
import type { ProjectId } from '@violet/lib/types/branded'

export type Methods = {
  get: {
    resBody: { projectId: ProjectId; desks: ApiDesk[] }
  }
  put: {
    reqBody: Pick<ApiProject, 'name'>
    resBody: ApiProject
  }
}
