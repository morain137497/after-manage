import { ElMessageBox } from 'element-plus';

export const confirm = (callback) => {
    ElMessageBox.confirm('是否继续执行次操作?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
    }).then(() => {
        callback()
    }).catch(() => {})
}
