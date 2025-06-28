import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
  } from "@/components/ui/drawer"
  import { Button } from "@/components/ui/button";

  export function ContactDrawer() {
    return(
    <Drawer>       
        <DrawerTrigger className="mx-6 hover:text-blue-600 transition-colors">Contact</DrawerTrigger>
        <DrawerContent>
            <DrawerHeader>
            <DrawerTitle>Contact Us</DrawerTitle>
            </DrawerHeader>
            <DrawerFooter>
            <div className="flex flex-row justify-between space-y-2">
                <a href="mailto:royomber@gmail.com" className="text-blue-600 hover:underline">
                    royomber@gmail.com
                </a>
                <a href="tel:+1234567890" className="text-blue-600 hover:underline">
                    +1 234 567 890
                </a>
                <a href="www.instagram.com/royomber" className="text-blue-600 hover:underline">
                    www.instagram.com/royomber    
                </a>
            </div>
            </DrawerFooter>
        </DrawerContent>
    </Drawer>
  )

  }