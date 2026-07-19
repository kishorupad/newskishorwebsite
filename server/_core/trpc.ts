import { NOT_ADMIN_ERR_MSG, UNAUTHED_ERR_MSG } from '../../shared/const';
import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";
import type { TrpcContext } from "./context";

const t = initTRPC.context<TrpcContext>().create({
  transformer: superjson,
});

export const router = t.router;
export const publicProcedure = t.procedure;

const requireUser = t.middleware(async opts => {
  const { ctx, next } = opts;

  if (!ctx.user) {
    throw new TRPCError({ code: "UNAUTHORIZED", message: UNAUTHED_ERR_MSG });
  }

  return next({
    ctx: {
      ...ctx,
      user: ctx.user,
    },
  });
});

export const protectedProcedure = t.procedure.use(requireUser);

export const adminProcedure = t.procedure.use(
  t.middleware(async opts => {
    const { ctx, next } = opts;

    if (!ctx.user || ctx.user.role !== 'admin') {
      throw new TRPCError({ code: "FORBIDDEN", message: NOT_ADMIN_ERR_MSG });
    }

    return next({
      ctx: {
        ...ctx,
        user: ctx.user,
      },
    });
  }),
);

// In-memory rate limiter for expensive operations (LLM calls)
const rateLimitStore = new Map<string, { count: number; resetAt: number }>();
const RATE_WINDOW_MS = 60_000; // 1 minute
const RATE_MAX = 10; // 10 requests per window

// Cleanup expired entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, value] of Array.from(rateLimitStore.entries())) {
    if (now > value.resetAt) {
      rateLimitStore.delete(key);
    }
  }
}, 5 * 60_000);

const rateLimitMiddleware = t.middleware(async opts => {
  const ip =
    opts.ctx.req?.headers["x-forwarded-for"]?.toString().split(",")[0]?.trim() ||
    opts.ctx.req?.socket?.remoteAddress ||
    "unknown";

  const now = Date.now();
  const entry = rateLimitStore.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitStore.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
  } else {
    entry.count++;
    if (entry.count > RATE_MAX) {
      throw new TRPCError({
        code: "TOO_MANY_REQUESTS",
        message: "Rate limit exceeded. Please try again later.",
      });
    }
  }

  return opts.next();
});

export const rateLimitedProcedure = t.procedure.use(rateLimitMiddleware);
