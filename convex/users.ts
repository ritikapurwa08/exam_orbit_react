import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { auth } from "./auth";
import { getAuthUserId } from "@convex-dev/auth/server";

export const getProfile = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return null;

    const user = await ctx.db.get(userId);
    if (!user) return null;

    const profile = await ctx.db
      .query("profiles")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .first();

    return {
      _id: user._id,
      name: user.name,
      email: user.email,
      bio: profile?.bio,
      role: profile?.role ?? "user",
      avatarUrl: profile?.avatarUrl,
    };
  },
});

export const updateProfile = mutation({
  args: {
    name: v.optional(v.string()),
    bio: v.optional(v.string()),
    avatarUrl: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Unauthenticated");

    if (args.name !== undefined) {
      await ctx.db.patch(userId, { name: args.name });
    }

    const profile = await ctx.db
      .query("profiles")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .first();

    const profileUpdates: any = {};
    if (args.bio !== undefined) profileUpdates.bio = args.bio;
    if (args.avatarUrl !== undefined) profileUpdates.avatarUrl = args.avatarUrl;

    if (profile) {
      await ctx.db.patch(profile._id, profileUpdates);
    } else {
      await ctx.db.insert("profiles", {
        userId,
        role: "user",
        ...profileUpdates,
      });
    }
  },
});
