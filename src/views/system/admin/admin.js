import {h, ref} from 'vue'
import {FORM_TYPE, FORM_DATA_TYPE} from '../../../consts';


export const data = {
    columns: [
        {
            label: '手机号',
            prop: 'mobile'
        },
        {
            label: '角色',
            prop: 'roleList',
            render: (params) => {
                let roleStr = ''
                if( params.index !== -1 ) {
                    params.row.roleList.forEach(item => {
                        roleStr += item.name + ','
                    })
                }
                return h('span', {}, roleStr.substr(0, roleStr.length - 1))
            }
        },
        {
            label: '最后登陆时间',
            prop: 'lastLoginTime'
        }
    ],
    rows: [],
    defaultFormInfo: {
        id: 0,
        mobile: '',
        password: '',
        roleIds: []
    },
    searchColumns: {
        mobile: {
            label: '手机号',
            placeholder: '请输入手机号',
            type: FORM_TYPE.INPUT,
            disabled: true
        },
        status: {
            label: '状态',
            placeholder: '请输选择',
            type: FORM_TYPE.SELECT,
            keys: {
                label: 'label',
                value: 'id'
            },
            option: [
                {
                    id: 0,
                    label: '冻结'
                },
                {
                    id: 1,
                    label: '正常'
                }
            ]
        },
    },
    dialogFormRows: {
        mobile: {
            label: '手机号',
            placeholder: '请输入手机号',
            type: FORM_TYPE.INPUT,
            disabled: true
        },
        password: {
            label: '密码',
            placeholder: '请输入6-20位密码',
            type: FORM_TYPE.INPUT,
            inputType: 'password',
        },
        startDate: {
            label: '开始日期',
            placeholder: '请选择开始日期',
            type: FORM_TYPE.DATE_SELECT
        },
        startTime: {
            label: '开始时间',
            placeholder: '请选择开始时间',
            type: FORM_TYPE.TIME_SELECT,
        },
        status: {
            label: '状态',
            placeholder: '请输选择',
            type: FORM_TYPE.SELECT,
            keys: {
                label: 'label',
                value: 'id'
            },
            option: [
                {
                    id: 0,
                    label: '冻结'
                },
                {
                    id: 1,
                    label: '正常'
                }
            ]
        },
        roleIds: {
            label: '角色',
            type: FORM_TYPE.CHECKBOX,
            dataType: FORM_DATA_TYPE.ARRAY,
            keys: {
                label: 'name',
                value: 'id'
            },
            option: []
        }
    },
    dialogFormRules: {
        mobile: [
            { required: true, message: '请输入手机号', trigger: 'blur'},
            { len: 11, message: '请输入11位手机号', trigger: 'blur'}
        ],
        password: [
            { required: true, message: '请输入密码', trigger: 'blur'},
            { min: 6,max: 20, message: '请输入6-20位密码', trigger: 'blur'},
        ],
        roleIds: [
            { required: true, message: '请选择角色', trigger: 'blur'}
        ]
    }
}

export const getRows = async () => {
    data.rows = ref([
        {
            id: 1,
            mobile: '123456789',
            password: '123456789',
            roleIds: [1,2],
            startDate: '2021-03-12',
            roleList: [
                {
                    id: 1,
                    name: '编辑'
                },
                {
                    id: 2,
                    name: '管理员'
                }
            ],
            status: 1
        },
        {
            id: 2,
            mobile: '123456789',
            password: '123456789',
            roleIds: [1],
            roleList: [
                {
                    id: 1,
                    name: '编辑'
                }
            ],
            status: 0
        }
    ])
}

export const getUseRoles = () => {
    data.dialogFormRows.roleIds.option = [
        {
            id: 1,
            name: '编辑'
        },
        {
            id: 2,
            name: '管理员'
        }
    ]
}
