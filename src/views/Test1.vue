<template>
  <div class="red">red</div>
</template>
<script lang="ts" setup>
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