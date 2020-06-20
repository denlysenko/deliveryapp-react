import React, { useState } from 'react';

import { TabPanel, TabView } from 'primereact/tabview';

import { AddressForm } from './AddressForm/AddressForm';
import { BankDetailsForm } from './BankDetailsForm/BankDetailsForm';
import { StyledSettings } from './StyledSettings';

export const Settings = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <StyledSettings>
      <div className="p-grid">
        <div className="p-col-12">
          <div className="card no-margin-bottom">
            <h2>Company Settings</h2>
          </div>
        </div>
        <div className="p-col-12">
          <div className="card">
            <TabView
              activeIndex={activeIndex}
              onTabChange={(e) => setActiveIndex(e.index)}
            >
              <TabPanel header="Legal Address">
                <AddressForm />
              </TabPanel>
              <TabPanel header="Bank Details">
                <BankDetailsForm />
              </TabPanel>
            </TabView>
          </div>
        </div>
      </div>
    </StyledSettings>
  );
};
