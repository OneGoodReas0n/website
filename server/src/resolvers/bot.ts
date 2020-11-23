import { Resolver, InputType, Field, Mutation, Arg } from "type-graphql";
import Telegraf from "telegraf";

const bot = new Telegraf(process.env.BOT_TOKEN || "");

@InputType()
export class Message {
  @Field()
  email: string;
  @Field()
  title: string;
  @Field()
  message: string;
}

@Resolver()
export default class BotResolver {
  @Mutation(() => Number)
  message(@Arg("input") input: Message): number {
    const messageCtx =
      "Email: " +
      input.email +
      "\n" +
      "Title: " +
      input.title +
      "\n" +
      "Message: " +
      input.message;
    bot.telegram.sendMessage(process.env.USER_CHAT_ID || "", messageCtx);
    return 1;
  }
}
