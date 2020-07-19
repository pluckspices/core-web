import Dashboard from '../components/Dashboard';
import AuctionManager from '../components/AuctionPanel/AuctionManager';
import Pooling from '../components/AuctionPanel/Pooling';
import Planter from '../components/UserManagement/Planter';
import Dealer from '../components/UserManagement/Dealer';
import Bidder from '../components/UserManagement/Bidder';
import Trader from '../components/UserManagement/Trader';

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
    },
    {
        path: "/auctionpooling",
        exact: true,
        Component: Pooling
    },
    {
        path: "/users/planter",
        exact: true,
        Component: Planter
    },
    {
        path: "/users/dealer",
        exact: true,
        Component: Dealer
    },
    {
        path: "/users/bidder",
        exact: true,
        Component: Bidder
    },
    {
        path: "/users/trader",
        exact: true,
        Component: Trader
    }

  ];

  export default routes;