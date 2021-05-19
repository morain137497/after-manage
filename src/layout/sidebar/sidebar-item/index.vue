<template>
  <template v-for="(item, index) in routers" :key="index">
    <template v-if="item.meta.sidebar">
      <el-submenu v-if="item.children.length > 1" :index="item.path">
        <template #title>
          <i :class="item.meta.icon"></i>
          <span>{{item.meta.title}}</span>
        </template>
        <template v-for="(menu, i) in item.children" :key="i">
          <sidebar-item v-if="menu.children && menu.children.length > 1" :routers="[menu]"/>
          <el-menu-item v-else :index="item.path+'/'+menu.path">{{menu.meta.title}}</el-menu-item>
        </template>
      </el-submenu>
      <el-menu-item v-else :index="item.children[0].path">
        <i :class="item.meta.icon"></i>
        <template #title>{{item.meta.title}}</template>
      </el-menu-item>
    </template>
  </template>
</template>

<script>
export default {
  name: "SidebarItem",
  props: {
    routers: {
      type: Array,
      default(){
        return []
      }
    }
  }
}
</script>

<style scoped>

</style>
