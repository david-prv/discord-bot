const notifyRole = "898650196853002320";

module.exports.description = "A command to activate optional special notifications";

module.exports.handleInteraction = (interaction) => {
    let member = interaction.member;

    if(!member.roles.cache.has(notifyRole)) {
        member.roles.add(notifyRole);
        interaction.reply({ content: ":loud_sound: Optional notifications are now active for you!", ephemeral: true });
    } else {
        member.roles.remove(notifyRole);
        interaction.reply({ content: ":mute: You disabled optional notifications.", ephemeral: true });
    }
}