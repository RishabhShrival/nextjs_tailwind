'use client';
import { Contact, Link } from "lucide-react";
import { use, useEffect, useState } from "react";
import { SidebarTrigger } from "./ui/sidebar";
import { DrawerTrigger, Drawer } from "./ui/drawer";
import { ContactDrawer } from "./contact-drawer";




export function Navbar(){
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            
            // Show navbar when at top of page
            if (currentScrollY < 10) {
                setIsVisible(true);
            }
            // Hide when scrolling down, show when scrolling up
            else if (currentScrollY > lastScrollY) {
                setIsVisible(false); // Scrolling down
            } else {
                setIsVisible(true); // Scrolling up
            }
            
            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll);
        
        // Cleanup event listener
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [lastScrollY]);

    return(
        <div>
            <div className={`fixed z-10 bg-white w-screen transition-transform duration-300 ease-in-out ${
                isVisible ? 'translate-y-0' : '-translate-y-full'
            }`}>
                <nav className="flex justify-end-safe items-center pr-8 py-2">
                    <SidebarTrigger className="mx-6"/>
                    <a href='/#home' className="mx-6 hover:text-blue-600 transition-colors">home</a>
                    <a href='/#product' className="mx-6 hover:text-blue-600 transition-colors">products</a>
                    <a href='/#about' className="mx-6 hover:text-blue-600 transition-colors">about</a>
                    <ContactDrawer/>
                </nav>
            </div>
        </div>
    )
}