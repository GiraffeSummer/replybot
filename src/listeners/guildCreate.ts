import { Client } from "discord.js";

export default (client: Client): void => {
    client.on("guildCreate", async (guild) => {
        if (!guild) {
            return;
        }
        //3
        console.log(`joined guild ${guild.name}`);
    });
};