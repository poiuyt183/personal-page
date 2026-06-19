"use client";
import Navigation from "./Navigation";
import "@/app/globals.css";
import "@/app/styles/animation/fadeout.css";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="relative flex min-h-screen w-full justify-center bg-black lg:px-8">
      <div className="fixed left-0 top-0 z-[500] hidden h-8 w-full bg-black lg:block" />
      <div className="fixed bottom-0 left-0 z-[500] hidden h-8 w-full bg-black lg:block" />

      <div className="relative flex w-full max-w-screen-xl">
        <main className="relative min-h-screen flex-1 bg-gradient-to-tr from-[#18181b] to-[#222225]">
          <div className="flex min-h-screen flex-col items-center pb-16 md:pb-0">
            {children}
          </div>
        </main>
        <Navigation />
      </div>
    </div>
  );
};

export default MainLayout;
