<template>
  <div>
    <div v-for="item in casls" :key="item.id">
      <div>entity: {{ item.entity }}</div>
      <div>操作</div>
      <el-checkbox-group v-model="formRef.user">
        <el-checkbox :label="operate" v-for="operate in item.operations" :key="operate" />
      </el-checkbox-group>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive } from 'vue'

interface Casl {
  id: number
  entity: EntityEnum
  operations: string
}

enum OperateEnum {
  MANAGE = 'manage',
  DELETE = 'delete',
  READ = 'read',
  WRITE = 'write'
}

enum EntityEnum {
  USER = 'user',
  ROLE = 'role'
}

const data: Casl[] = [
  {
    id: 1,
    entity: EntityEnum.USER,
    operations: 'read,write,delete'
  },
  {
    id: 2,
    entity: EntityEnum.ROLE,
    operations: 'manage'
  }
]

const casls = computed(() => {
  return data.map((item) => {
    return { ...item, operations: item.operations.split(',') }
  })
})

type EntityMap = Partial<Record<EntityEnum, OperateEnum[]>>

const form: EntityMap = {}
data.forEach((item) => {
  form[item.entity] = []
})

const formRef = reactive(form)
</script>

<style></style>
