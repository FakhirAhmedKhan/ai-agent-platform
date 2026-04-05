import { useState, useMemo, useEffect } from 'react'
import { BarChart3, Bot, Layers3, Activity, Settings, FileSliders, StickyNote, } from "lucide-react";

export const useSiderBar = () => {
    const navItems = useMemo(() => [
        { id: "dashboard", label: "Dashboard", path: "/app", icon: BarChart3 },
        { id: "agents", label: "Agents", path: "/app/agents", icon: Bot },
        { id: "tasks", label: "Tasks", path: "/app/tasks", icon: Layers3 },
        { id: "usage", label: "Usage", path: "/app/usage", icon: Activity },
        { id: "settings", label: "Settings", path: "/app/settings", icon: Settings },
        { id: "costing", label: "Estimator", path: "/app/costing", icon: FileSliders },
        { id: "notes", label: "Notes", path: "/app/notes", icon: StickyNote },

    ], []);

    const [isCollapsed, setIsCollapsed] = useState(false);
    
    // Determine initial page from URL
    const getInitialPage = () => {
        const path = window.location.pathname;
        const item = navItems.find(n => n.path === path);
        if (item) return item.id;
        if (path === '/app' || path === '/app/') return 'dashboard';
        const match = navItems.find(n => path.startsWith(n.path) && n.path !== '/app');
        return match ? match.id : 'dashboard';
    };

    const [activePage, setActivePage] = useState(getInitialPage);

    // Sync on popstate (back/forward browser buttons)
    useEffect(() => {
        const handleLocationChange = () => {
            setActivePage(getInitialPage());
        };
        window.addEventListener('popstate', handleLocationChange);
        return () => window.removeEventListener('popstate', handleLocationChange);
    }, [navItems]);


    return useMemo(() => ({
        sideBarData: {
            navItems,
            isCollapsed,
            setIsCollapsed,
            activePage,
            setActivePage,
        }
    }), [navItems, isCollapsed, activePage]);
}


