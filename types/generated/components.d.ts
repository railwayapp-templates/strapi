import type { Schema, Struct } from '@strapi/strapi';

export interface SharedCompositionItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_composition_items';
  info: {
    description: '';
    displayName: 'composition';
  };
  attributes: {
    matiere: Schema.Attribute.Relation<'oneToOne', 'api::matiere.matiere'>;
    pourcentage: Schema.Attribute.Integer;
  };
}

export interface SharedHex extends Struct.ComponentSchema {
  collectionName: 'components_shared_hexes';
  info: {
    displayName: 'HEX';
  };
  attributes: {
    HEX: Schema.Attribute.String &
      Schema.Attribute.CustomField<'plugin::color-picker.color'>;
  };
}

export interface SharedLogo extends Struct.ComponentSchema {
  collectionName: 'components_shared_logos';
  info: {
    displayName: 'logo';
  };
  attributes: {
    logo: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
  };
}

export interface SharedMedia extends Struct.ComponentSchema {
  collectionName: 'components_shared_media';
  info: {
    displayName: 'Media';
    icon: 'file-video';
  };
  attributes: {
    file: Schema.Attribute.Media<'images' | 'files' | 'videos'>;
  };
}

export interface SharedQuote extends Struct.ComponentSchema {
  collectionName: 'components_shared_quotes';
  info: {
    displayName: 'Quote';
    icon: 'indent';
  };
  attributes: {
    body: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface SharedRichText extends Struct.ComponentSchema {
  collectionName: 'components_shared_rich_texts';
  info: {
    description: '';
    displayName: 'Rich text';
    icon: 'align-justify';
  };
  attributes: {
    body: Schema.Attribute.RichText;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    description: '';
    displayName: 'Seo';
    icon: 'allergies';
    name: 'Seo';
  };
  attributes: {
    metaDescription: Schema.Attribute.Text & Schema.Attribute.Required;
    metaTitle: Schema.Attribute.String & Schema.Attribute.Required;
    shareImage: Schema.Attribute.Media<'images'>;
  };
}

export interface SharedSlider extends Struct.ComponentSchema {
  collectionName: 'components_shared_sliders';
  info: {
    description: '';
    displayName: 'Slider';
    icon: 'address-book';
  };
  attributes: {
    files: Schema.Attribute.Media<'images', true>;
  };
}

export interface SharedTexteImage extends Struct.ComponentSchema {
  collectionName: 'components_shared_texte_images';
  info: {
    displayName: 'TexteImage';
  };
  attributes: {
    photo: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    texte: Schema.Attribute.RichText;
    titre: Schema.Attribute.String;
  };
}

export interface SharedTitleText extends Struct.ComponentSchema {
  collectionName: 'components_shared_title_texts';
  info: {
    displayName: 'TitleText';
  };
  attributes: {
    text: Schema.Attribute.RichText;
    title: Schema.Attribute.String;
  };
}

export interface SharedTitrePage extends Struct.ComponentSchema {
  collectionName: 'components_shared_titre_pages';
  info: {
    displayName: 'titrePage';
  };
  attributes: {
    titre: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'shared.composition-item': SharedCompositionItem;
      'shared.hex': SharedHex;
      'shared.logo': SharedLogo;
      'shared.media': SharedMedia;
      'shared.quote': SharedQuote;
      'shared.rich-text': SharedRichText;
      'shared.seo': SharedSeo;
      'shared.slider': SharedSlider;
      'shared.texte-image': SharedTexteImage;
      'shared.title-text': SharedTitleText;
      'shared.titre-page': SharedTitrePage;
    }
  }
}
