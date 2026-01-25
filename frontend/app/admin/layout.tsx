import "@/app/globals.css";
import AdminLayoutClient from "./AdminLayoutClient";

export const metadata = {
  title: "Admin Panel - Best AI Resume",
  description: "Admin dashboard for Best AI Resume",
};

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AdminLayoutClient>{children}</AdminLayoutClient>
      </body>
    </html>
  );
}
