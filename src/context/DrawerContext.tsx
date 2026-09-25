import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { getInitialRoleRoute, RoleScreenTarget } from '../utils/roleUtils';
import { useAuth } from './AuthContext';

interface DrawerContextType {
    isDrawerOpen: boolean;
    activeRoute: RoleScreenTarget;
    openDrawer: (currentRoute?: RoleScreenTarget) => void;
    closeDrawer: () => void;
    setActiveRoute: (route: RoleScreenTarget) => void;
}

const DrawerContext = createContext<DrawerContextType>({
    isDrawerOpen: false,
    activeRoute: 'MainTabs',
    openDrawer: () => {},
    closeDrawer: () => {},
    setActiveRoute: () => {},
});

export const DrawerProvider = ({ children }: { children: ReactNode }) => {
    const { userRoles } = useAuth();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [activeRoute, setActiveRoute] = useState<RoleScreenTarget>(() => getInitialRoleRoute(userRoles));

    useEffect(() => {
        setActiveRoute(getInitialRoleRoute(userRoles));
    }, [userRoles]);

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
