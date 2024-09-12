<template>
  <router-view v-slot="{ Component }">
    <keep-alive :include="cacheList">
      <component :is="Component" />
    </keep-alive>
  </router-view>
</template>
<script lang="ts" setup>
const cacheList = ref(['Test1', 'Test2'])
</script>
<script lang="ts">
export default {
  name: 'App'
};
</script>
