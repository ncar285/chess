import React, { createContext, useContext, useEffect, useState } from 'react';

const GameContext = createContext();

export const GameProvider = ({ children }) => {
    const [isActive, setIsActive] = useState(false);
    const [isDesktop, setIsDesktop] = useState(() => {
        const mobileDeviceRegex = /iPhone|iPad|iPod|Android/i;
        return !mobileDeviceRegex.test(navigator.userAgent);
    });
  

    return (
        <GameContext.Provider value={{ isActive, setIsActive, isDesktop }}>
            {children}
        </GameContext.Provider>
    );
};

export const useGame = () => useContext(GameContext);