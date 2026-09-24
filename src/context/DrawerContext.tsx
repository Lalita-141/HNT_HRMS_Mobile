import React, { createContext, useContext, useState, ReactNode } from 'react';
import { RoleScreenTarget } from '../components/common/AppDrawerModal';

interface DrawerContextType {
    isDrawerOpen: boolean;
    activeRoute: RoleScreenTarget;
    openDrawer: (currentRoute?: RoleScreenTarget) => void;
    closeDrawer: () => void;
    setActiveRoute: (route: RoleScreenTarget) => void;
}

const DrawerContext = createContext<DrawerContextType>({
    isDrawerOpen: false,
    activeRoute: 'Admin',
    openDrawer: () => {},
    closeDrawer: () => {},
    setActiveRoute: () => {},
});

export const DrawerProvider = ({ children }: { children: ReactNode }) => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [activeRoute, setActiveRoute] = useState<RoleScreenTarget>('Admin');

    const openDrawer = (route?: RoleScreenTarget) => {
        if (route) {
            setActiveRoute(route);
        }
        setIsDrawerOpen(true);
    };

    const closeDrawer = () => {
        setIsDrawerOpen(false);
    };

    return (
        <DrawerContext.Provider
            value={{
                isDrawerOpen,
                activeRoute,
                openDrawer,
                closeDrawer,
                setActiveRoute,
            }}>
            {children}
        </DrawerContext.Provider>
    );
};

export const useDrawer = () => useContext(DrawerContext);
