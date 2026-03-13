import { defineSchema, defineTable } from "convex/server";
import { authTables } from "@convex-dev/auth/server";
import { v } from "convex/values";

const schema = defineSchema({
  ...authTables,
  
  profiles: defineTable({
    userId: v.id("users"),
    bio: v.optional(v.string()),
    role: v.string(), // e.g., "user" | "admin"
    avatarUrl: v.optional(v.string()), 
  }).index("by_user", ["userId"]),
  
  testHistory: defineTable({
    userId: v.id("users"),
    subjectId: v.string(),
    topicId: v.string(),
    score: v.number(),
    totalQuestions: v.number(),
    timeSpent: v.number(),
    completedAt: v.number(),
    userAnswers: v.optional(v.array(v.number())), // Optional array of numbers storing answers
  }).index("by_user", ["userId"]),

  studyGroups: defineTable({
    name: v.string(),
    description: v.optional(v.string()),
    createdBy: v.id("users"),
    members: v.array(v.id("users")),
    isPrivate: v.boolean(),
  }),

  messages: defineTable({
    groupId: v.id("studyGroups"),
    senderId: v.id("users"),
    text: v.string(),
    timestamp: v.number(),
  }).index("by_group", ["groupId"]),
});

export default schema;