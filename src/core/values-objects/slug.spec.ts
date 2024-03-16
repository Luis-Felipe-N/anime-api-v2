import { test, expect } from 'vitest'
import { Slug } from './slug'

test('should be able to create a new slug from text', () => {
  const slug = Slug.createFromText('Example slug title')

  expect(slug.value).toEqual('example-slug-title')
})

test('should be able to create a new slug from text with special character', () => {
  const slug = Slug.createFromText('açúcar e melancia')

  expect(slug.value).toEqual('acucar-e-melancia')
})
