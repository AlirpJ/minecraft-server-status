module.exports = {
    name: 'clear',
    description: "Clear messages!",
    
   async  execute(message, args) {
        await message.channel.messages.fetch({ limit: 10}).then(messages =>{
            message.channel.bulkDelete(10)
    console.log("successful clear")
    });
 
 }
 
}   