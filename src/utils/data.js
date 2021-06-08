/**
 * 清空数据
 * @param fields
 */
export const resetFields = (fields) => {
    if(fields instanceof Object) {
        for (let key in fields) {
            if(typeof fields[key] === 'string') {
                fields[key] = ''
            }
            if(typeof fields[key] === 'number') {
                fields[key] = 0
            }
            if(fields[key] instanceof Array) {
                fields[key].length = 0
            }
        }
    }
}
