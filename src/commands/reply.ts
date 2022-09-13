import { BaseCommandInteraction, Client, Channel, TextChannel } from "discord.js";
import { Command } from "../../src/Command";
import Embed from '../lib/Embed'

//just copy and paste this commands, it has a few things pre made so it's easy as template
export default {
    name: "ref",
    description: "Reply to a message",
    type: "CHAT_INPUT",
    options: [
        {
            type: 'CHANNEL',
            //type: 'STRING',
            name: 'channel',
            description: 'Channel',
            required: true
        },
        {
            type: 'STRING',
            name: 'message',
            description: 'Message',
            required: true
        }],
    run: async (client: Client, interaction: BaseCommandInteraction) => {
        const channel = interaction.options.get('channel').channel as TextChannel
        //const chanId = interaction.options.get('channel').value as String;
        //const channel = await interaction.guild.channels.fetch(`${chanId}`) as TextChannel
        const msg = interaction.options.get('message').value as String
        const guildId = interaction.guildId;
        const message = await channel.messages.fetch(`${msg}`)

        const messageUrl = `https://discord.com/channels/${guildId}/${channel.id}/${message.id}`

        await interaction.followUp({
            embeds: [{ title: `Reply to:`, description: message.content, url: messageUrl }]
        });
    }
} as Command;