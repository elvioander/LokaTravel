export { auth as middleware } from "@/auth";

// You don't want user to be logged out whiel they're using you applications
// Everytime this middleware is called, this will keep on extending the session expiry date
// Right now it will be called for each request
// We want to execute this middleware only for specific request

// This matcher array basically accepts a list of urls for which you middleware will be executed
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
// Basically means, execute all the middleware for all of the request, except api request, static file request, and images.
