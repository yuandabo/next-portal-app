import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { LandingHeader } from "@/components/LandingHeader";
// export const experimental_ppr = true;
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <LandingHeader />
      <SidebarProvider>
        <AppSidebar />
        <main>
          <SidebarTrigger />
          {children}
        </main>
      </SidebarProvider>
    </>
  );
}
