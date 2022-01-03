import React, { useState, useEffect } from 'react';
import { Rate, InputNumber, Button, Select } from 'antd';
import Fuse from 'fuse.js';

const { Option } = Select;

const comparators = (
  <Select defaultValue="lt" style={{ width: 60 }}>
    <Option value="lt">&lt;</Option>
    <Option value="gt">&gt;</Option>
    <Option value="eq">=</Option>
  </Select>
);

const MacroFilter = () => {
  const [value, setValue] = useState('calories')
  return (
    <div>
      <Select
        value={value}
        style={{ margin: "5px 10px" }}
        onChange={setValue}
      >
        <Option value="calories">Calories</Option>
        <Option value="carbs">Carbs</Option>
        <Option value="fat">Fat</Option>
        <Option value="protein">Protein</Option>
      </Select>
      <InputNumber addonBefore={comparators} defaultValue={100} />
    </div>
  );
};

export default MacroFilter;
