import { ReactElement, useEffect, useState } from 'react';

import './Info.css';

export function Info(props: any): ReactElement<any, any> {
  return (
    <div id="Info_container">
      <div id="colour-container">
        <div id="grid-headers">
          <div className="header">===</div>
          <div className="header">hex</div>
          <div className="header">rgb</div>
          <div className="header">name</div>
        </div>

        <div id="grid-values">
          <div className="value">
            <div id="colour" style={{ backgroundColor: props.colour.hex }}></div>
          </div>
          <div className="value">{props.colour.hex}</div>
          <div className="value">{props.colour.rgb}</div>
          <div className="value">{props.colour.name}</div>
        </div>
      </div>
    </div>
  );
}
