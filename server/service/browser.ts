import type {
  ApiDesk,
  ApiMessage,
  ApiProject,
  ApiRevision,
  DeskId,
  MessageId,
  ProjectId,
  RevisionId,
  WorkId,
} from '$/types'
import { PrismaClient } from '.prisma/client'
import { uuid } from 'uuidv4'

const projects: ApiProject[] = [
  { id: 'frourio' as ProjectId, name: 'frourio PJ' },
  { id: 'violet' as ProjectId, name: 'Violet PJ' },
]

const desks: { projectId: ProjectId; desks: ApiDesk[] }[] = [
  {
    projectId: projects[0].id,
    desks: [
      {
        id: 'desk_1' as DeskId,
        name: 'Desk 1',
        works: [
          { id: 'work_1' as WorkId, name: 'work1', ext: 'word', path: '' },
          { id: 'work_2' as WorkId, name: 'work2', ext: 'jpg', path: '/あああ' },
          { id: 'work_3' as WorkId, name: '.htaccess', path: '/path1/path2' },
        ],
      },
      {
        id: 'desk_2' as DeskId,
        name: 'Desk 2',
        works: [
          { id: 'work_4' as WorkId, name: 'work4', ext: 'word', path: '/path1/path3' },
          { id: 'work_5' as WorkId, name: '.gitignore', path: '/path2/path4/ううう' },
          { id: 'work_6' as WorkId, name: 'いいい', ext: 'xlsx', path: '/path2/path4' },
        ],
      },
    ],
  },
  {
    projectId: projects[1].id,
    desks: [
      {
        id: 'desk_1' as DeskId,
        name: 'Violet Desk 1',
        works: [
          { id: 'work_7' as WorkId, name: 'work1', ext: 'word', path: '' },
          { id: 'work_8' as WorkId, name: 'work2', ext: 'jpg', path: '/あああ' },
          { id: 'work_9' as WorkId, name: '.htaccess', path: '/path1/path2' },
        ],
      },
      {
        id: 'desk_2' as DeskId,
        name: 'Violet Desk 2',
        works: [
          { id: 'work_10' as WorkId, name: 'work4', ext: 'word', path: '/path1/path3' },
          { id: 'work_11' as WorkId, name: '.gitignore', path: '/path2/path4/ううう' },
          { id: 'work_12' as WorkId, name: 'いいい', ext: 'xlsx', path: '/path2/path4' },
        ],
      },
    ],
  },
]

const revisionsList: { projectId: ProjectId; workId: WorkId; revisions: ApiRevision[] }[] = [
  {
    projectId: projects[0].id,
    workId: 'work_1' as WorkId,
    revisions: [
      {
        id: 'revision_123456' as RevisionId,
        editions: [],
        messages: [{ id: 'message_1' as MessageId }],
      },
    ],
  },
  { projectId: projects[0].id, workId: 'work_2' as WorkId, revisions: [] },
  { projectId: projects[0].id, workId: 'work_3' as WorkId, revisions: [] },
  { projectId: projects[0].id, workId: 'work_4' as WorkId, revisions: [] },
  { projectId: projects[0].id, workId: 'work_5' as WorkId, revisions: [] },
  { projectId: projects[0].id, workId: 'work_6' as WorkId, revisions: [] },
  { projectId: projects[1].id, workId: 'work_7' as WorkId, revisions: [] },
  { projectId: projects[1].id, workId: 'work_8' as WorkId, revisions: [] },
  { projectId: projects[1].id, workId: 'work_9' as WorkId, revisions: [] },
  { projectId: projects[1].id, workId: 'work_10' as WorkId, revisions: [] },
  { projectId: projects[1].id, workId: 'work_11' as WorkId, revisions: [] },
  { projectId: projects[1].id, workId: 'work_12' as WorkId, revisions: [] },
]

const messageList: { revisionId: ApiRevision['id']; messages: ApiMessage[] }[] = [
  {
    revisionId: 'revision_123456' as RevisionId,
    messages: [
      {
        id: 'message_1' as MessageId,
        content: 'reviewreviewreviw',
        createdAt: Date.now(),
        userName: 'violet',
        replys: [],
      },
    ],
  },
]

const prisma = new PrismaClient()
export const getProjects = () => projects
export const getDesks = (projectId: ProjectId) =>
  desks.find((d) => d.projectId === projectId)?.desks
export const getRevisions = (workId: WorkId) => revisionsList.find((r) => r.workId === workId)
export const createRevision = (workId: WorkId) => {
  const revisions = revisionsList.find((r) => r.workId === workId)?.revisions
  if (!revisions) return

  const newRevision: ApiRevision = {
    id: `${workId}-${revisions.length}` as RevisionId,
    editions: [],
    messages: [],
  }
  revisions.push(newRevision)

  return newRevision
}
export const getMessages = async (revisionId: RevisionId) => {
  const messages = await prisma.message.findMany({
    where: {
      revisionId: revisionId,
    },
  })
  if (!messages) return

  const apiMessage: ApiMessage[] = []
  for (let i = 0; i < messages.length; i++) {
    const m = {
      id: messages[i].messageId as MessageId,
      content: messages[i].content,
      createdAt: messages[i].createdAt.getDay(),
      userName: messages[i].userName,
      replys: [],
    }
    apiMessage.push(m)
  }

  return apiMessage
}
export const createMessage = async (
  revisionId: RevisionId,
  content: ApiMessage['content'],
  userName: ApiMessage['userName']
) => {
  const id = uuid()
  await prisma.message.create({
    data: {
      messageId: id,
      content: content,
      userName: userName,
      revisionId: revisionId,
    },
  })

  const newMessage = await prisma.message.findFirst({
    where: {
      messageId: id,
    },
  })

  if (!newMessage) return
  const apiMessage: ApiMessage = {
    id: newMessage.messageId as MessageId,
    content: newMessage.content,
    createdAt: newMessage.createdAt.getDate(),
    userName: newMessage.userName,
    replys: [],
  }
  return apiMessage
}