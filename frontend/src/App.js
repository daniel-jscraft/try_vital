"use client";
import React from 'react';
import './App.css';
import { useEffect, useState } from 'react';
import AppContext, {AppContextProvider} from './etc/Context';
import {Routes , Route } from "react-router-dom" 
import HomePage from './pages/HomePage';
import EditPanelPage from './pages/EditPanelPage';
import AppService from './etc/AppService';
import TemplatesPage from './pages/TemplatesPage';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { ErrorBoundary } from "react-error-boundary";

const StyledPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  maxWidth: 1000,
  color: theme.palette.text.primary,
}));

function App() {
  const {setMarkers} = AppContext

  return (
    <ErrorBoundary fallback={<div>⛔️ Something went wrong with our API</div>}>
      <AppContextProvider>
        <StyledPaper
          sx={{
            my: 1,
            mx: 'auto',
            p: 2,
          }}
        >
          <Routes> 
            <Route index path="/" element={<HomePage /> } /> 
            <Route path="/panel/:id" element={<EditPanelPage /> } />
            <Route path="/templates" element={<TemplatesPage /> } /> 
          </Routes> 
        </StyledPaper>
    </AppContextProvider>
    </ErrorBoundary>
  );
}

export default App;