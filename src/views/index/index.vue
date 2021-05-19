<template>
  <list-view :rows="rows"
             :columns="columns">
    <template v-slot:dialogContentSlot>
      sdas
    </template>
  </list-view>
</template>

<script>
import ListView from '../../components/list-view'
import { reactive } from 'vue'
export default {
  name: "index",
  components: {ListView},
  setup(){
    const rows = reactive([
      {
        id: 1,
        name: 'jzz',
        phone: '123456789',
        status: 1
      }
    ])
    const columns = reactive([
      {
        label: '姓名',
        value: 'name'
      },
      {
        label: '手机号',
        value: 'phone'
      }
    ])

    return{
      rows,
      columns
    }
  }
}
</script>

<style scoped>

</style>
