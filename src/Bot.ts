import "dotenv/config";
import { Client } from "discord.js";
import ready from "./listeners/ready";
import interactionCreate from "./listeners/interactionCreate";

export const scores: { [userId: string]: number } = {};
export const guessDictionary: {
  [userId: string]: { guess: number; tag: string };
} = {};
export const scoreDictionary: {
  [userId: string]: { score: number; tag: string };
} = {};

console.log("Bot is starting...");

const token = process.env["DISCORD_TOKEN"];

const client = new Client({
  intents: [],
});

ready(client);
interactionCreate(client);

client.login(token);
