import { ReactNode } from "react";

interface BaseLayoutProps {
  children: ReactNode; // Define children as a required prop
}

export default function BaseLayout({ children }: BaseLayoutProps) {
    return (
        <div className="w-full mx-auto font-sans text-[#2C3E50]">
            {children} 
        </div>
    );
}