import React, { useState } from 'react';

import { Sidebar } from 'primereact/sidebar';

import { StyledMain } from './StyledMain';
import { AppMenu } from './AppMenu/AppMenu';
import { TopBar } from './TopBar/TopBar';

export const Main = () => {
  const [showMessages, setShowMessages] = useState(false);

  return (
    <StyledMain>
      <div className="layout">
        <AppMenu />
        <TopBar showMessages={() => setShowMessages(true)} />
        <div className="content">routes goes here</div>
      </div>
      <Sidebar
        visible={showMessages}
        position="right"
        onHide={() => setShowMessages(false)}
      >
        Messages goes here
      </Sidebar>
    </StyledMain>
  );
};
