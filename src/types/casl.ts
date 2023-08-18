import { OperateEnum } from '@/enums/casl'

export type CaslRecord = Record<string, OperateEnum[]>

export interface Casl {
  entity: string
  operations: string
}
