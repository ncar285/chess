import React, { createContext, useContext, useState } from 'react';

const GameContext = createContext();

export const GameProvider = ({ children }) => {
    const [isActive, setIsActive] = useState(false);

    return (
        <GameContext.Provider value={{ isActive, setIsActive }}>
            {children}
        </GameContext.Provider>
    );
};

export const useGame = () => useContext(GameContext);