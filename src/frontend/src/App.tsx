import { Toaster } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { ThemeProvider } from "next-themes";
import Layout from "./components/Layout";
import { ActiveProfileProvider } from "./hooks/useActiveProfile";
import AnalyticsPage from "./pages/AnalyticsPage";
import BrandAssistantPage from "./pages/BrandAssistantPage";
import ContentDetailPage from "./pages/ContentDetailPage";
import ContentLibraryPage from "./pages/ContentLibraryPage";
import { ProfilePage } from "./pages/ProfilePage";
import { WritingAssistantPage } from "./pages/WritingAssistantPage";

const queryClient = new QueryClient();

const rootRoute = createRootRoute({
  component: Layout,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: ProfilePage,
});

const profileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/profile",
  component: ProfilePage,
});

const contentRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/content",
  component: ContentLibraryPage,
});

const contentDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/content/$id",
  component: ContentDetailPage,
});

const writingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/writing",
  component: WritingAssistantPage,
});

const analyticsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/analytics",
  component: AnalyticsPage,
});

const brandRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/brand",
  component: BrandAssistantPage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  profileRoute,
  contentRoute,
  contentDetailRoute,
  writingRoute,
  analyticsRoute,
  brandRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="light" forcedTheme="light">
        <ActiveProfileProvider>
          <RouterProvider router={router} />
          <Toaster />
        </ActiveProfileProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
