<script setup lang="ts">
import useUnhandledRejection from './hooks/use-unhandled-rejection'

useUnhandledRejection()
</script>

<template>
  <div>
    <RouterView />
  </div>
</template>
