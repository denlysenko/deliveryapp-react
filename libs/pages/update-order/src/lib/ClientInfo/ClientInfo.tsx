import React from 'react';
import { InputText } from 'primereact/inputtext';

import { User } from '@deliveryapp/data-access';

interface ClientInfoProps {
  client: Partial<User> | null;
}

export const ClientInfo: React.FC<ClientInfoProps> = ({ client }) => (
  <>
    <h4>Client Info</h4>
    <div className="p-grid">
      <div className="p-col-12 p-lg-3 row">
        <div className="input-wrapper p-float-label">
          <InputText
            id="name"
            type="text"
            value={`${client ? client.firstName : ''} ${
              client ? client.lastName : ''
            }`}
            readOnly
          />
          <label htmlFor="name">First Name / Last Name</label>
        </div>
      </div>
      <div className="p-col-12 p-lg-3 row">
        <div className="input-wrapper p-float-label">
          <InputText
            id="company"
            type="text"
            defaultValue={client?.company || ''}
            readOnly
          />
          <label htmlFor="company">Company</label>
        </div>
      </div>
      <div className="p-col-12 p-lg-3 row">
        <div className="input-wrapper p-float-label">
          <InputText
            id="email"
            type="text"
            defaultValue={client?.email}
            readOnly
          />
          <label htmlFor="email">Email</label>
        </div>
      </div>
      <div className="p-col-12 p-lg-3 row">
        <div className="input-wrapper p-float-label">
          <InputText
            id="phone"
            type="text"
            defaultValue={client?.phone || ''}
            readOnly
          />
          <label htmlFor="phone">Phone</label>
        </div>
      </div>
    </div>
  </>
);
