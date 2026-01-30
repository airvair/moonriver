import {defineType, defineField} from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Site Title',
      type: 'string',
      initialValue: 'Moon River Café',
    }),
    defineField({
      name: 'menuPdf',
      title: 'Menu PDF',
      type: 'file',
      description: 'Upload the current menu PDF',
      options: {
        accept: '.pdf',
      },
    }),
    defineField({
      name: 'menuLastUpdated',
      title: 'Menu Last Updated',
      type: 'date',
      description: 'When was the menu last updated?',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Background Image',
      type: 'image',
      description: 'Main homepage background image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'contactEmail',
      title: 'Contact Email',
      type: 'email',
    }),
    defineField({
      name: 'contactPhone',
      title: 'Contact Phone',
      type: 'string',
    }),
    defineField({
      name: 'address',
      title: 'Address',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Media Links',
      type: 'object',
      fields: [
        {name: 'instagram', title: 'Instagram URL', type: 'url'},
        {name: 'facebook', title: 'Facebook URL', type: 'url'},
        {name: 'tiktok', title: 'TikTok URL', type: 'url'},
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Site Settings',
      }
    },
  },
})
