import { Home, UserPlus, Utensils, CreditCard, LogIn, LayoutDashboard, Mail } from "lucide-react";

const navItems = [
  {
    name: "Home",
    path: "/",
    color: "orchid",
    icon: {
      dev: <Home size={20} />, // Lucide-React Icon
      prod: "https://www.flaticon.com/free-icons/home"
    }
  },
  {
    name: "Account",
    path: "/Account",
    color: "deepskyblue",
    icon: {
      dev: <UserPlus size={20} />, // Lucide-React Icon
      prod: "https://www.flaticon.com/free-icons/add"
    }
  },
  {
    name: "Menu",
    path: "/Menu",
    color: "tomato",
    icon: {
      dev: <Utensils size={20} />, // Lucide-React Icon
      prod: "https://www.flaticon.com/free-icons/food-and-restaurant"
    }
  },
  {
    name: "Payment",
    path: "/Payment",
    color: "limegreen",
    icon: {
      dev: <CreditCard size={20} />, // Lucide-React Icon
      prod: "https://www.flaticon.com/free-icons/pay-card"
    }
  },
  {
    name: "Login",
    path: "/Login",
    color: "goldenrod",
    icon: {
      dev: <LogIn size={20} />, // Lucide-React Icon
      prod: "https://www.flaticon.com/free-icons/register"
    }
  },
  {
    name: "Dashboard",
    path: "/Dashboard",
    color: "goldenrod",
    icon: {
      dev: <LayoutDashboard size={20} />, // Lucide-React Icon
      prod: "https://www.flaticon.com/free-icons/dashboard"
    }
  },
  {
    name: "Contact",
    path: "/Contact",
    color: "slateblue",
    icon: {
      dev: <Mail size={20} />, // Lucide-React Icon
      prod: "https://www.flaticon.com/free-icons/contact"
    }
  }
];

export default navItems;
