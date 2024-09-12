<template>
  <div class="blue">blue</div>
</template>
<script lang="ts" setup>
onActivated(async () => {
  console.info('activated-test2');
});
</script>
<script lang="ts">
export default {
  name: 'Test2'
}
</script>
<style lang="less">
.blue {
  color: blue;
}
</style>