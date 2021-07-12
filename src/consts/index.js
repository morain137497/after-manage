/**
 * 表单类型
 * @type {{DATE_SELECT: number, CHECKBOX: number, INPUT: number, WANG_EDITOR: number, TIME_SELECT: number, SELECT: number, IMAGE_UPLOAD: number}}
 */
export const FORM_TYPE = {
    INPUT: 0,  // input表单
    SELECT: 1, // 下拉选择器
    DATE_SELECT: 2, // 日期选择器
    TIME_SELECT: 3, // 时间选择器
    IMAGE_UPLOAD: 4, // 图片上传
    WANG_EDITOR: 5, // wangeditor 富文本
    CHECKBOX: 6 // 多选框
}

/**
 * 表单数据类型
 * @type {{ARRAY: string, STRING: string}}
 */
export const FORM_DATA_TYPE = {
    STRING: 'STRING',
    ARRAY: 'ARRAY'
}
