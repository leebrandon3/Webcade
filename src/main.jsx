import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import Game from './games components/Game.jsx';
import Home from './home components/Home.jsx';
import Shop from './shop components/Shop.jsx';
import Casino from './casino components/Casino.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import TestGame from './games/AnotherGame/TestGame.jsx';
import FlappyBird from './games/FlappyBird/FlappyBird.jsx'
import Blackjack from './casino games/Blackjack.jsx';
import Inventory from './inventory components/Inventory.jsx';
import CasinoNav from './casino components/CasinoNav.jsx';

const routes = [
    {
        path: '/',
        element: <App />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: 'game',
                element: <Game />,
                children: [
                    {
                        index: true,
                        element: <Home />
                    },
                    {
                        path: 'testgame',
                        element: <TestGame />
                    },
                    {
                        path: 'flappybird',
                        element: <FlappyBird />
                    }
                ]
            },
            {
                path: 'casino',
                element: <Casino />,
                children: [
                    {
                        index: true,
                        element: <CasinoNav />
                    },
                    {
                        path: 'blackjack',
                        element: <Blackjack />
                    }
                ]
            },
            {
                path: 'shop',
                element: <Shop />
            },
            {
                path: 'inventory',
                element: <Inventory />
            }
        ]
    }
]

const router = createBrowserRouter(routes)

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>,
)
