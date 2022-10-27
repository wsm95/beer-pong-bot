import "dotenv/config";
import { Client, GuildMember } from "discord.js";
import ready from "./listeners/ready";
import interactionCreate from "./listeners/interactionCreate";
import { Database } from "sqlite3";
import { initializeDatabase } from "./database/databaseUtils";

export const scores: { [userId: string]: number } = {};
export const guessDictionary: {
  [userId: string]: { guess: number; member: GuildMember | undefined };
} = {};
export const scoreDictionary: {
  [userId: string]: { score: number; member: GuildMember | undefined };
} = {};

initializeDatabase().then(() => {});

console.log("Bot is starting...");

const token = process.env["DISCORD_TOKEN"];

const client = new Client({
  intents: [],
});

ready(client);
interactionCreate(client);

client.login(token);
