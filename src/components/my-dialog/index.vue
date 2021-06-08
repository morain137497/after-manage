<template>
  <el-dialog :title="title" v-model="dialogStatus" :close-on-click-modal="false">
    <div class="dialog-content">
      <slot name="myDialogSlot"></slot>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closeDialog">取 消</el-button>
        <el-button type="primary" @click="submitDialog">确 定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import {ref} from "vue";

export default {
  name: "index",
  setup(props, { emit }){
    let dialogStatus = ref(false)
    let title = ref('提示')

    const closeDialog = () => {
      dialogStatus.value = false
      emit('closeDialog')
    }

    const submitDialog = () => {
      emit('submitDialog')
    }

    return{
      dialogStatus,
      title,
      closeDialog,
      submitDialog
    }
  }
}
</script>

<style scoped>
.dialog-content{
  width: 80%;
  margin: 0 auto;
}
</style>
