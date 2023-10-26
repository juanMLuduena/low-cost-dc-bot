const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('mutear')
		.setDescription('Mutea a los weones de siempre'),
	async execute(interaction) {

		// Verifica si el autor del mensaje tiene permisos para mutear a los usuarios.
    if (!interaction.member.permissions.has('MANAGE_ROLES')) {
      return interaction.reply('No tienes permiso para ejecutar este comando.');
    }
      
          // Obtiene el rol "hablador" por nombre.
    const role = interaction.guild.roles.cache.find((r) => r.name === 'Hablador');

    // Verifica si se encontró el rol.
    if (!role) {
      return interaction.reply('No se encontró el rol "hablador".');
    }
    // Obtiene todos los miembros que tienen el rol "hablador".
    const membersToMute = interaction.guild.members.cache.filter((member) => member.roles.cache.has(role.id));

    // Mutea a cada miembro encontrado.
    membersToMute.forEach((member) => {
      member.voice.setMute(true)
        .catch((error) => console.error(error));
    });
    interaction.reply(`Se han muteado ${[...membersToMute].length} weones`)
	},
};