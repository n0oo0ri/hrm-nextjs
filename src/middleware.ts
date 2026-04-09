import { withAuth } from "next-auth/middleware";
import { routeAccessMap } from "./lib/settings";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const path = req.nextUrl.pathname;
    const token = req.nextauth.token;

    // Public routes
    if (path === "/" || path.startsWith("/sign-in")) {
      return NextResponse.next();
    }

    // Redirect /continue to the user's role-based route
    if (path === "/continue") {
      const role = token?.role as string;
      if (role) {
        return NextResponse.redirect(new URL(`/${role}`, req.url));
      }
      return NextResponse.redirect(new URL("/admin", req.url));
    }

    // Check route access based on user role
    const userRole = token?.role as string;
    
    for (const [route, allowedRoles] of Object.entries(routeAccessMap)) {
      const routeRegex = new RegExp("^" + route.replace(/\(.*\)/g, "").replace(/\*/g, ".*") + "$");
      
      if (routeRegex.test(path)) {
        if (!userRole || !allowedRoles.includes(userRole)) {
          return NextResponse.redirect(new URL(userRole ? `/${userRole}` : "/sign-in", req.url));
        }
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: "/sign-in",
    },
  }
);

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};