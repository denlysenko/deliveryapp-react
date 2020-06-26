import React, { Component } from 'react';

import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { TabPanel, TabView } from 'primereact/tabview';
import { ProgressBar } from 'primereact/progressbar';

import { isNil } from 'lodash-es';

import { roleNames } from '@deliveryapp/common';
import { User, usersClient } from '@deliveryapp/data-access';

import { StyledUserView } from './StyledUserView';

interface UserViewState {
  visible: boolean;
  loading: boolean;
  activeIndex: number;
  user: User | null;
}

// eslint-disable-next-line @typescript-eslint/ban-types
export class UserView extends Component<{}, UserViewState> {
  readonly state: Readonly<UserViewState> = {
    visible: false,
    loading: false,
    activeIndex: 0,
    user: null
  };

  open = async (userId: number) => {
    this.setState({
      visible: true,
      loading: true
    });

    try {
      const { data } = await usersClient.getUser(userId);

      this.setState({
        loading: false,
        user: data
      });
    } catch {
      this.close();
    }
  };

  close = () => {
    this.setState({
      visible: false,
      loading: false,
      activeIndex: 0,
      user: null
    });
  };

  render() {
    const { visible, loading, activeIndex, user } = this.state;

    return (
      <StyledUserView>
        <Dialog
          header="User Info"
          visible={visible}
          closable={!loading}
          onHide={this.close}
          className="user-view"
        >
          {loading && (
            <div className="loader">
              <ProgressBar mode="indeterminate" />
            </div>
          )}
          <TabView
            activeIndex={activeIndex}
            onTabChange={(e) => this.setState({ activeIndex: e.index })}
          >
            <TabPanel header="Main Info">
              <div className="p-grid">
                <div className="p-col-12 row">
                  <div className="input-wrapper p-float-label">
                    <InputText readOnly defaultValue={user?.id} />
                    <label>ID</label>
                  </div>
                </div>
                <div className="p-col-12 row">
                  <div className="input-wrapper p-float-label">
                    <InputText readOnly defaultValue={user?.email} />
                    <label>Email</label>
                  </div>
                </div>
                <div className="p-col-12 row">
                  <div className="input-wrapper p-float-label">
                    <InputText
                      readOnly
                      defaultValue={user?.phone || undefined}
                    />
                    <label>Phone</label>
                  </div>
                </div>
                <div className="p-col-12 row">
                  <div className="input-wrapper p-float-label">
                    <InputText
                      readOnly
                      defaultValue={user?.firstName || undefined}
                    />
                    <label>First Name</label>
                  </div>
                </div>
                <div className="p-col-12 row">
                  <div className="input-wrapper p-float-label">
                    <InputText
                      readOnly
                      defaultValue={user?.lastName || undefined}
                    />
                    <label>Last Name</label>
                  </div>
                </div>
                <div className="p-col-12 row">
                  <div className="input-wrapper p-float-label">
                    <InputText
                      readOnly
                      defaultValue={
                        !isNil(user) ? roleNames[user.role] : undefined
                      }
                    />
                    <label>Role</label>
                  </div>
                </div>
              </div>
            </TabPanel>
            <TabPanel header="Legal Address">
              <div className="p-grid">
                <div className="p-col-12 row">
                  <div className="input-wrapper p-float-label">
                    <InputText
                      readOnly
                      defaultValue={
                        !isNil(user) ? user.address?.country : undefined
                      }
                    />
                    <label>Country</label>
                  </div>
                </div>
                <div className="p-col-12 row">
                  <div className="input-wrapper p-float-label">
                    <InputText
                      readOnly
                      defaultValue={
                        !isNil(user) ? user.address?.city : undefined
                      }
                    />
                    <label>City</label>
                  </div>
                </div>
                <div className="p-col-12 row">
                  <div className="input-wrapper p-float-label">
                    <InputText
                      readOnly
                      defaultValue={
                        !isNil(user) ? user.address?.street : undefined
                      }
                    />
                    <label>Street</label>
                  </div>
                </div>
                <div className="p-col-12 row">
                  <div className="input-wrapper p-float-label">
                    <InputText
                      readOnly
                      defaultValue={
                        !isNil(user) ? user.address?.house : undefined
                      }
                    />
                    <label>House</label>
                  </div>
                </div>
              </div>
            </TabPanel>
            <TabPanel header="Bank Details">
              <div className="p-grid">
                <div className="p-col-12 row">
                  <div className="input-wrapper p-float-label">
                    <InputText
                      readOnly
                      defaultValue={
                        !isNil(user) ? user.bankDetails?.name : undefined
                      }
                    />
                    <label>Name</label>
                  </div>
                </div>
                <div className="p-col-12 row">
                  <div className="input-wrapper p-float-label">
                    <InputText
                      readOnly
                      defaultValue={
                        !isNil(user)
                          ? user.bankDetails?.accountNumber
                          : undefined
                      }
                    />
                    <label>Account Number</label>
                  </div>
                </div>
                <div className="p-col-12 row">
                  <div className="input-wrapper p-float-label">
                    <InputText
                      readOnly
                      defaultValue={
                        !isNil(user) ? user.bankDetails?.bin : undefined
                      }
                    />
                    <label>BIN</label>
                  </div>
                </div>
                <div className="p-col-12 row">
                  <div className="input-wrapper p-float-label">
                    <InputText
                      readOnly
                      defaultValue={
                        !isNil(user) ? user.bankDetails?.swift : undefined
                      }
                    />
                    <label>SWIFT</label>
                  </div>
                </div>
              </div>
            </TabPanel>
          </TabView>
        </Dialog>
      </StyledUserView>
    );
  }
}
