import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Eye, Home, LayoutDashboard, Users, Plus, Info, Mail, User, LogOut } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useDoctor } from "@/contexts/DoctorContext";

export function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { doctor, logout } = useDoctor();

  const handleLogout = async () => {
    await logout();
  };

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { path: "/doctor/home", label: "Home", icon: Home },
    { path: "/doctor/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { path: "/doctor/patients", label: "Patients", icon: Users },
    { path: "/doctor/new-prediction", label: "New Prediction", icon: Plus },
    { path: "/doctor/model-info", label: "Model Info", icon: Info },
    { path: "/doctor/contact", label: "Contact", icon: Mail },
  ];

  const getInitials = () => {
    if (!doctor?.name) return "DR";
    return doctor.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-8">
          <Link to="/doctor/home" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <Eye className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-lg font-semibold text-foreground">Glaucoma XAI Portal</span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Button
                  key={link.path}
                  variant={isActive(link.path) ? "secondary" : "ghost"}
                  size="sm"
                  asChild
                  className="gap-2"
                >
                  <Link to={link.path}>
                    <Icon className="h-4 w-4" />
                    {link.label}
                  </Link>
                </Button>
              );
            })}
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="gap-2">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                  {getInitials()}
                </AvatarFallback>
              </Avatar>
              <span className="hidden sm:inline">{doctor?.name || "Doctor"}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium">{doctor?.name || "Doctor"}</p>
                <p className="text-xs text-muted-foreground">{doctor?.email || ""}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2">
              <User className="h-4 w-4" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="gap-2 text-destructive">
              <LogOut className="h-4 w-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}
