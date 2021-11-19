const guestRole = "867714362352336927";

module.exports.description = "A command to join the Guest group";
module.exports.channel = "898293889318932550";

module.exports.handleInteraction = (interaction) => {
    let member = interaction.member;

    if(!member.roles.cache.has(guestRole)) {
        member.roles.add(guestRole);
        interaction.reply("Welcome aboard, <@" + member.user.id + ">!");
    } else {
        interaction.reply({ content: ":no_entry: You are already a Guest.", ephemeral: true });
    }
}