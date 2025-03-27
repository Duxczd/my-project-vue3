<template>
  <div class="LayoutView">
    <router-view v-slot="{ Component }">
      <keep-alive :include="keepAliveRoute">
        <component :key="$route.fullPath"
                   :is="Component" />
      </keep-alive>
    </router-view>
  </div>
</template>

<script>
export default { name: 'LayoutView' }
</script>

<script setup>
import { ref } from 'vue'

// 需要缓存的路由名称列表
const keepAliveRoute = ref([
  // 在这里添加需要被缓存的路由组件名称
  // 例如: 'Home', 'SystemManage' 等
])
</script>

<style lang="scss">
.LayoutView {
  width: 100%;
  height: 100%;
}
</style>