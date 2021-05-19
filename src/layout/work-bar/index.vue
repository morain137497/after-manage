<template>
  <div :class="['transition','work-bar', collapse ? 'work-bar-close' : 'work-bar-open']">
    <i :class="['transition','collapse-icon', collapse ? 'el-icon-s-unfold' : 'el-icon-s-fold']" @click="changeCollapse()"></i>
    <div class="breadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item v-for="(item, index) in $route.matched" :key="index">{{ item.meta.title }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="bar-nav">
      <el-dropdown trigger="click" placement="bottom-start">
        <span class="el-dropdown-link">
          下拉菜单<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>黄金糕</el-dropdown-item>
            <el-dropdown-item divided>安全退出</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { ref, watch } from 'vue'
export default {
  name: "index",
  props: {
    collapseStatus: {
      type: Boolean,
      default(){
        return false
      }
    }
  },
  setup(props, { emit }){
    let collapse = ref(false)
    watch(props, () => {
      collapse.value = props.collapseStatus
    })
    const changeCollapse = () => {
      if(collapse.value) {
        collapse.value = false
      } else {
        collapse.value = true
      }
      emit('changeCollapse', collapse.value)
    }

    return{
      collapse,
      changeCollapse
    }
  }
}
</script>

<style scoped lang="scss">
.work-bar{
  z-index: 999;
  background: #FFF;
  position: fixed;
  top: 0;
  height: $work-bar-height;
  line-height: $work-bar-height;
  box-shadow: 0 1px 4px rgba(0, 21, 41, .08);
  overflow: hidden;
  display: flex;
  .collapse-icon{
    cursor: pointer;
    font-size: 24px;
    height: $work-bar-height;
    line-height: $work-bar-height;
    padding: 0 20px;
    text-align: center;
    color: #666;
    &:hover{
      background: #f4f4f4;
    }
  }
  .bar-nav{
    padding-right: 20px;
    margin-left: auto;
    cursor: pointer;
  }
}
.work-bar-open{
  left: $sidebar-width;
  width: calc(100% - #{$sidebar-width});
}
.work-bar-close{
  left: $sidebar-width-close;
  width: calc(100% - #{$sidebar-width-close});
}
.breadcrumb{
  .el-breadcrumb{
    height: $work-bar-height;
    line-height: $work-bar-height;
  }
}
</style>
