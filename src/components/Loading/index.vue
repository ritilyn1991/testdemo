<template>
  <div class="loading-bg" :class="{ mask: props.mask }">
    <div class="loading-container">
      <van-loading
        vertical
        :color="props.color"
        :text-color="props.textColor"
        >{{ props.title }}</van-loading
      >
    </div>
  </div>
</template>
<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    // 是否有遮罩层
    mask?: boolean;
    // 图标颜色
    color?: string;
    // 文字颜色
    textColor?: string;
    // 默认文案
    title?: string;
  }>(),
  {
    mask: true,
    color: '#ff6b2b',
    textColor: '#ff6b2b',
    title: '加载中...'
  }
);
</script>
<script lang="ts">
export default {
  name: 'Loading'
};
</script>
<style lang="less">
.loading-bg {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
