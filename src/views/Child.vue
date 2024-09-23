<template>
  <div class="child">child</div>
</template>
<script lang="ts" setup>
onActivated(async () => {
  console.info('activated-child');
});
</script>
<script lang="ts">
export default {
  name: 'Child'
}
</script>
<style lang="less">
</style>