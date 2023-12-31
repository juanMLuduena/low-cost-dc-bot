const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('desmutear')
		.setDescription('Desmutea a los weones de siempre'),
	async execute(interaction) {
		// Verifica si el autor del mensaje tiene permisos para mutear a los usuarios.
    if (interaction.member.roles.cache.find((r) => r.name === 'Oficiales') == undefined) {
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

    // Desmutea a cada miembro encontrado.
    membersToMute.forEach((member) => {
      member.voice.setMute(false)
        .catch((error) => console.error(error));
    });
    switch ([...membersToMute].length) {
      case 0:
        interaction.reply(`No hay weones para desmutear`);
        break;
      case 1:
        interaction.reply(`Se ha desmuteado a 1 weon`);
        break;
      default:
        interaction.reply(`Se han desmuteado ${[...membersToMute].length} weones`);
    }
	},
};