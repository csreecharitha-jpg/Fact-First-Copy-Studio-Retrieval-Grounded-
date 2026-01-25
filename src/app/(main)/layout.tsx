import { MainSidebar } from '@/components/main-sidebar';
import { PageHeader } from '@/components/page-header';
import { SidebarProvider } from '@/components/ui/sidebar';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="relative flex min-h-screen w-full">
        <MainSidebar />
        <div className="flex flex-1 flex-col md:ml-14 group-data-[state=expanded]:md:ml-64 transition-[margin-left] ease-in-out duration-300">
          <PageHeader />
          <main className="flex-1 bg-background p-4 md:p-6 lg:p-8">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
