module.exports = {
  async afterCreate(event) {
    const  {result } = event;
    console.log('AFTER CREATE triggered', result.id, new Date());

    if (!result.documentId) {
      console.error('Commande non trouvée avec ID:', result.id);
      return;
    }

    if (result.publishedAt === null) {
      return;
    }

       if (result.email_sent === true) {
      return;
    }


    const commandeComplete = await strapi.documents('api::commande.commande').findOne({
      documentId: result.documentId,
      populate: {
        commande_lines: {
          fields: ['name'],
        }

      }
    })

    const clientEmail = commandeComplete.email;
    const clientName = commandeComplete.nom_complet;
    const clientAddress = commandeComplete.addresse;
    const commandeLines = commandeComplete.commande_lines;

    try {
      await strapi.plugins['email'].services.email.send({
        to: 'contact@kraze.fr',
        from: 'no-reply@kraze.fr',
        subject: `Nouvelle commande de ${clientName} `,
        text: `Vous avez reçu une nouvelle commande de ${clientName} (${clientEmail}) - REFERENCE: ${result.documentId}\n\nAdresse: ${clientAddress}\n\nDétails de la commande:\n${commandeLines.map(line => `- ${line.name} (Quantité: ${line.quantity})`).join('\n')}`,
        html: `<p>Vous avez reçu une nouvelle commande de <strong>${clientName}</strong> (${clientEmail})</p><p>Adresse: ${clientAddress}</p><p>Détails de la commande:</p><ul>${commandeLines.map(line => `<li>${line.name} </li>`).join('')}</ul>`,
    })

    await strapi.plugins['email'].services.email.send({
        to: clientEmail,
        from: 'no-reply@kraze.fr',
        subject: `Confirmation de votre commande ${result.documentId}`,
        text: `Bonjour ${clientName},\n\nMerci pour votre commande !\n\nAdresse: ${clientAddress}\n\nDétails de la commande:\n${commandeLines.map(line => `- ${line.name}`).join('\n')}\n\nNous vous informerons lorsqu'elle aura été expédiée.\n\nCordialement,\n Kraze`,
        html: `<p>Bonjour <strong>${clientName}</strong>,</p><p>Merci pour votre commande ! <p>Adresse: ${clientAddress}</p><p>Détails de la commande:</p><ul>${commandeLines.map(line => `<li>${line.name}</li>`).join('')}</ul><p>Nous vous informerons lorsqu'elle aura été expédiée.</p><p>Cordialement,<br>Kraze</p>
        `,
    })

      await strapi.documents('api::commande.commande').update({
      documentId: result.documentId,
      data: {
        email_sent:true
      }
    })

    }catch(error) {
          console.error('Error sending email:', error);
    }
  },

  async afterUpdate(event) {
    const { result, params } = event;
        console.log('AFTER UPDATE triggered', result.id, new Date());
        console.log('Valeur de expediee:', result.expediee, typeof result.expediee);
        console.log('Email du client pour expédition:', result.email);
        console.log('publishedAt:', result.publishedAt);

   if (result.expediee === true) {
    try{
      await strapi.plugins['email'].services.email.send({
        to: result.email,
        from: 'no-reply@kraze.fr',
        subject: `Votre commande Kraze référence ${result.documentId} a été expédiée`,
        text: `Bonjour ${result.nom_complet},\n\nNous avons le plaisir de vous informer que votre commande référence ${result.documentId} a été expédiée.\n\nMerci pour votre confiance !\n\nCordialement,\nL'équipe Kraze`,
        html: `<p>Bonjour <strong>${result.nom_complet}</strong>,</p><p>Nous avons le plaisir de vous informer que votre commande référence <strong>${result.documentId}</strong> a été expédiée.</p><p>Merci pour votre confiance !</p><p>Cordialement,<br>L'équipe Kraze</p>`,
      })
          console.log('✅ Email expédié avec succès !');

    }catch(error){
      console.error('Error sending email on update:', error);
    }
   }


  }
}
