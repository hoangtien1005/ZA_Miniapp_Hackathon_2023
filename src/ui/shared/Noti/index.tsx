import React from 'react';

// color : 'blue', 'red'
export default function Noti({ color, text }) {
  return (
    <div className={`block_noti block_noti_${color}`}>
      <span className="icon sz-14">
        <i className={`icon_noti_${color}`} />
      </span>
      <div className="content">{text}</div>
    </div>
  );
}
