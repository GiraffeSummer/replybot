import { BaseCommandInteraction, Client, Channel, TextChannel, InteractionReplyOptions, } from "discord.js";
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
            name: 'ref',
            description: 'Message',
            required: true
        },
        {
            type: 'STRING',
            name: 'message',
            description: 'Message to add'
        }],
    run: async (client: Client, interaction: BaseCommandInteraction) => {
        const channel = interaction.options.get('channel').channel as TextChannel
        //const chanId = interaction.options.get('channel').value as String;
        //const channel = await interaction.guild.channels.fetch(`${chanId}`) as TextChannel
        const msg = interaction.options.get('ref').value as string
        const newContext = interaction.options.get('message')?.value as string | undefined || undefined
        const guildId = interaction.guildId;
        const message = await channel.messages.fetch(`${msg}`)

        const messageUrl = `https://discord.com/channels/${guildId}/${channel.id}/${message.id}`


        const followUp: InteractionReplyOptions =
        {
            embeds: [
                {
                    title: `Replied to:`,
                    description: message.content,
                    author: {
                        name: message.author.username,
                        url: messageUrl,
                        icon_url: message.author.displayAvatarURL({ dynamic: true })
                    },
                }
            ]
        }

        if (newContext != undefined) {
            followUp.embeds.push({
                description: newContext,
                author: {
                    icon_url: interaction.user.displayAvatarURL({ dynamic: true }),
                    name: `${interaction.user.username}:`
                }
            });
        }

        await interaction.followUp(followUp);
    }
} as Command;