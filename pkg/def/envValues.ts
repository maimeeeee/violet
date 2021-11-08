export interface VioletEnv {
  API_BASE_PATH: string
  API_ORIGIN: string
  API_PORT: number
  AWS_ACCESS_KEY_ID: string
  AWS_SECRET_ACCESS_KEY: string
  S3_BUCKET: string
  S3_ENDPOINT?: string | undefined
  S3_REGION: string
}

// eslint-disable-next-line complexity -- 列挙
export const extractEnv = (obj: Record<string, string | undefined>): VioletEnv => {
  const API_PORT = +(obj.API_PORT ?? '8080')
  const API_BASE_PATH = obj.API_BASE_PATH ?? ''
  const API_ORIGIN = obj.API_ORIGIN ?? ''
  const AWS_ACCESS_KEY_ID = obj.MINIO_ROOT_USER ?? ''
  const AWS_SECRET_ACCESS_KEY = obj.MINIO_ROOT_PASSWORD ?? ''
  const S3_REGION = obj.S3_REGION ?? ''
  const S3_ENDPOINT = obj.S3_ENDPOINT || undefined
  const S3_BUCKET = obj.S3_BUCKET ?? 'violet-app'

  return {
    API_BASE_PATH,
    API_ORIGIN,
    API_PORT,
    AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY,
    S3_BUCKET,
    S3_ENDPOINT,
    S3_REGION,
  }
}