<template>
  <el-scrollbar :class="['transition','sidebar-box', collapse ? 'sidebar-close' : 'sidebar-open']">
      <el-menu
             :unique-opened="true"
             class="transition"
             background-color="#304056"
             text-color="#EEE"
             :router="true"
             :default-active="$route.fullPath"
             :collapse="collapse"
             active-text-color="#409EFF">
        <sidebar-item :routers="routers"/>
    </el-menu>
  </el-scrollbar>
</template>

<script>
import { useRouter } from 'vue-router'
import SidebarItem from './sidebar-item'
export default {
  name: "index",
  components: {SidebarItem},
  props: {
    collapse: {
      type: Boolean,
      default(){
        return false
      }
    }
  },
  setup () {
    const router = useRouter()
    const routers = router.options.routes


    return{
      routers
    }
  }
}
</script>

<style scoped lang="scss">
.sidebar-box{
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  background: $theme-background;
  overflow: hidden;
  overflow-y: scroll;
  &::-webkit-scrollbar{
    width: 0px;
  }
  &::-webkit-scrollbar-thumb{
    background: rgba(0, 0, 0, 0.3);
  }
}

.sidebar-open{
  width: $sidebar-width;
}

.sidebar-close{
  width: $sidebar-width-close;
}

.el-menu{
  border: none;
  .el-submenu{
    .el-menu-item{
      background: rgb(38,51,69) !important;
      &:hover{
        background: rgb(26, 38, 54) !important;
      }
    }
  }
}
</style>
