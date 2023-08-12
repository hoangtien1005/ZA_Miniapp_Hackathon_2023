import React from 'react';

export default function FieldValue({ label, value }) {
  return (
    <div className="group_field">
      <label>{label}</label>
      <div className="field_value">{value}</div>
    </div>
  );
}
