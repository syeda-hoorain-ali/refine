import { defineField, defineType } from "sanity";
import { ShirtIcon } from "lucide-react"

export const product = defineType({
    name: 'product',
    title: 'Product',
    type: 'document',
    icon: ShirtIcon,

    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: Rule => Rule.required()
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'text',
            validation: Rule => Rule.required()
        }),
        defineField({
            name: 'images',
            title: 'Images',
            type: 'array',
            of: [{
                type: 'image',
                options: {
                    hotspot: true
                }
            }],
            validation: Rule => Rule.required().min(1)
        }),
        defineField({
            name: 'price',
            title: 'Price',
            type: 'number',
            validation: Rule => Rule.required().min(0)
        }),
        defineField({
            name: 'stock',
            title: 'Stock',
            type: 'number',
            validation: Rule => Rule.required().min(0)
        }),
        defineField({
            name: 'color',
            title: 'Color',
            type: 'array',
            of: [{ type: 'string' }],
            options: {layout: 'tags'},
            validation: Rule => Rule.required().min(1)
        })
    ],

    preview: {
        select: {
            title: 'title',
            subtitle: 'price',
            media: 'images[0]'
        }
    }
})
