<template>
  <div class="red">red
    <child></child>
  </div>
</template>
<script lang="ts" setup>
import Child from './Child.vue';
onActivated(async () => {
  console.info('activated-test1');
});
</script>
<script lang="ts">
export default {
  name: 'Test1'
}
</script>
<style lang="less">
.red {
  color: red;
}
</style>