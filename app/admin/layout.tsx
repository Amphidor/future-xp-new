"use client";

import { useState, useMemo, useEffect } from "react";
import AuthCheck from "../../middleware/authCheck";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Menu,
  X,
  Users,
  ClipboardList,
  Sparkles,
  Contact,
  ListTodo,
  Settings,
  Home,
  User,
  LogOut,
  Layers,
  ListChecks,
  BarChart3,
  FileQuestion,
  Lightbulb,
  CreditCard,
  ScrollText,
  TrendingUp,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { logout } from "../../store/slices/authSlice";


/* ---------- Navigation with children ---------- */
type NavChild = {
  name: string;
  href: string;
  icon?: any;
};
type NavItem = {
  name: string;
  href: string;
  icon: any;
  children?: NavChild[];
};

const navigation: NavItem[] = [
  { name: "Dashboard", href: "/admin/dashboard", icon: Home },
  { name: "Onboarding", href: "/admin/onboarding", icon: ClipboardList },
  { name: "Splashes", href: "/admin/splashes", icon: Sparkles },
  {
    name: "Manage Users",
     href: "#",
    icon: Users,
    children: [
      { name: "Users", href: "/admin/users", icon: Users },
      { name: "Admins", href: "/admin/subadmin", icon: Users },
    ],
  },

  { name: "Units", href: "/admin/units", icon: Layers },
  // { name: "Add Exercise Questions", href: "/admin/add-question", icon: FileQuestion },
  {
    name: "Quick German Tips",
    href: "/admin/quick-german-tips",
    icon: Lightbulb,
  },
  {
    name: "Level Tests",
    href: "#",
    icon: ListChecks,
    children: [
      { name: "Manage Test", href: "/admin/level-tests", icon: ListChecks },
      {
        name: "Manage Score",
        href: "/admin/level-tests/scores",
        icon: BarChart3,
      },
    ],
  },
  { name: "FAQs", href: "/admin/faq", icon: ListChecks },
  { name: "Contact Us", href: "/admin/manage-contact-us", icon: Contact },
  { name: "Signup Waitlist", href: "/admin/signup-waitlist", icon: ListTodo },
  { name: "Subscription Plan", href: "/admin/subscription-plan", icon: CreditCard },
  { name: "User Subscription", href: "/admin/user-subscription", icon: ScrollText },
  { name: "Trending Today", href: "/admin/trending-today", icon: TrendingUp },
  {
    name: "Manage",
    href: "#",
    icon: ListChecks,
    children: [
      {
        name: "Manage Level",
        href: "/admin/manage/manage-score",
        icon: BarChart3,
      },
      {
        name: "Privacy Policy",
        href: "/admin/privacy-policy",
        icon: FileQuestion,
      },
      {
        name: "Terms & Conditions",
        href: "/admin/terms-conditions",
        icon: FileQuestion,
      },

    ],
  },
  { name: "Settings", href: "/admin/profile", icon: Settings },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const [sidebarMobileOpen, setSidebarMobileOpen] = useState(false);
  const [submenu, setSubmenu] = useState<number | null>(null);
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);

  // Helpers for strict path equality (ignore one trailing slash)
  const normalize = (p: string) =>
    p.endsWith("/") && p !== "/" ? p.slice(0, -1) : p;
  const equalPath = (a: string, b: string) => normalize(a) === normalize(b);

  const handleLogout = () => {
    dispatch(logout());
    router.push("/login");
  };

  // Prefix match (used only for "is parent active?" logic)
  const matchPath = (path: string, href: string) =>
    path === href || path.startsWith(href.endsWith("/") ? href : href + "/");

  // Compute the best-matching child href per item (memoized by pathname)
  // IMPORTANT: Key by the item OBJECT to avoid collisions when href === '#'
  const bestChildByItem = useMemo(() => {
    const out = new Map<NavItem, string | null>();
    for (const item of navigation) {
      if (!item.children?.length) {
        out.set(item, null);
        continue;
      }
      const best =
        item.children
          .filter((ch) => matchPath(pathname, ch.href))
          .sort((a, b) => b.href.length - a.href.length)[0]?.href ?? null;
      out.set(item, best);
    }
    return out;
  }, [pathname]);

  const isItemActive = (item: NavItem) => {
    if (equalPath(pathname, item.href)) return true; // exact match for leaf route that equals href
    const best = bestChildByItem.get(item);
    return !!best; // parent active if any child is best match
  };

  // Keep the submenu open for whichever parent contains the active child
  useEffect(() => {
    const idx = navigation.findIndex((item) => !!bestChildByItem.get(item));
    setSubmenu(idx >= 0 ? idx : null);
  }, [pathname, bestChildByItem]);

  return (
    <AuthCheck>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex">
        {/* Sidebar — Desktop */}
        <aside
          className={`
            hidden lg:flex fixed top-0 left-0 h-full z-40
            transition-all duration-300
            ${sidebarExpanded ? "w-64" : "w-20"}
            bg-white shadow-2xl border-r border-gray-200
            flex-col
          `}
        >
          <div className="flex items-center justify-between h-16 px-4 border-b">
            <div className="flex items-center space-x-2">
              <img
                src={`${sidebarExpanded ? `/germanfy_logo.png` : `/germanfy_icon.png`
                  }`}
                alt="Germanfy Logo"
                className="transition-opacity duration-300 !mx-[0px]"
              />
            </div>
          </div>

          <nav className="flex-2 mt-2 pt-2 space-y-2 px-2 pb-16">
            <ul className="space-y-2 h-[calc(100vh-150px)] overflow-y-auto">
              {navigation.map((item, idx) => {
                const Icon = item.icon;
                const hasChildren = !!item.children?.length;

                // Active state per item
                const activeForLeaf =
                  !hasChildren && equalPath(pathname, item.href);
                const activeForParent = hasChildren && isItemActive(item);
                const itemActive = activeForLeaf || activeForParent;

                // Shared styling for item row
                const baseItemCls =
                  "group flex items-center gap-3 w-full px-3 py-2 rounded-lg transition font-medium";
                const activeCls = "bg-primary text-white";
                const inactiveCls = "text-black hover:bg-primary hover:text-white";

                if (!hasChildren) {
                  return (
                    <li key={item.name} className="mb-1">
                      <Link
                        href={item.href}
                        className={[baseItemCls, itemActive ? activeCls : inactiveCls].join(" ")}
                      >
                        <Icon
                          className={[
                            "h-5 w-5 min-w-[20px] transition-colors",
                            itemActive ? "text-white" : "text-gray-400 group-hover:text-white",
                          ].join(" ")}
                        />
                        <span className={sidebarExpanded ? "block" : "hidden"}>{item.name}</span>
                      </Link>
                    </li>
                  );
                }


                // Parent with children: toggle submenu on click, keep open if child matches
                const open = submenu === idx || activeForParent;

                return (
                  <li key={item.name} className="mb-1">
                    <button
                      type="button"
                      className={[
                        baseItemCls,
                        itemActive ? activeCls : inactiveCls,
                        "w-full text-left",
                      ].join(" ")}
                      onClick={() =>
                        setSubmenu((s) => (s === idx ? null : idx))
                      }
                      aria-expanded={open}
                    >
                      <Icon
                        className={`h-5 w-5 min-w-[20px] group-hover:text-white ${itemActive ? "text-white" : "text-primary"
                          }`}
                      />
                      <span className={sidebarExpanded ? "block" : "hidden"}>
                        {item.name}
                      </span>
                      {sidebarExpanded && (
                        <span
                          className={`ml-auto text-xs ${itemActive
                            ? "text-white"
                            : "text-primary group-hover:text-white"
                            }`}
                        >
                          {open ? "▲" : "▼"}
                        </span>
                      )}
                    </button>

                    {/* Submenu (collapsible, sticky open when a child matches) */}
                    <div
                      className={[
                        "overflow-hidden transition-[max-height] duration-300",
                        open ? "max-h-96" : "max-h-0",
                        sidebarExpanded ? "pl-8" : "pl-0",
                      ].join(" ")}
                    >
                      <ul className="py-1">
                        {item.children!.map((subitem) => {
                          const ChildIcon = subitem.icon || Icon;
                          // strict equality for children — avoids both being active
                          const chActive = equalPath(pathname, subitem.href);

                          return (
                            <li key={subitem.name} className="my-0.5">
                              <Link
                                href={subitem.href}
                                className={[
                                  "flex items-center gap-2 rounded-md px-3 py-2 text-sm transition",
                                  chActive
                                    ? "bg-primary text-white"
                                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
                                ].join(" ")}
                              >
                                <ChildIcon className="h-4 w-4 min-w-[16px]" />
                                <span
                                  className={
                                    sidebarExpanded ? "block" : "hidden"
                                  }
                                >
                                  {subitem.name}
                                </span>
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex-1" />
        </aside>

        {/* Mobile overlay */}
        <div
          className={`
            fixed inset-0 z-50 bg-black bg-opacity-60 transition-opacity lg:hidden
            ${sidebarMobileOpen ? "block" : "pointer-events-none opacity-0"}
          `}
          onClick={() => setSidebarMobileOpen(false)}
          style={{ transition: "opacity 0.3s" }}
        />

        {/* Sidebar — Mobile */}
        <aside
          className={`
            fixed top-0 left-0 z-50
    h-[100dvh] w-64
    bg-white shadow-xl border-r
    flex flex-col
    overflow-y-auto
    overscroll-contain
    touch-pan-y
    transition-transform
    lg:hidden
            ${sidebarMobileOpen ? "translate-x-0" : "-translate-x-full"}
          `}
        >
          <div className="flex items-center justify-between h-16 px-4 border-b">
            <span className="font-extrabold text-xl text-primary-700">
              German Admin
            </span>
            <button
              onClick={() => setSidebarMobileOpen(false)}
              aria-label="Close sidebar"
              className="p-2 rounded-lg hover:bg-gray-100 transition"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <nav className="mt-8 space-y-2 px-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              const hasChildren = !!item.children?.length;
              const parentActive = hasChildren && !!bestChildByItem.get(item);
              const leafActive = !hasChildren && equalPath(pathname, item.href);
              const active = parentActive || leafActive;

              return (
                <div key={item.name} className="space-y-1">
                  <Link
                    href={item.href}
                    className={`
                      flex items-center gap-3 p-3 my-1.5 rounded-xl
                      transition-all font-medium
                      ${active
                        ? "bg-indigo-50 text-indigo-700"
                        : "text-gray-700 hover:bg-gray-100"
                      }
                    `}
                    onClick={() => setSidebarMobileOpen(false)}
                  >
                    <Icon className="h-5 w-5 min-w-[24px]" />
                    <span>{item.name}</span>
                  </Link>

                  {/* Mobile: show children flat below parent */}
                  {item.children?.map((child) => {
                    const ChildIcon = child.icon || Icon;
                    const chActive = equalPath(pathname, child.href); // strict equality for children

                    return (
                      <Link
                        key={child.name}
                        href={child.href}
                        className={[
                          "ml-10 block text-sm rounded px-2 py-1",
                          chActive
                            ? "text-indigo-700 bg-indigo-50"
                            : "text-gray-600 hover:text-gray-900",
                        ].join(" ")}
                        onClick={() => setSidebarMobileOpen(false)}
                      >
                        <span className="inline-flex items-center gap-2">
                          <ChildIcon className="h-4 w-4" />
                          {child.name}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              );
            })}
          </nav>
        </aside>

        {/* Main content */}
        <div
          className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ${sidebarExpanded ? "lg:ml-64" : "lg:ml-20"
            }`}
        >
          {/* Top bar */}
          <header className="sticky top-0 z-30 touch-manipulation flex items-center gap-4 bg-white border-b px-2 py-3 shadow-sm transition-all">
            <div className="flex items-center flex-1">
              <button
                type="button"
                aria-label="Toggle sidebar"
                className="block lg:hidden p-2 mr-2 rounded-lg hover:bg-gray-100 transition"
                onClick={() => setSidebarMobileOpen(true)}
              >
                <Menu className="h-6 w-6" />
              </button>
              <button
                type="button"
                aria-label={
                  sidebarExpanded ? "Collapse sidebar" : "Expand sidebar"
                }
                className="hidden lg:block p-2 mr-2 rounded-lg hover:bg-gray-100 transition"
                onClick={() => setSidebarExpanded((v) => !v)}
              >
                <Menu className="h-6 w-6" />
              </button>
              <h1 className="text-lg font-bold text-gray-900">Admin Panel</h1>
            </div>

            {/* User menu */}
            <div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition">
                    {user?.profilePicture ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={`/uploads/${user?.profilePicture}`}
                        alt="Profile"
                        className="h-6 w-6 rounded-full object-cover"
                      />
                    ) : (
                      <div className="h-6 w-6 rounded-full bg-gray-200 flex items-center justify-center">
                        <User className="h-4 w-4 text-gray-400" />
                      </div>
                    )}
                    <span className="hidden md:block font-medium text-gray-700">
                      {user?.firstname}
                    </span>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link
                      href="/admin/profile"
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <User size={16} /> Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="flex items-center gap-2 text-red-600 cursor-pointer"
                  >
                    <LogOut size={16} /> Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>

          <main className="flex-1 px-4 md:px-4 py-4">{children}</main>
        </div>
      </div>
    </AuthCheck>
  );
}
