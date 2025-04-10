import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {BrowserRouter, Route, Routes} from "react-router";
import Home from "./routes/home.tsx";
import Game from "./routes/game.tsx";
import WaitingRoom from "./routes/waiting-room.tsx";
import data from "./data.ts";
import CreateGame from "./components/CreateGame.tsx";
import JoinGame from "./components/JoinGame.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Home />}>
                <Route path="create-game" element={<CreateGame />} />
                <Route path="join-game" element={<JoinGame />} />
          </Route>
          <Route path="/waiting-room" element={<WaitingRoom />} />
          <Route path="/game/:game_id" element={<Game data={data} />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
