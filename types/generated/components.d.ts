import type { Schema, Attribute } from '@strapi/strapi';

export interface ElementsButtonLink extends Schema.Component {
  collectionName: 'components_elements_button_links';
  info: {
    displayName: 'ButtonLink';
  };
  attributes: {
    name: Attribute.String;
    link: Attribute.String;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'elements.button-link': ElementsButtonLink;
    }
  }
}
