import { BaseCommandInteraction, Client, Message } from "discord.js";
import { ApplicationCommandTypes } from "discord.js/typings/enums";
import { ContextCommand } from "../Command";

//just copy and paste this commands, it has a few things pre made so it's easy as template
export default {
    name: "reply",
    ephemeral: true,
    type: ApplicationCommandTypes.MESSAGE,
    run: async (client: Client, interaction: BaseCommandInteraction) => {
        const message = interaction.options.get('message')?.message as Message

        const channel = message.channel
        const guildId = interaction.guildId;

        const messageUrl = `https://discord.com/channels/${guildId}/${channel.id}/${message.id}`

        await interaction.editReply({
            embeds: [{
                title: 'reply',
                description: `Execute this command:\n\`${`/ref channel:${channel.id} ref:${message.id}`}\``,
                url: messageUrl
            }],
        });
    }
} as ContextCommand;