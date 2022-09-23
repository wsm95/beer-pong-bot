import { Command } from "./Command";
import { Hello } from "./commands/hello";
import { User } from "./commands/user";
import { Server } from "./commands/server";

export const Commands: Command[] = [Hello, User, Server];