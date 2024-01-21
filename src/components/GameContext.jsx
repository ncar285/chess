import React, { createContext, useContext, useEffect, useState } from 'react';

const GameContext = createContext();

export const GameProvider = ({ children }) => {
    // const { setIsActive } = useGame();
    const [userColor, setUserColor] = useState(null);

    const [isActive, setIsActive] = useState(false);

    const [userTurn, setUserTurn] = useState(null);

    const [isDesktop, setIsDesktop] = useState(() => {
        const mobileDeviceRegex = /iPhone|iPad|iPod|Android/i;
        return !mobileDeviceRegex.test(navigator.userAgent);
    });
  

    return (
        <GameContext.Provider value={{ isActive, setIsActive, isDesktop, userColor, setUserColor, userTurn, setUserTurn }}>
            {children}
        </GameContext.Provider>
    );
};

export const useGame = () => useContext(GameContext);