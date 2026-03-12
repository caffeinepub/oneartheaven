import { AnnouncementsBar } from "@/components/AnnouncementsBar";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { Toaster } from "@/components/ui/sonner";
import { LanguageProvider } from "@/context/LanguageContext";
import { AboutPage } from "@/pages/About";
import { AssemblyPage } from "@/pages/Assembly";
import { CharterPage } from "@/pages/Charter";
import { CommunityPage } from "@/pages/Community";
import { CouncilDetailPage } from "@/pages/CouncilDetail";
import { CouncilsPage } from "@/pages/Councils";
import { DelegateDetailPage } from "@/pages/DelegateDetail";
import { DelegatesPage } from "@/pages/Delegates";
import { FinancePage } from "@/pages/Finance";
import { Home } from "@/pages/Home";
import { IntegrationsPage } from "@/pages/Integrations";
import { MembersPage } from "@/pages/Members";
import { PolicyAdvisorPage } from "@/pages/PolicyAdvisor";
import { PortalDetailPage } from "@/pages/PortalDetail";
import { PortalsPage } from "@/pages/Portals";
import { ResolutionsPage } from "@/pages/ResolutionsPage";
import { SolutionsPage } from "@/pages/Solutions";
import { TransparencyPage } from "@/pages/TransparencyPage";
import { AcademyPage, GovernancePage } from "@/pages/stubs";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";

// ─── Layout Component ──────────────────────────────────────────────────────────────
function Layout() {
  return (
    <LanguageProvider>
      <div className="min-h-screen flex flex-col dark">
        <Navbar />
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

// ─── Routes ────────────────────────────────────────────────────────────────────
const rootRoute = createRootRoute({ component: Layout });

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
const resolutionsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/resolutions",
  component: ResolutionsPage,
});
const policyAdvisorRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/policy-advisor",
  component: PolicyAdvisorPage,
});
const delegatesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/delegates",
  component: DelegatesPage,
});
const delegateDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/delegates/$delegateId",
  component: DelegateDetailPage,
});
const portalsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/portals",
  component: PortalsPage,
});
const portalDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/portals/$councilId",
  component: PortalDetailPage,
});
const transparencyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/transparency",
  component: TransparencyPage,
});
const integrationsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/integrations",
  component: IntegrationsPage,
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
  resolutionsRoute,
  policyAdvisorRoute,
  delegatesRoute,
  delegateDetailRoute,
  portalsRoute,
  portalDetailRoute,
  transparencyRoute,
  integrationsRoute,
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
