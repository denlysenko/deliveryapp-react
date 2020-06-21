import React, { useEffect, useState } from 'react';

import { TabPanel, TabView } from 'primereact/tabview';

import { settingsClient, Address, BankDetails } from '@deliveryapp/data-access';

import { AddressForm } from './AddressForm/AddressForm';
import { BankDetailsForm } from './BankDetailsForm/BankDetailsForm';
import { StyledSettings } from './StyledSettings';

export const Settings = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [address, setAddress] = useState<Address>();
  const [bankDetails, setBankDetails] = useState<BankDetails>();

  useEffect(() => {
    Promise.all([
      settingsClient.getAddress(),
      settingsClient.getBankDetails()
    ]).then(([address, bankDetails]) => {
      setAddress(address.data);
      setBankDetails(bankDetails.data);
    });
  }, []);

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
                <AddressForm address={address} />
              </TabPanel>
              <TabPanel header="Bank Details">
                <BankDetailsForm bankDetails={bankDetails} />
              </TabPanel>
            </TabView>
          </div>
        </div>
      </div>
    </StyledSettings>
  );
};
