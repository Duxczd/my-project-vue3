<template>
  <el-container class="LayoutView">
    <el-header class="LayoutViewHeader">Header</el-header>
    <el-container class="LayoutViewContainer">
      <el-aside class="LayoutViewAside">Aside</el-aside>
      <el-main class="LayoutViewMain">
        <router-view v-slot="{ Component }">
          <keep-alive :include="keepAliveRoute">
            <component :key="$route.fullPath"
                       :is="Component" />
          </keep-alive>
        </router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default { name: 'LayoutView' }
</script>

<script setup>
import { ref } from 'vue'

// 需要缓存的路由名称列表
const keepAliveRoute = ref([
  // 在这里添加需要被缓存的路由
  // 例如: 'Home', 'SystemManage' 等
])
</script>

<style lang="scss">
.LayoutView {
  width: 100%;
  height: 100%;

  .LayoutViewHeader {
    height: 62px;
    background-color: #c6e2ff;
  }

  .LayoutViewContainer {
    width: 100%;
    height: calc(100% - 62px);

    .LayoutViewAside {
      width: 200px;
      height: 100%;
    }

    .LayoutViewMain {
      height: 100%;
      padding: 16px 16px 0 0
    }
  }
}
</style>