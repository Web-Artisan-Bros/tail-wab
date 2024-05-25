import { limitDecimals } from '~/libs/limitDecimals'

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
  
  const cssResult = computed(() => {
    const toReturn = Object.keys(groupedByNameRes.value).reduce((acc, key) => {
      // @ts-ignore
      const values = groupedByNameRes.value[key]
      
      acc.push(`   --wabtu-${key}: ${values['resultFontSize']};`)
      acc.push(`   --wabtu-${key}-lh: ${values['resultLineHeight']};`)
      
      if (cssIncludeComments.value) {
        const fontMinSize = (limitDecimals(values.fontMinSize < values.fontMaxSize ? values.fontMinSize : values.fontMaxSize, 4))
        const fontMaxSize = (limitDecimals(values.fontMinSize > values.fontMaxSize ? values.fontMinSize : values.fontMaxSize, 4))
        const lineMinSize = (limitDecimals(values.lineMinSize < values.lineMaxSize ? values.lineMinSize : values.lineMaxSize, 4))
        const lineMaxSize = (limitDecimals(values.lineMinSize > values.lineMaxSize ? values.lineMinSize : values.lineMaxSize, 4))
        
        acc.splice(-2, 0, `   /* ${key}: ${fontMinSize}px → ${fontMaxSize}px */`)
        acc.splice(-1, 0, `   /* ${key}-lh: ${lineMinSize}em → ${lineMaxSize}em */`)
      }
      
      acc.push('')
      return acc
    }, [':root {'] as string[])
    
    toReturn.push('}')
    
    return toReturn
  })
  
  const twResult = computed(() => {
    const toReturn = Object.keys(groupedByNameRes.value).reduce((acc, key) => {
      // @ts-ignore
      const values = groupedByNameRes.value[key]
      const name = key.replace('text-', '')
      
      acc.push(`      "${name}": ["${values['resultFontSize']}", "${values['resultLineHeight']}"],`)
      
      if (twIncludeComments.value) {
        const fontMinSize = (limitDecimals(values.fontMinSize < values.fontMaxSize ? values.fontMinSize : values.fontMaxSize, 4))
        const fontMaxSize = (limitDecimals(values.fontMinSize > values.fontMaxSize ? values.fontMinSize : values.fontMaxSize, 4))
        const lineMinSize = (limitDecimals(values.lineMinSize < values.lineMaxSize ? values.lineMinSize : values.lineMaxSize, 4))
        const lineMaxSize = (limitDecimals(values.lineMinSize > values.lineMaxSize ? values.lineMinSize : values.lineMaxSize, 4))
        
        acc.splice(-1, 0, `      // ${name}: ${fontMinSize}px → ${fontMaxSize}px | lh: ${lineMinSize}em → ${lineMaxSize}em`)
      }
      
      // acc.push('')
      return acc
    }, [`module.exports = {
  theme: {
    fontSize: {`] as string[])
    
    toReturn.push(`    }
  }
}`)
    
    return toReturn
  })
  
  return {
    twIncludeComments,
    cssIncludeComments,
    groupedByNameRes,
    cssResult,
    twResult
  }
}
