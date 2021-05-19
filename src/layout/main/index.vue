<template>
  <sidebar :collapse="collapse" />
  <work-bar :collapse-status="collapse" @changeCollapse="changeCollapse" />
  <div :class="[collapse ? 'close-content' : 'open-content', 'transition']">
    <router-view/>
  </div>
</template>

<script>
import sidebar from '../sidebar'
import workBar from '../work-bar'

import {onMounted, ref} from "vue";

export default {
  name: "index",
  components: {sidebar,workBar},
  setup(){
    let collapse = ref(false)
    const windowInit = () => {
      window.onresize = () => {
        if(document.body.clientWidth < 600) {
          collapse.value = true
        } else {
          collapse.value = false
        }
      }
    }
    const changeCollapse = (value) => {
      collapse.value = value
    }

    onMounted(() => {
      windowInit()
    })
    return{
      collapse,
      changeCollapse
    }
  }
}

</script>

<style scoped lang="scss">
.open-content{
  margin-top: $work-bar-height;
  margin-left: $sidebar-width;
  padding: 20px;
}

.close-content{
  margin-top: $work-bar-height;
  margin-left: $sidebar-width-close;
  padding: 20px;
}
</style>
