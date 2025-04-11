import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {BrowserRouter, Route, Routes} from "react-router";
import Home from "./routes/home.tsx";
import Game from "./routes/game.tsx";
import WaitingRoom from "./routes/waiting-room.tsx";
import { cardsData, playersData } from "./data.ts";
import CreateGame from "./components/CreateGame.tsx";
import JoinGame from "./components/JoinGame.tsx";
import {EndScreen} from "./routes/end-screen.tsx";
import {Rules} from "./routes/rules.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Home />}>
                <Route path="create-game" element={<CreateGame />} />
                <Route path="join-game" element={<JoinGame />} />
          </Route>
          <Route path="/waiting-room/:game_code" element={<WaitingRoom />} />
          <Route path="/game/:game_code" element={<Game />}/>
          <Route path="/end" element={<EndScreen playersData={playersData}/>}/>
          <Route path="/rules" element={<Rules/>}/>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
