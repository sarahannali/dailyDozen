/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import {
  Button, Form, Input, InputNumber, Row, Col, Spin, Select, Alert,
} from 'antd';

import {
  CloseOutlined,
  PlusOutlined,
  LoadingOutlined,
} from '@ant-design/icons';
import Modal from 'antd/lib/modal/Modal';
import classes from './createRecipe.module.css';
import { postRecipe } from '../../requests/post';
import { macros, RecipeRequest } from '../../../../utils/propTypes';

const { Option } = Select;

function CreateRecipe() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const onFinish = async (values: RecipeRequest) => {
    setLoading(true);

    const { err, data } = await postRecipe(values);
    setLoading(false);

    if (err) {
      setError(data);
      return;
    }

    setIsModalVisible(false);
  };

  return (
    <div>
      <Button
        className={classes.addButton}
        type="primary"
        onClick={() => setIsModalVisible(true)}
      >
        <PlusOutlined />
        {' '}
        Create New
      </Button>
      <Modal
        title="Create Recipe"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        style={{ marginTop: '-50px' }}
        bodyStyle={{ maxHeight: '600px', overflowY: 'auto' }}
      >
        <Spin
          spinning={loading}
          indicator={<LoadingOutlined style={{ fontSize: 50 }} spin />}
        >
          <Form
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 18 }}
            onFinish={onFinish}
          >
            <Form.Item
              label="Name"
              name="name"
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Source"
              name="source"
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Image URL"
              name="imageURL"
            >
              <Input />
            </Form.Item>
            <Row justify="center" className={classes.formSection}>
              Macros:
            </Row>
            <Form.Item
              label="Servings"
              name="servings"
            >
              <InputNumber />
            </Form.Item>
            {macros.map((macro) => (
              <Form.Item
                label={macro}
                name={macro.toLowerCase()}
              >
                <InputNumber />
              </Form.Item>
            ))}
            <Row justify="center" className={classes.formSection}>
              Ingredients:
            </Row>
            <Form.List
              name="ingredients"
            >
              {(fields, { add, remove }) => (
                <>
                  {fields.map((field, index) => (
                    <Form.Item
                      label={`${index + 1}`}
                      key={field.key}
                      labelCol={{ span: 4 }}
                      wrapperCol={{ span: 18 }}
                    >
                      {fields.length > 0 ? (
                        <CloseOutlined
                          className={classes.deleteButton}
                          onClick={() => remove(field.name)}
                        />
                      ) : null}
                      <Form.Item
                        {...field}
                        name={[field.name, 'amount']}
                        style={{ marginTop: '-20px' }}
                      >
                        <InputNumber style={{ width: '20%' }} />
                      </Form.Item>
                      <Form.Item
                        {...field}
                        name={[field.name, 'amountType']}
                        style={{ marginTop: '-20px' }}
                      >
                        <Select
                          style={{ width: '30%' }}
                        >
                          <Option value="gal">gal</Option>
                          <Option value="cup">cup</Option>
                          <Option value="tbs">tbs</Option>
                          <Option value="tsp">tsp</Option>
                          <Option value="g">g</Option>
                        </Select>
                      </Form.Item>
                      <Form.Item
                        {...field}
                        name={[field.name, 'name']}
                        style={{ marginTop: '-20px' }}
                      >
                        <Input style={{ width: '90%' }} />
                      </Form.Item>
                    </Form.Item>
                  ))}
                  <Row justify="center">
                    <Form.Item>
                      <Button
                        onClick={() => add()}
                        icon={<PlusOutlined />}
                      >
                        Add Ingredient
                      </Button>
                    </Form.Item>
                  </Row>
                </>
              )}
            </Form.List>
            <Row style={{ height: '20px' }} />
            <Row justify="center" className={classes.formSection}>
              Steps:
            </Row>
            <Form.List
              name="steps"
            >
              {(fields, { add, remove }) => (
                <>
                  {fields.map((field, index) => (
                    <Form.Item
                      label={`${index + 1}`}
                      key={field.key}
                      labelCol={{ span: 4 }}
                      wrapperCol={{ span: 18 }}
                    >
                      {fields.length > 0 ? (
                        <CloseOutlined
                          className={classes.deleteButton}
                          onClick={() => remove(field.name)}
                        />
                      ) : null}
                      <Form.Item
                        {...field}
                        style={{ marginTop: '-20px' }}
                      >
                        <Input style={{ width: '90%' }} />
                      </Form.Item>
                    </Form.Item>
                  ))}
                  <Row justify="center">
                    <Form.Item>
                      <Button
                        onClick={() => add()}
                        icon={<PlusOutlined />}
                      >
                        Add Step
                      </Button>
                    </Form.Item>
                  </Row>
                </>
              )}
            </Form.List>
            <Row justify="center" className={classes.submitButton}>
              <Col>
                {error
                    && (
                    <Row style={{ marginBottom: '5px' }} justify="center">
                      <Alert message={error} type="error" />
                    </Row>
                    )}
                <Row justify="center">
                  <Form.Item style={{ marginBottom: '0px' }}>
                    <Button type="primary" htmlType="submit">
                      Submit
                    </Button>
                  </Form.Item>
                </Row>
              </Col>
            </Row>
          </Form>
        </Spin>
      </Modal>
    </div>
  );
}

export default CreateRecipe;
