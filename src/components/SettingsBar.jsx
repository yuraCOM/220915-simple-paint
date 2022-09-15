import React from 'react';
import CanvasState from '../store/CanvasState';
import ToolState from "../store/ToolState";

const SettingBar = () => {
  return (
    <div className="setting-bar">

      <label htmlFor="line-width">Толщина линии</label>
      <input
        onChange={e => ToolState.setLineWidth(e.target.value)}
        style={{ margin: '0 10px' }}
        id="line-width"
        type="number" defaultValue={1} min={1} max={50} />

      <label htmlFor="stroke-color">Цвет обводки</label>
      <input onChange={e => ToolState.setStrokeColor(e.target.value)} id="stroke-color" type="color" />

    </div>
  );
};

export default SettingBar;