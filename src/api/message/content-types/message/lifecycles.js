module.exports = {
  async afterCreate(event) {
    const  {result } = event;

    if (result.publishedAt === null) {
      return
    }

    const clientEmail = result.email;
    const clientName = result.nom;
    const clientMessage = result.content;

    try {
      await strapi.plugins['email'].services.email.send({
        to: 'contact@kraze.fr',
        from: 'no-reply@kraze.fr',
        subject: `Nouveau message de ${clientName}`,
        text: `Vous avez reçu un nouveau message de ${clientName} (${clientEmail}
        ):\n\n${clientMessage}`,
        html: `<p>Vous avez reçu un nouveau message de <strong>${clientName}</strong> (${clientEmail}):</p><p>${clientMessage}</p>`,

    })
     console.log("✅ Email envoyé !");
    }catch(error) {
          console.error('Error sending email:', error);
    }
  }
}
