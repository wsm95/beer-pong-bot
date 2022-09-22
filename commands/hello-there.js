const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('hello-there')
		.setDescription('Replies with the thing!'),
	async execute(interaction) {
		await interaction.reply('general kenobi!');
	},
};