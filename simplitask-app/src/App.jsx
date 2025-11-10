import { useState } from "react";
import { Box } from "@mui/material";
import TopBar from "./components/TopBar";
import HeaderApp from "./components/Header";
import TaskList from "./components/TaskList";
import './App.css';

function App() {
  return (
    <Box className="app-container">
      <Box className="section-wrapper">
        <TopBar />
      </Box>
      <Box className="content-wrapper">
        <HeaderApp />
        <TaskList />
      </Box>
    </Box>
  );
}

export default App;