<template>
  <list-view :rows="rows"
             :columns="columns"
             :search-rows="searchColumns"
             :dialog-form-rows="dialogFormRows"
             :dialog-form-rules="dialogFormRules"
             :dialog-form-default="defaultFormInfo"
             @openDialog="openDialog"
             @submitDialog="submitDialog"
             @del="del"
             @search="search">
  </list-view>
</template>

<script>
import ListView from '../../../components/list-view'
import { data, getRows, getUseRoles  } from './admin'
import { ref} from 'vue'
export default {
  name: "index",
  components: {ListView},
  setup(){
    getRows()
    getUseRoles()

    let currentRowIndex = ref(-1)

    /**
     * 打开 dialog
     * @param index 数据行索引
     */
    const openDialog = (index) => {
      currentRowIndex.value = index
    }
    /**
     * 提交dialog
     * @param data
     */
    const submitDialog = (data) => {
      console.log(data)
    }

    /**
     * 搜索
     * @param data
     */
    const search = (data) => {
        console.log(data)
    }

    /**
     * 删除
     * @param index
     */
    const del = (index) => {
      data.rows.value.splice(index, 1)
    }

    return{
      ...data,
      currentRowIndex,
      openDialog,
      submitDialog,
      search,
      del
    }
  }
}
</script>

<style scoped>

</style>
