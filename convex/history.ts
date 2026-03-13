import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { auth } from "./auth";
import { getAuthUserId } from "@convex-dev/auth/server";

export const getUserHistory = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return [];

    const history = await ctx.db
      .query("testHistory")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .order("desc") // Most recent first
      .collect();

    return history;
  },
});

export const addTestHistory = mutation({
  args: {
    subjectId: v.string(),
    topicId: v.string(),
    score: v.number(),
    totalQuestions: v.number(),
    timeSpent: v.number(),
    userAnswers: v.optional(v.array(v.number())),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Unauthenticated");

    await ctx.db.insert("testHistory", {
      userId,
      subjectId: args.subjectId,
      topicId: args.topicId,
      score: args.score,
      totalQuestions: args.totalQuestions,
      timeSpent: args.timeSpent,
      completedAt: Date.now(),
      userAnswers: args.userAnswers,
    });
  },
});
