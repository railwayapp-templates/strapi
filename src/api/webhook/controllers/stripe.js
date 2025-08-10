'use strict';
const stripe = require('stripe')(process.env.SECRET_STRIPE);

function FormAddress(address){

  const street =  `${address.line1 || ''} ${address.line2 || ''}`.trim()
  const city = address.city || ''
  const state = address.country || ''
  const postalCode = address.postal_code || ''

  return `${street}, ${city} ${postalCode} ${state}`.trim();
}



module.exports ={
  async handleStripeWebhook(ctx) {
      console.log('→ Entrée dans handleStripeWebhook');
      console.log('→ ctx.request.body:', ctx.request.body); // debug
    const sig = ctx.request.headers['stripe-signature'];
    const webhookSecret = process.env.SECRET_STRIPE_WEBHOOK;
    let event;
    try {
      const rawBody = ctx.request.body[Symbol.for("unparsedBody")];
      if (!rawBody) {
        console.error('⚠️ No raw body found in the request');
        return ctx.badRequest('Webhook Error: No raw body found');
      }
      event = stripe.webhooks.constructEvent(
        rawBody,
        sig,
        webhookSecret
      )
    }  catch (err) {
      console.error('⚠️ Webhook signature verification failed:', err.message);
      return ctx.badRequest(`Webhook Error: ${err.message}`);



    }
    if (event.type === 'checkout.session.expired') {
      const session  = event.data.object
      const items = session.metadata.items ? JSON.parse(session.metadata.items) : [];
      try{
        await Promise.all(
          items.map(async (item) => {
            let pcs = await strapi.documents('api::produit-couleur-size.produit-couleur-size').findOne({
              documentId: item.documentId
            })
            console.log("pcs d'expired session trouvée", pcs)
            if (!pcs) {
            console.error(`⚠️ Produit Couleur Size with ID ${item.documentId} not found`);
            throw new Error(`Produit Couleur Size with ID ${item.documentId} not found`);

          } pcs = await strapi.documents('api::produit-couleur-size.produit-couleur-size').update({
            documentId: item.documentId,
            data: {
              reserve: (pcs.reserve - item.quantity)
            }
          })

          }
        ))

      }catch(error){

        console.error('⚠️ Error updating reserve from expired product:', error);
        return ctx.badRequest('Webhook Error: Invalid metadata format');
      }
    }
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;


      try{
        const items = session.metadata.items ? JSON.parse(session.metadata.items) : [];
        const email = session.customer_details.email;
        const name = session.customer_details.name;
        const address = FormAddress(session.customer_details.address || {});

        const createCommandeLine = await Promise.all(
          items.map (async (item) => {
          console.log("creatin g commande line for item:", item);
          const data = {
            ...(item.type === "produit" ? {produit_couleur_size: item.documentId} : {piece_unique: item.documentId}),
            name: `${item.name} / ${item.taille} qty: ${item.quantity}`,
            quantity: item.quantity,
          }


          let product;
          if (item.type === "produit") {
            product = await strapi.documents('api::produit-couleur-size.produit-couleur-size').findOne({
              documentId: item.documentId
            });
          } else if (item.type === "piece-unique") {
            product = await strapi.documents('api::piece-unique.piece-unique').findOne({
              documentId: item.documentId
            });
          }

          console.log("pcs trouvé oui oui:", product);

          if (!product) {
            console.error(`⚠️ Produit Couleur Size with ID ${item.documentId} not found`);
            throw new Error(`Produit Couleur Size with ID ${item.documentId} not found`);
          }

          if (product.stock < item.quantity) {
            console.error(`⚠️ Insufficient stock for Produit Couleur Size with ID ${item.documentId}`);
            throw new Error(`Insufficient stock for Produit Couleur Size with ID ${item.documentId}`);
          }

          product = await strapi.documents(item.type ==="produit" ? 'api::produit-couleur-size.produit-couleur-size' : 'api::piece-unique.piece-unique').update({
            documentId: item.documentId,
            data: {
              stock: (product.stock - item.quantity),
              reserve: (product.reserve - item.quantity)
            }
          })

          console.log("pcs mis à jour:", product);

          console.log("data for commande line:", data);
          return await strapi.entityService.create('api::commande-line.commande-line', {data}
          )
        }))


        await strapi.entityService.create('api::commande.commande', {
          data:{
          email: email,
          nom_complet: name,
          addresse: address,
          commande_lines: createCommandeLine.map(cl => cl.documentId)
          }


        })

        console.log('→ Commande created successfully');
      }catch (error) {
        console.error('⚠️ Error creating Commande:', error);
        return ctx.badRequest('Webhook Error: Invalid metadata format');
      }

    }
    return ctx.send({
      received: true,
      eventType: event.type,
      sessionId: event.data.object.id
    });
  }
}
