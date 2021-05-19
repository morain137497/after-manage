<template>
  <el-card shadow="never" class="search-box" v-if="searchSwitch || createSwitch || checkboxSwitch || exportSwitch">
    <el-divider content-position="left">操作</el-divider>
    <el-form :inline="true" ref="searchForm">
      <slot name="search"></slot>
    </el-form>
    <div class="com-action">
      <el-button type="primary" icon="el-icon-search" @click="search" v-if="searchSwitch">搜索</el-button>
      <el-button type="success" icon="el-icon-plus" @click="openDialog(-1)" v-if="createSwitch">创建</el-button>
      <el-button type="danger" icon="el-icon-delete" v-if="checkboxSwitch">批量删除</el-button>
      <el-button type="warning" icon="el-icon-document" v-if="exportSwitch">数据导出</el-button>
    </div>
  </el-card>

  <el-card shadow="never" class="data-list">
    <el-divider content-position="left">数据</el-divider>
    <el-table :data="rows" :row-key="rowKey" :tree-props="{children: 'children', hasChildren: 'hasChildren'}" lazy  :load="load">
      <el-table-column type="selection" width="50" v-if="checkboxSwitch"></el-table-column>
      <el-table-column type="expand" width="50" v-if="expandColumns.length > 0">
        <template #default="scope">
          <el-form label-position="right" inline>
            <template v-for="(item, index) in columns" :key="index">
              <el-form-item v-if="expandColumns.indexOf(item.value) !== -1" :label="item.label" class="expand-item">
                <span>{{ scope.row[item.value] }}</span>
              </el-form-item>
            </template>
          </el-form>
        </template>
      </el-table-column>
      <template v-for="(item, index) in columns" :key="index">
        <el-table-column v-if="expandColumns.indexOf(item.value) === -1" :prop="item.value" :label="item.label"></el-table-column>
      </template>
      <el-table-column label="状态" v-if="statusSwitch">
        <template #default="scope">
          <el-switch v-model="scope.row.status" :active-value="1" :inactive-value="0" :beforeChange="statusChangeBefore"></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" class-name="row-action">
        <template #default="scope">
          <el-button type="danger" size="mini" v-if="scope.row" @click="del(scope.$index)">删除</el-button>
          <el-button type="warning" size="mini" v-if="scope.row" @click="openDialog(scope.$index)">修改</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="page">
      <el-pagination background  layout="prev, pager, next" :total="rowTotal"/>
    </div>
  </el-card>

  <my-dialog ref="myDialogRef" @submitDialog="submitDialog">
    <template v-slot:myDialogSlot>
      <slot name="dialogContentSlot"></slot>
    </template>
  </my-dialog>
</template>

<script>
import {onMounted, ref} from "vue";
import myDialog from '../my-dialog'
import { confirm } from '../../element-plus/util'
export default {
  name: "index",
  components: {myDialog},
  props: {
    columns: {
      type: Array,
      default(){
        return []
      }
    },
    rows: {
      type: Array,
      default() {
        return [];
      }
    },
    searchSwitch: {
      type: Boolean,
      default(){
        return true
      }
    },
    createSwitch: {
      type: Boolean,
      default(){
        return true
      }
    },
    updateSwitch: {
      type: Boolean,
      default(){
        return false
      }
    },
    delSwitch: {
      type: Boolean,
      default(){
        return false
      }
    },
    checkboxSwitch: {
      type: Boolean,
      default(){
        return false
      }
    },
    exportSwitch: {
      type: Boolean,
      default(){
        return false
      }
    },
    statusSwitch: {
      type: Boolean,
      default(){
        return true
      }
    },
    rowTotal: {
      type: Number,
      default(){
        return 100
      }
    },
    expandColumns: {
      type: Array,
      default(){
        return []
      }
    },
    rowKey: {
      type: String,
      default(){
        return 'id'
      }
    }
  },
  setup(props, { emit }){
    let currentIndex = -1
    let dialogStatus = ref(true)
    const myDialogRef = ref()

    /**
     * 打开dialog
     * @param index 数据索引
     */
    const openDialog = (index) => {
      myDialogRef.value.dialogStatus = true
      if(index !== -1) {
        myDialogRef.value.title = '修改'
        currentIndex = index
      } else {
        myDialogRef.value.title = '创建'
      }
    }

    /**
     * 提交dialog
     */
    const submitDialog = () => {

    }

    /**
     * 单个删除
     * @param index 数据索引
     */
    const del = (index) => {
      confirm(() => {
        alert(index)
      })
    }

    /**
     * 搜索
     */
    const search = () => {
      emit('search')
    }

    /**
     * 状态改变前
     * @returns {Promise<unknown>}
     */
    const statusChangeBefore = () => {
      return new Promise((resolve) => {
          return resolve(true)
      })
    }

    /**
     * 树形表格，加载子数据
     * @param tree
     * @param treeNode
     * @param resolve
     */
    const load = (tree, treeNode, resolve) => {
      emit('load', resolve)
    }

    onMounted(() => {

    })

    return {
      openDialog,
      submitDialog,
      del,
      search,
      statusChangeBefore,
      load,
      dialogStatus,
      myDialogRef,
      currentIndex
    }
  }
}
</script>

<style scoped lang="scss">
.data-list{
  margin-top: 20px;
}
.row-action{
  button{
    margin: 2px;
    padding: 2px 10px;
  }
}
.page{
  text-align: right;
  margin-top: 20px;
}
.expand-item{
  width: 50%;
  margin: 0;
  span{
    padding-left: 20px;
  }
}
</style>
