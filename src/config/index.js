import React from 'react';
import Dashboard from '../components/Dashboard';
import AuctionManager from '../components/AuctionPanel/AuctionManager';

const routes = [
    {
        path: "/",
        exact: true,
        Component: Dashboard
    },
    {
        path: "/auctionmanager",
        exact: true,
        Component: AuctionManager
    }
  ];

  export default routes;