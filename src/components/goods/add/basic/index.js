//@flow
import React, { Component } from "react";
import { connect } from "react-redux";
import { View } from "react-web-dom";
import { Form, Input, TreeSelect } from "antd";
import styles from './index.css'
import { UploadGroupImage } from '../../../uploadImage'

const FormItem = Form.Item;
const TreeNode = TreeSelect.TreeNode;
type Props = {
    openPhotoGallery: Function,
    location: { state: { type: string, record: {} }, search: string },
    history: { push: Function },
    form: {
        getFieldDecorator: Function,
        setFieldsValue: Function,
    },
    formItemLayout: {},
    categoryTree: Array<{}>,
    openPreviewModal: Function
}
type State = {}
@connect()
export default class Basic extends Component<Props, State> {
    render() {
        const { form, formItemLayout, history, openPhotoGallery, categoryTree, openPreviewModal, title, images, categoryIds } = this.props
        const { getFieldDecorator, setFieldsValue } = form
        // TreeSelect 只接受string
        let _categoryIds = []
        if(Array.isArray(categoryIds) && categoryIds.length>0){
            _categoryIds = categoryIds.map((item) => {
                return item + ''
            })
        }
        return (
            <View className={styles.goodsItem}>
                <h3>基本信息</h3>
                <FormItem
                    {...formItemLayout}
                    label='商品图'
                >
                    {getFieldDecorator('images', {
                        rules: [{ required: true, message: '请选择商品图!' }],
                        valuePropName: 'url',
                        initialValue: images,
                    })(
                        <UploadGroupImage
                            onClick={(onChange, values) => {
                                values = values ? values : []
                                openPhotoGallery({
                                    photoGalleryOnOk: (e) => {
                                        onChange([...e, ...values])
                                    }
                                })
                            }}
                            preview={(previewImage) => {
                                openPreviewModal({
                                    previewImage,
                                })
                            }}
                        />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label='商品名称'
                >
                    {getFieldDecorator('title', {
                        rules: [{ required: true, message: '请输入商品名称!' }],
                        initialValue: title,
                    })(
                        <Input
                            placeholder="请输入商品名称"
                        />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label='商品分类'
                >
                    {getFieldDecorator('category_ids', {
                        initialValue: _categoryIds,
                        rules: [{ required: true, message: '请选择商品分类!' }],
                    })(
                        <TreeSelect
                            showSearch
                            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                            placeholder="请选择商品分类"
                            allowClear
                            multiple
                            treeDefaultExpandAll
                            onChange={(value) => {
                                setFieldsValue({
                                    category_ids: value
                                })
                            }}
                        >
                            {
                                categoryTree.map((item) =>
                                    <TreeNode value={`${item.id}`} title={item.name} key={item.id}>
                                        {
                                            item.children && item.children.map((sub) =>
                                                <TreeNode value={`${sub.id}`} title={sub.name} key={sub.id} />
                                            )
                                        }
                                    </TreeNode>
                                )
                            }
                        </TreeSelect>
                    )}
                    <a
                        onClick={() => {
                            history.push('/goods/category/add')
                        }}
                    >
                        新增分类
                    </a>
                </FormItem>
            </View>
        )
    }
}
