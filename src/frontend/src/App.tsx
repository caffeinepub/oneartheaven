import { AnnouncementsBar } from "@/components/AnnouncementsBar";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { Toaster } from "@/components/ui/sonner";
import { LanguageProvider } from "@/context/LanguageContext";
import { AboutPage } from "@/pages/About";
import { AssemblyPage } from "@/pages/Assembly";
import { CharterPage } from "@/pages/Charter";
import { CouncilDetailPage } from "@/pages/CouncilDetail";
import { CouncilsPage } from "@/pages/Councils";
import { Home } from "@/pages/Home";
import { MembersPage } from "@/pages/Members";
import {
  AcademyPage,
  CommunityPage,
  FinancePage,
  GovernancePage,
  SolutionsPage,
} from "@/pages/stubs";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";

// ─── Layout Component ────────────────────────────────────────────────────────
function Layout() {
  return (
    <LanguageProvider>
      <div className="min-h-screen flex flex-col dark">
        {/* Navbar */}
        <Navbar />
        {/* Push content below fixed navbar */}
        <div className="pt-16 flex-1 flex flex-col">
          <AnnouncementsBar />
          <div className="flex-1">
            <Outlet />
          </div>
        </div>
        <Footer />
        <Toaster richColors position="top-right" />
      </div>
    </LanguageProvider>
  );
}

// ─── Routes ──────────────────────────────────────────────────────────────────
const rootRoute = createRootRoute({
  component: Layout,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Home,
});

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/about",
  component: AboutPage,
});

const membersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/members",
  component: MembersPage,
});

const governanceRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/governance",
  component: GovernancePage,
});

const solutionsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/solutions",
  component: SolutionsPage,
});

const communityRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/community",
  component: CommunityPage,
});

const academyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/academy",
  component: AcademyPage,
});

const financeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/finance",
  component: FinancePage,
});

const charterRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/charter",
  component: CharterPage,
});

const assemblyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/assembly",
  component: AssemblyPage,
});

const councilsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/councils",
  component: CouncilsPage,
});

const councilDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/councils/$councilId",
  component: CouncilDetailPage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  aboutRoute,
  membersRoute,
  governanceRoute,
  solutionsRoute,
  communityRoute,
  academyRoute,
  financeRoute,
  charterRoute,
  assemblyRoute,
  councilsRoute,
  councilDetailRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
