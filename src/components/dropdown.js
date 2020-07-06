import React from "react";

export default ({ data, title, value, onChange }) => (
  <div>
    <label htmlFor={title}>{`Choose a ${title}:`}</label>
    <select
      name="cars"
      id="cars"
      value={value}
      onChange={({ target }) => onChange({title, value: target.value})}
    >
      {data.map((item) => (
        <option value={item.slug} key={item.id}>
          {item.label}
        </option>
      ))}
    </select>
  </div>
);