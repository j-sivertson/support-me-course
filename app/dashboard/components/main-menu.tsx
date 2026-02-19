import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import MenuItem from "./menu-item";
import MenuTitle from "./menu-title";
import { PersonStandingIcon } from "lucide-react";
import Link from "next/link";
import { LightDarkToggle } from "@/components/ui/light-dark-toggle";

export default function MainMenu() {
    return (
        <nav className="bg-muted overflow-auto p-4 flex flex-col">
            <header className="border-b dark:border-b-black border-b-zinc-800 pb-4">
                <MenuTitle />
            </header>
            <div className="py-4 grow">
                <MenuItem href="/dashboard">
                    My Dashboard
                </MenuItem>
                <MenuItem href="/dashboard/teams">
                    Teams
                </MenuItem>
                <MenuItem href="/dashboard/employees">
                    Employees
                </MenuItem>
                <MenuItem href="/dashboard/account">
                    Account
                </MenuItem>
                <MenuItem href="/dashboard/settings">
                    Settings
                </MenuItem>
            </div>
            <footer className="flex gap-2 items-center">
                <Avatar>
                    <AvatarFallback className="bg-pink-300 dark:bg-pink-800">
                        JS
                    </AvatarFallback>
                </Avatar>
                <Link href="/" className="hover:underline">Logout</Link>
                <LightDarkToggle className="ml-auto"/>
            </footer>
        </nav>
    )
}