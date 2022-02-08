<template>
  <el-card shadow="never" class="search-box">
    <el-divider content-position="left">操作</el-divider>
    <el-form :inline="true" :model="searchForm">
      <el-form-item v-for="(item, key, index) in searchRows" :key="index" :label="item.label">
        <el-input v-if="item.type === FORM_TYPE.INPUT" :placeholder="item.placeholder" v-model="searchForm[key]"/>
        <el-select v-if="item.type === FORM_TYPE.SELECT" v-model="searchForm[key]" :placeholder="item.placeholder">
          <el-option v-for="(v, i) in item.option" :key="i" :label="v[item.keys.label]" :value="v[item.keys.value]"></el-option>
        </el-select>
      </el-form-item>
      <slot name="searchSlot"></slot>
    </el-form>
    <div class="com-action">
      <el-button type="primary" icon="el-icon-search" @click="search" v-if="Object.keys(searchRows).length !== 0">搜索</el-button>
      <el-button type="success" icon="el-icon-plus" @click="openDialog(-1)" v-if="Object.keys(dialogFormRows).length !== 0">创建</el-button>
      <el-button type="danger" icon="el-icon-delete" v-if="checkboxSwitch" @click="delS">批量删除</el-button>
      <el-button type="warning" icon="el-icon-document" v-if="exportSwitch">数据导出</el-button>
    </div>
  </el-card>

  <el-card shadow="never" class="data-list">
    <el-divider content-position="left">数据</el-divider>
    <el-table
        :data="rows"
        :row-key="rowKey"
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
        lazy
        empty-text="暂无数据"
        :load="load"
        @selection-change="selectionChange">
      <el-table-column type="selection" width="50" v-if="checkboxSwitch"></el-table-column>
      <el-table-column type="expand" width="50" v-if="expandColumns.length > 0">
        <template #default="scope">
          <el-form label-position="right" inline>
            <template v-for="(item, index) in columns" :key="index">
              <el-form-item v-if="expandColumns.indexOf(item.value) !== -1" :label="item.label" class="expand-item">
                <my-column v-if="item.render" :render="item.render" :row="scope.row" :column="item" :index="scope.$index" />
                <span v-else>{{ scope.row[item.prop] }}</span>
              </el-form-item>
            </template>
          </el-form>
        </template>
      </el-table-column>
      <template v-for="(item, index) in columns" :key="index">
        <el-table-column v-if="expandColumns.indexOf(item.prop) === -1" :prop="item.prop" :label="item.label">
          <template #default="scope">
            <my-column v-if="item.render" :render="item.render" :row="scope.row" :column="item" :index="scope.$index" />
            <span v-else>{{ scope.row[item.prop] }}</span>
          </template>
        </el-table-column>
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

  <my-dialog ref="myDialogRef" @submitDialog="submitDialog" @closeDialog="closeDialog" :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false">
    <template v-slot:myDialogSlot>
      <el-form label-position="top" :model="dialogForm" :rules="dialogFormRules" ref="dialogFormRef">
        <el-form-item v-for="(item, key, index) in dialogFormRows" :key="index" :label="item.label" :prop="key">
          <el-input v-if="item.type === FORM_TYPE.INPUT" :disabled="item.disabled" :placeholder="item.placeholder" v-model="dialogForm[key]"/>
          <el-checkbox-group v-if="item.type === FORM_TYPE.CHECKBOX" v-model="dialogForm[key]">
            <el-checkbox v-for="(v, i) in item.option" :key="i" :label="v[item.keys.value]">{{v[item.keys.label]}}</el-checkbox>
          </el-checkbox-group>
          <el-select v-if="item.type === FORM_TYPE.SELECT" v-model="dialogForm[key]" :placeholder="item.placeholder">
            <el-option v-for="(v, i) in item.option" :key="i" :label="v[item.keys.label]" :value="v[item.keys.value]"></el-option>
          </el-select>
          <image-upload v-if="item.type === FORM_TYPE.IMAGE_UPLOAD" />
          <el-date-picker v-if="item.type === FORM_TYPE.DATE_SELECT" v-model="dialogForm[key]" :format="item.format?item.format:'YYYY-MM-DD'" :type="item.inputType?item.inputType:'date'" :placeholder="item.placeholder"></el-date-picker>
          <el-time-picker v-if="item.type === FORM_TYPE.TIME_SELECT" v-model="dialogForm[key]" :format="item.format?item.format:'HH:mm:ss'" :placeholder="item.placeholder"></el-time-picker>
        </el-form-item>
        <slot name="dialogContentSlot"></slot>
      </el-form>
    </template>
  </my-dialog>
