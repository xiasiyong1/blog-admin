import { OperateEnum, EntityEnum } from '@/enums/casl'
import type { CaslRecord } from '@/types/casl'

const CASLS: CaslRecord = {
  [EntityEnum.USER]: [OperateEnum.READ, OperateEnum.WRITE, OperateEnum.DELETE, OperateEnum.MANAGE],
  [EntityEnum.ROLE]: [OperateEnum.READ, OperateEnum.WRITE, OperateEnum.DELETE, OperateEnum.MANAGE]
}

export default CASLS
