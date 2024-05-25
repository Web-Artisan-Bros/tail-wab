import { limitDecimals } from '~/libs/limitDecimals'

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
  
  const cssResult = computed<string[]>(() => {
    const toReturn = Object.keys(groupedByNameRes.value)
      .sort((a, b) => +a > +b ? 1 : -1)
      .reduce((acc, key) => {
        // @ts-ignore
        const values = groupedByNameRes.value[key]
        
        acc.push(`   --wabtu-${key}: ${values['resultSize']};`)
        
        if (cssIncludeComments.value) {
          const minSize = (limitDecimals(values.minSize < values.maxSize ? values.minSize : values.maxSize, 4))
          const maxSize = (limitDecimals(values.minSize > values.maxSize ? values.minSize : values.maxSize, 4))
          
          acc.splice(-1, 0, `   /* ${key}: ${minSize}px → ${maxSize}px */`)
        }
        return acc
      }, [':root {'] as string[])
    
    toReturn.push('}')
    
    return toReturn
  })
  
  const twResult = computed<string[]>(() => {
    const toReturn = Object.keys(groupedByNameRes.value)
      .sort((a, b) => +a > +b ? 1 : -1)
      .reduce((acc, key) => {
        // @ts-ignore
        const values = groupedByNameRes.value[key]
        const name = key.replace('text-', '')
        
        acc.push(`      "${name}": "${values['resultSize']}",`)
        
        if (twIncludeComments.value) {
          const minSize = (limitDecimals(values.minSize < values.maxSize ? values.minSize : values.maxSize, 4))
          const maxSize = (limitDecimals(values.minSize > values.maxSize ? values.minSize : values.maxSize, 4))
          
          acc.splice(-1, 0, `      // ${name}: ${minSize}px → ${maxSize}px`)
        }
        
        // acc.push('')
        return acc
      }, [`module.exports = {
  theme: {
    spacing: {`] as string[])
    
    toReturn.push(`    }
  }
}`)
    
    return toReturn
  })
  
  return {
    cssIncludeComments,
    twIncludeComments,
    groupedByNameRes,
    cssResult,
    twResult
  }
}
