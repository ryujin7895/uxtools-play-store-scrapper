import { createRequestHandler } from "@vercel/remix";
import * as build from "@remix-run/dev/server-build";
import { installGlobals } from "@remix-run/node";

// Add global error handlers
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection:', reason);
});

process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
});

installGlobals();

export default createRequestHandler({
  build,
  mode: process.env.NODE_ENV,
  getLoadContext: () => ({
    // Add request-specific context here if needed
    timestamp: Date.now()
  })
}); 