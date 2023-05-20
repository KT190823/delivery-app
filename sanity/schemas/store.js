import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'store',
  title: 'Store',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Store name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'short_description',
      title: 'Short description',
      type: 'string',
      validation: (Rule) => Rule.max(200),
    }),

    defineField({
      name: 'image',
      title: 'Image of store',
      type: 'image',
    }),

    defineField({
      name: 'lat',
      title: 'Latitude of store',
      type: 'number',
    }),

    defineField({
      name: 'long',
      title: 'Distance of store',
      type: 'number',
    }),

    defineField({
      name: 'address',
      title: 'Address of store',
      type: 'string',
    }),

    defineField({
      name: 'rating',
      title: 'Rating of store',
      type: 'number',
      validation: (Rule) => Rule.required().min(1).max(5).error('Please enter a value form 1 to 5'),
    }),
    defineField({
      name: 'type',
      title: 'Category',
      type: 'reference',
      validation: (Rule) => Rule.required(),
      to: {type: 'category'},
    }),
    defineField({
      name: 'dishes',
      title: 'Dishes',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'dish'}]}],
    }),
  ],
})