</template>

<script>
import {h, reactive, ref, toRefs} from "vue";
import myDialog from '../my-dialog'
import { confirm } from '../../element-plus/util'
import { FORM_TYPE, FORM_DATA_TYPE } from '../../consts'
import imageUpload from '../image-upload'
import { resetFields } from '../../utils/data'
export default {
  name: "index",
  components: {
    myDialog,
    imageUpload,
    myColumn: {
      functional: true,
      props: {
        row: Object,
        render: Function,
        index: Number,
        column: {
          type: Object
        }
      },
      setup(props){
        return ()=> {
          const params = {
            row: props.row,
            index: props.index
          }
          return h(props.render, params)
        }
      }
    }
  },
  emits: {
    openDialog:null,
    submitDialog:null,
    closeDialog:null,
    search:null,
    load:null
  },
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
    },
    searchRows: {
      type: Object,
      default(){
        return {}
      }
    },
    dialogFormRows: {
      type: Object,
      default(){
        return {}
      }
    },
    dialogFormRules: {
      type: Array,
      default(){
        return []
      }
    },
    dialogFormDefault: {
      type: Object,
      default(){
        return {}
      }
    }
  },
  setup(props, { emit }){
    let currentIndex = -1
    let dialogStatus = ref(true)
    let currentRows = reactive([])
    const myDialogRef = ref()
    const dialogFormRef = ref()
    const data = reactive({
      searchForm: {},
      dialogForm: {}
    })

    /**
     * 打开dialog
     * @param index 数据索引
     */
    const openDialog = (index) => {
      myDialogRef.value.dialogStatus = true
      if(index !== -1) {
        myDialogRef.value.title = '修改'
        currentIndex = index
        if(Object.keys(props.dialogFormRows).length !== 0) {
          Object.keys(props.dialogFormRows).forEach(key => {
            const item = props.dialogFormRows[key]
            data.dialogForm[key] = props.rows[index][key]
            if(item.dataType === FORM_DATA_TYPE.ARRAY) {
              data.dialogForm[key] = []
              props.rows[index][key].forEach(value => {
                data.dialogForm[key].push(value)
              })
            }
          })
        }
      } else {
        myDialogRef.value.title = '创建'
      }
      emit('openDialog', index)
    }

    /**
     * 提交dialog
     */
    const submitDialog = () => {
      dialogFormRef.value.validate((valid) => {
        if(valid) {
          emit('submitDialog', data.dialogForm)
        }
      })
    }

    const closeDialog = () => {
      resetFields(data.dialogForm)
      emit('closeDialog')
    }

    /**
     * 单个删除
     * @param index 数据索引
     */
    const del = (index) => {
      confirm(() => {
        emit('del', index)
      })
    }

    /**
     * 获取选中的row
     * @param rows row 数据
     */
    const selectionChange = (rows) => {
      if(rows.length > 0) {
        rows.forEach(item => {
          currentRows.push(item.id)
        })
      } else {
        currentRows = []
      }
    }

    /**
     * 批量删除
     */
    const delS = () => {
      confirm(() => {
        console.log(currentRows[0])
      })
    }

    /**
     * 搜索
     */
    const search = () => {
      emit('search', data.searchForm)
    }

    /**
     * 状态改变前
     * @returns {Promise<unknown>}
     */
    const statusChangeBefore = () => {
      return new Promise((resolve) => {
          confirm(() => {
            alert('index')
            return resolve(true)
          })
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


    const searchValues = () => {
      if(Object.keys(props.searchRows).length !== 0) {
        Object.keys(props.searchRows).forEach(key => {
          const item = props.searchRows[key]
          if(item.type === FORM_TYPE.INPUT) {
            data.searchForm[key] = ''
          }
        })
      }
    }

    const dialogFormValues = () => {
      if(Object.keys(props.dialogFormRows).length !== 0) {
        Object.keys(props.dialogFormRows).forEach(key => {
          const item = props.dialogFormRows[key]
          if(item.type === FORM_TYPE.INPUT) {
            data.dialogForm[key] = ''
          }
          if(item.type === FORM_TYPE.CHECKBOX) {
            data.dialogForm[key] = []
          }
        })
      }
    }

    dialogFormValues()
    searchValues()


    return {
      openDialog,
      submitDialog,
      del,
      delS,
      search,
      statusChangeBefore,
      load,
      selectionChange,
      closeDialog,
      dialogStatus,
      myDialogRef,
      currentIndex,
      dialogFormRef,
      FORM_TYPE,
      ...toRefs(data)
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
