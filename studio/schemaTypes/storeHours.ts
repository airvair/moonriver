import {defineType, defineField} from 'sanity'

export const storeHours = defineType({
  name: 'storeHours',
  title: 'Store Hours',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      initialValue: 'Store Hours',
      readOnly: true,
    }),
    defineField({
      name: 'hours',
      title: 'Hours by Day',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'day', title: 'Day', type: 'string'},
            {name: 'hours', title: 'Hours', type: 'string', description: 'e.g., "9 AM–3 PM" or "Closed". For split hours, use comma: "8 AM–3 PM, 5 PM–9 PM"'},
          ],
          preview: {
            select: {
              day: 'day',
              hours: 'hours',
            },
            prepare({day, hours}) {
              return {
                title: day,
                subtitle: hours,
              }
            },
          },
        },
      ],
    }),
    defineField({
      name: 'timezone',
      title: 'Timezone',
      type: 'string',
      initialValue: 'America/New_York',
      description: 'IANA timezone (e.g., America/New_York)',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Store Hours',
      }
    },
  },
})
