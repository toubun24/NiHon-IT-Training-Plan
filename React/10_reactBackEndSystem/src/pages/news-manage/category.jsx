import React, { useState, useEffect, useContext, useRef } from 'react'; // useEffect // useContext, useRef for 可编辑单元格
import { Table, Button, Modal, Form, Input } from 'antd'; // Modal: 对话框 // Form, Input, Popconfirm for 可编辑单元格
import axios from 'axios';
import {
    DeleteOutlined,
    ExclamationCircleOutlined,
} from '@ant-design/icons';
const EditableContext = React.createContext(null); // 可编辑单元格创建上下文 // React

const { confirm } = Modal;

const EditableRow = ({ index, ...props }) => {
    const [form] = Form.useForm();
    return (
        <Form form={form} component={false}>
            <EditableContext.Provider value={form}>
                <tr {...props} />
            </EditableContext.Provider>
        </Form>
    );
}; 
const EditableCell = ({ // Warning: React does not recognize the `...` prop on a DOM element. // 写在Category的外面
    title,
    editable,
    children,
    dataIndex,
    record,
    handleSave,
    ...restProps
}) => {
    const [editing, setEditing] = useState(false);
    const inputRef = useRef(null);
    const form = useContext(EditableContext);
    useEffect(() => {
        if (editing) {
            inputRef.current.focus();
        }
    }, [editing]);
    const toggleEdit = () => {
        setEditing(!editing);
        form.setFieldsValue({
            [dataIndex]: record[dataIndex],
        });
    };
    const save = async () => {
        try {
            const values = await form.validateFields();
            toggleEdit();
            handleSave({
                ...record,
                ...values,
            });
        } catch (errInfo) {
            console.log('Save failed:', errInfo);
        }
    };
    let childNode = children;
    if (editable) {
        childNode = editing ? (
            <Form.Item
                style={{
                    margin: 0,
                }}
                name={dataIndex}
                rules={[
                    {
                        required: true,
                        message: `${title} is required.`,
                    },
                ]}
            >
                <Input ref={inputRef} onPressEnter={save} onBlur={save} />
            </Form.Item>
        ) : (
            <div
                className="editable-cell-value-wrap"
                style={{
                    paddingRight: 24,
                }}
                onClick={toggleEdit}
            >
                {children}
            </div>
        );
    }
    return <td {...restProps}>{childNode}</td>;
};

const Category = () => {
    const [table, setTable] = useState([])
    useEffect(
        () => {
            axios.get('http://localhost:5000/categories').then(
                response => {
                    setTable(response.data) // list
                }
            )
        }, []
    )
    const handleSave = (record) => { // handleSave
        setTable(table.map(item => {
            if (item.id === record.id) { // 匹配到项目
                return {
                    id: item.id,
                    title: record.title,
                    value: record.title,
                }
            }
            return item // 未匹配到项目
        }))
        axios.patch(`http://localhost:5000/categories/${record.id}`, {
            title: record.title,
            value: record.title
        })
    }
    const columns = [ // 涉及修改所以放到函数组件中
        {
            title: 'ID',
            dataIndex: 'id',
            render: (id) => { // render: 生成复杂数据的渲染函数，参数分别为当前行的值，当前行数据，行索引
                return <b>{id}</b> // 加粗
            }
        },
        {
            title: '栏目名称',
            dataIndex: 'title', // label => title
            onCell: (record) => ({ // 可编辑单元格属性
                record,
                editable: 1, // col.editable, // true
                dataIndex: 'title', // col.dataIndex, // Warning: React does not recognize the `...` prop on a DOM element.
                title: '栏目名称', // col.title,
                handleSave, // Warning: React does not recognize the `...` prop on a DOM element.
            }),
        },
        {
            title: '操作',
            // dataIndex: '',
            render: (item) => { // item
                return <div>
                    <Button danger icon={<DeleteOutlined />} onClick={() => { deleteItem(item) }} />
                </div>
            }
        },
    ];
    const components = {
        body: {
            row: EditableRow,
            cell: EditableCell,
        },
    };
    // const destroyAll = () => { Modal.destroyAll(); };
    const comfirmedDelete = (item) => { // const
        setTable(table.filter(data => data.id !== item.id)) // 过滤删除 // setTable: 放在组件函数体内 // state.filter
        axios.delete(`http://localhost:5000/categories/${item.id}`) // 删数据库

    };
    const deleteItem = (item) => {
        confirm({
            icon: <ExclamationCircleOutlined />,
            // content: <Button onClick={destroyAll}>Click to destroy all</Button>,
            content: '确认删除？',
            onOk() {
                // console.log('OK');
                comfirmedDelete(item)
            },
            onCancel() {
                // console.log('Cancel');
            },
        });
    };
    /* EditableTable */

    /* EditableTable */

    return (
        <>
            <Table dataSource={table} columns={columns} pagination={{ pageSize: 5 }} rowKey={item => item.id} components={components} /> {/* pagination: 分页器 */} {/* rowKey */} {/* components for 可编辑单元格 */}
        </>
    )
}

export default Category

/*
const Category = () => {
    return (
<div>
Category
</div>
    )
}

export default Category;
*/