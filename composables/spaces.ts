import { spacesCss, spacesTailwind, type SpaceRows } from '~/libs/spacesCode'

export function useSpaces () {
  const entriesForm = useFormKitContextById('spacesEntriesForm')
  
  const formData = computed(() => entriesForm?.value?.value)
  
  const cssIncludeComments = ref(false)
  const twIncludeComments = ref(false)
  
  const groupedByNameRes = computed(() => {
    if (!formData.value) return ''
    
    return Object.keys(formData.value).reduce((acc, key) => {
      const [name, type] = key.split('[')
      const value = formData.value[key]
      
      if (!acc[name]) {
        acc[name] = {} as any
      }
      
      const propKey = type.replace(']', '')
      
      acc[name][propKey] = value
      
      return acc
    }, {} as Record<string, {
      [key: string]: any
      minSize: number
      maxSize: number
      resultSize: string
    }>)
  })
  
  const rows = computed(() => (groupedByNameRes.value || {}) as SpaceRows)

  const cssResult = computed<string[]>(() => spacesCss(rows.value, cssIncludeComments.value))

  const twResult = computed<string[]>(() => spacesTailwind(rows.value, 'v3', twIncludeComments.value))

  return {
    cssIncludeComments,
    twIncludeComments,
    groupedByNameRes,
    cssResult,
    twResult
  }
}
