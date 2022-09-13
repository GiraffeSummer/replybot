import { Client } from "discord.js";

export default (client: Client): void => {
    client.on("guildDelete", async (guild) => {
        if (!guild) {
            return;
        }
        //3
        console.log(`Left guild ${guild.name}`);
    });
};