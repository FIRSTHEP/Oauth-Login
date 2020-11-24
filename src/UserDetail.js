import React from 'react'
import { Form, Input, Button, Layout, Row, Col, Card, message } from 'antd';
import { SyncOutlined, PoweroffOutlined } from '@ant-design/icons'

const UserDetail = () => {
    const [form] = Form.useForm()
    const localData = localStorage.getItem('cusData')
    const data = JSON.parse(localData)

    const onFinish = (values) => {
        message.success('Please view values in console log')
        console.log('Received values of form: ', values);
    };

    const logOut = () => {
        localStorage.removeItem('access_token')
    }

    return (
        <>
            <Layout style={{ height: '100vh', display: 'flex', alignItems: 'center', backgroundColor: '#296194', }}>
                <Card
                    extra={<Button onClick={() => { logOut() }} icon={<PoweroffOutlined />}>Log out</Button>}
                    title={<span style={{ float: 'left', fontSize: '1.5rem' }}><stong>{' '}User{' '}ID{' '}:{' '}{data.userId}</stong></span>}
                    style={{
                        fontFamily: 'kanit',
                        boxShadow: '0px 5px 6px -1px rgba(0,0,0,0.15)',
                        borderRadius: '.85rem',
                        textAlign: 'center',
                        height: 'auto',
                        width: 'auto',
                        margin: 'auto',
                        padding: '1rem',
                        paddingBottom: 0,
                    }}>
                    <Form
                        form={form}
                        onFinish={onFinish}
                        initialValues={data}
                        scrollToFirstError>
                        <Row gutter={[16, 16]}>
                            <Col span={4}>
                                <Form.Item
                                    name="sex"
                                    label="Gender" >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={10}>
                                <Form.Item
                                    name="fullNameTh"
                                    label="Full Name (Th)" >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={10}>
                                <Form.Item
                                    name="fullName"
                                    label="Full Name (En)" >
                                    <Input />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={[16, 16]}>
                            <Col span={5}>
                                <Form.Item
                                    name="branchCode"
                                    label="Branch Code" >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={9}>
                                <Form.Item
                                    name="branchTh"
                                    label="Branch (Th)" >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={10}>
                                <Form.Item
                                    name="branchEn"
                                    label="Branch (En)" >
                                    <Input />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={[16, 16]}>
                            <Col span={5}>
                                <Form.Item
                                    name="roleCode"
                                    label="Role Code" >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={9}>
                                <Form.Item
                                    name="roleTh"
                                    label="Role (Th)" >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={10}>
                                <Form.Item
                                    name="roleEn"
                                    label="Role (En)" >
                                    <Input />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={[16]}>
                            <Col span={24}>
                                <Form.Item>
                                    <Button
                                        icon={<SyncOutlined />}
                                        block="true"
                                        size="large"
                                        type="primary"
                                        htmlType="submit">
                                        Update
                                    </Button>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </Card>
            </Layout>
        </>
    );
}

export default UserDetail
