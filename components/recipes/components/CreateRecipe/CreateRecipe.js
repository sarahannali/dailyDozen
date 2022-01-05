import React, { useState } from 'react';
import {Button, Form, Input, InputNumber, Row} from 'antd';
import classes from './createRecipe.module.css';

import {
  DeleteFilled,
  CloseOutlined,
  MinusCircleOutlined,
  PlusOutlined
} from '@ant-design/icons';
import Modal from 'antd/lib/modal/Modal';

const CreateRecipe = () => {
  const [showForm, setShowForm] = useState(false);

  const macros = ["Carbs", "Calories", "Fat", "Protein"];

  const onFinish = (values) => {
    console.log('Success:', values);
  };

  return (
    <div>
      <Button className={classes.addButton}
        type="primary"
        onClick={() => setShowForm(true)}
      >
        <PlusOutlined /> Create New
      </Button>
      <Modal
        title="Create Recipe"
        visible={showForm}
        onCancel={() => setShowForm(false)}
        footer={null}
        style={{marginTop: '-50px'}}
        bodyStyle={{maxHeight: '600px', overflowY: 'auto', overflowX: 'none'}}
      >
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{span: 18}}
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
            name="url"
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
          {macros.map(macro =>
            <Form.Item
              label={macro}
              name={macro}
            >
              <InputNumber />
            </Form.Item>
          )}
          <Row justify="center" className={classes.formSection}>
            Ingredients:
          </Row>
          <Form.List
            label="Ingredients"
            name="ingredients"
          >
            {(fields, {add, remove}) => (
              <>
                {fields.map((field, index) => (
                  <Form.Item
                    label={`${index}`}
                    key={field.key}
                  >
                    <Form.Item
                      label="Name"
                      key={field.key}
                    >
                      <Input style={{ width: '90%', marginRight: '10px' }}/>
                      {fields.length > 0 &&
                        <DeleteFilled
                          onClick={() => remove(field.name)}
                      />}
                    </Form.Item>
                    <Form.Item
                      label="Amount (g)"
                      key={field.key}
                    >
                      <InputNumber  style={{ width: '40%', marginRight: '10px' }}/>
                    </Form.Item>
                  </Form.Item>
                ))}
                <Row justify="center">
                  <Button
                    onClick={() => add()}
                    icon={<PlusOutlined />}
                  >
                    Add Ingredient
                  </Button>
                </Row>
              </>
            )}
          </Form.List>
          <Row style={{height: '20px'}}></Row>
          <Row justify="center" className={classes.formSection}>
            Steps:
          </Row>
          <Form.List
            label="Steps"
            name="steps"
          >
            {(fields, { add, remove }) => (
              <>
                {fields.map((field, index) => (
                  <Form.Item
                    label={`${index + 1}`}
                    key={field.key}
                    labelCol={{ span: 4 }}
                    wrapperCol={{span: 18}}
                  >
                    {fields.length > 1 ? (
                      <CloseOutlined
                        className={classes.deleteButton}
                        onClick={() => remove(field.name)}
                      />
                    ) : null}
                    <Form.Item
                      {...field}
                    >
                      <Input  style={{ width: '90%', marginRight: '10px', marginTop: '-20px'}}/>
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
          <Row justify="center"  className={classes.submitButton}>
            <Form.Item style={{marginBottom: '0px'}}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};

export default CreateRecipe;
