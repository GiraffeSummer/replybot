import { BaseCommandInteraction, ButtonInteraction, Client, Interaction, MessageComponentInteraction } from "discord.js";
import commands, { context_commands } from "../Commands";

export default (client: Client): void => {
    client.on("interactionCreate", async (interaction: Interaction) => {
        if (interaction.isContextMenu()) {
            await handleContextMenu(client, interaction);
        } else if (interaction.isCommand()) {
            await handleSlashCommand(client, interaction);
        }
    });
};

const handleSlashCommand = async (client: Client, interaction: BaseCommandInteraction): Promise<void> => {
    const slashCommand = commands.find(c => c.name === interaction.commandName);
    if (!slashCommand) {
        interaction.followUp({ content: "An error has occurred" });
        return;
    }

    if ((typeof slashCommand.noDefer == 'boolean') ? !slashCommand.noDefer : true) {
        await interaction.deferReply((slashCommand.ephemeral != null) ? { ephemeral: slashCommand.ephemeral || false } : undefined);
    }

    slashCommand.run(client, interaction);
};

const handleContextMenu = async (client: Client, interaction: BaseCommandInteraction): Promise<void> => {
    const context_command = context_commands.find(c => c.name === interaction.commandName);
    if (!context_command) {
        interaction.followUp({ content: "An error has occurred" });
        return;
    }

    if ((typeof context_command.noDefer == 'boolean') ? !context_command.noDefer : true) {
        await interaction.deferReply((context_command.ephemeral != null) ? { ephemeral: context_command.ephemeral || false } : undefined);
    }

    context_command.run(client, interaction);
};