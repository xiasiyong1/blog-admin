

<template>
    <Editor  :value="content" :plugins="plugins" @change="handleChange"  />
    <!-- <div class="markdown-body"> -->
        <!-- <Viewer :value="content" :plugins="plugins" /> -->
    <!-- </div> -->
</template>
    
<script setup lang='ts'>
    import 'bytemd/dist/index.css'
    import 'github-markdown-css/github-markdown.css'
    import gfm from '@bytemd/plugin-gfm'
    // @ts-ignore
    import { Editor, Viewer } from '@bytemd/vue-next'
    import { ref } from 'vue';


    const plugins = [
        gfm(),
        // Add more plugins here
    ]
    const content = ref()
    const handleChange = (v:string) => {
        console.log(v)
        content.value = v
    }
</script>
    
<style>
    
</style>