import React, { useState } from 'react';

import { Steps } from 'primereact/steps';
import { MenuItem } from 'primereact/api';

import { StyledCreateOrder } from './StyledCreateOrder';
import { DestinationForm } from './DestinationForm/DestinationForm';
import { CargoForm } from './CargoForm/CargoForm';

const items: MenuItem[] = [
  { label: 'Destination' },
  { label: 'Cargo' },
  { label: 'Sender' }
];

export const CreateOrder = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleSelect = (event: {
    originalEvent: Event;
    item: MenuItem;
    index: number;
  }) => {
    setActiveIndex(event.index);
  };

  return (
    <StyledCreateOrder>
      <div className="p-grid">
        <div className="p-col-12">
          <div className="card">
            <Steps
              model={items}
              activeIndex={activeIndex}
              onSelect={handleSelect}
              readOnly={false}
            />
            <div className="ui-widget-content">
              {activeIndex === 0 && <DestinationForm />}
              {activeIndex === 1 && <CargoForm />}
              {activeIndex === 2 && <div>Sender form goes here</div>}
            </div>
          </div>
        </div>
      </div>
    </StyledCreateOrder>
  );
};
