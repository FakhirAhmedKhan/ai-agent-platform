import React from "react";
import AppLayout from "../../../module/navigation/components/AppLayout";
import {
  DashboardPage,
  AgentsPage,
  TasksPage,
  UsagePage,
  SettingsPage,
  CostingPage,
  NotesPage,
  LandingPage,
} from "../../../module";

import RenderPage from "../../../utils/RenderPage";
import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../../../module/Auth/pages/LoginPage";
import RegisterPage from "../../../module/Auth/pages/RegisterPage";
import ProtectedRoute from "../../../module/Auth/components/ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <React.Suspense fallback={<div className="min-h-screen bg-white" />}>
        <LandingPage />
      </React.Suspense>
    ),
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/app",
        element:  <AppLayout />,
        children: [
          {
            element: <RenderPage />,
            children: [
              {
                index: true,
                element: <DashboardPage />,
              },
              {
                path: "dashboard",
                element: <DashboardPage />,
              },
              {
                path: "agents",
                element: <AgentsPage />,
              },
              {
                path: "tasks",
                element: <TasksPage />,
              },
              {
                path: "usage",
                element: <UsagePage />,
              },
              {
                path: "settings",
                element: <SettingsPage />,
              },
              {
                path: "costing",
                element: <CostingPage />,
              },
              {
                path: "notes",
                element: <NotesPage />,
              },
            ],
          },
        ],
      },
    ],
  },
]);
