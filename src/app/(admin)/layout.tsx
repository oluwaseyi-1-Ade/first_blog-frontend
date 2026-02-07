import { AdminSidebar } from "@/components/layout/admin-sidebar";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen w-full">
            <AdminSidebar />
            <div className="flex flex-col flex-1 min-w-0">
                <main className="flex-1 p-4 md:p-6 lg:p-8 bg-muted/10">{children}</main>
            </div>
        </div>
    );
}
