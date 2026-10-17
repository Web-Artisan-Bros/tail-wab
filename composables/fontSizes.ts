import { fontSizesCss, fontSizesTailwind, type FontSizeRows } from '~/libs/fontSizesCode'

export function useFontSizes () {
  const entriesForm = useFormKitContextById('fontSizesEntriesForm')
  const twIncludeComments = ref(false)
  const cssIncludeComments = ref(false)
  
  const groupedByNameRes = computed(() => {
    if (!entriesForm?.value?.value) return ''
    
    const formData = entriesForm.value.value
    
    return Object.keys(formData).reduce((acc, key) => {
      const [name, type] = key.split('[')
      const value = formData[key]
      
      if (!acc[name]) {
        acc[name] = {} as any
      }
      
      const propKey = type.replace(']', '')
      
      acc[name][propKey] = value
      
      return acc
    }, {} as Record<string, {
      [key: string]: any
      fontMaxSize: number
      fontMinSize: number
      lineMaxSize: number
      lineMinSize: number
      resultFontSize: string
      resultLineHeight: string
    }>)
  })
  
  const rows = computed(() => (groupedByNameRes.value || {}) as FontSizeRows)

  const cssResult = computed(() => fontSizesCss(rows.value, cssIncludeComments.value))

  const twResult = computed(() => fontSizesTailwind(rows.value, 'v3', twIncludeComments.value))

  return {
    twIncludeComments,
    cssIncludeComments,
    groupedByNameRes,
    cssResult,
    twResult
  }
}
