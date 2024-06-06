import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import Game from './games components/Game.jsx';
import Home from './home components/Home.jsx';
import Shop from './shop components/Shop.jsx';
import Casino from './casino components/Casino.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import TestGame from './games/AnotherGame/TestGame.jsx';

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
                element: <Game />
            },
            {
                path: 'casino',
                element: <Casino />
            },
            {
                path: 'shop',
                element: <Shop />
            },
            {
                path: 'testgame',
                element: <TestGame />
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
