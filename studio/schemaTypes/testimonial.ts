import {defineType, defineField} from 'sanity'

export const testimonial = defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Customer Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Role/Description',
      type: 'string',
      description: 'e.g., "Local Guide", "Brunch Guest", "Remote Worker"',
    }),
    defineField({
      name: 'rating',
      title: 'Star Rating',
      type: 'number',
      options: {
        list: [
          {title: '5 Stars', value: 5},
          {title: '4 Stars', value: 4},
          {title: '3 Stars', value: 3},
          {title: '2 Stars', value: 2},
          {title: '1 Star', value: 1},
        ],
      },
      initialValue: 5,
      validation: (Rule) => Rule.required().min(1).max(5),
    }),
    defineField({
      name: 'review',
      title: 'Review Text',
      type: 'text',
      rows: 6,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'initials',
      title: 'Initials',
      type: 'string',
      description: 'Displayed in the avatar circle (e.g., "VS" for Varsha Satish)',
      validation: (Rule) => Rule.max(3),
    }),
    defineField({
      name: 'avatar',
      title: 'Avatar Image (optional)',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description: 'Show this testimonial prominently',
      initialValue: true,
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first',
    }),
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{field: 'order', direction: 'asc'}],
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'role',
      rating: 'rating',
    },
    prepare({title, subtitle, rating}) {
      return {
        title,
        subtitle: `${subtitle} - ${'★'.repeat(rating || 0)}`,
      }
    },
  },
})
