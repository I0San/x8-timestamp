import { useState, useCallback } from 'react'
import { hashFile } from '../lib/hash'

interface FileHashState {
  file: File | null
  hash: `0x${string}` | null
  isHashing: boolean
  error: string | null
}

export function useFileHash() {
  const [state, setState] = useState<FileHashState>({
    file: null,
    hash: null,
    isHashing: false,
    error: null,
  })
  
  const processFile = useCallback(async (file: File) => {
    setState({
      file,
      hash: null,
      isHashing: true,
      error: null,
    })
    
    try {
      const hash = await hashFile(file)
      setState({
        file,
        hash,
        isHashing: false,
        error: null,
      })
    } catch (err) {
      setState({
        file,
        hash: null,
        isHashing: false,
        error: err instanceof Error ? err.message : 'Failed to hash file',
      })
    }
  }, [])
  
  const reset = useCallback(() => {
    setState({
      file: null,
      hash: null,
      isHashing: false,
      error: null,
    })
  }, [])
  
  return {
    ...state,
    processFile,
    reset,
  }
}
