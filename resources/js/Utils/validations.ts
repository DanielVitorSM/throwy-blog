const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i;

export const requiredRule = (val: any) => (val && val.length > 0) || 'Preencha esse campo'

export const minLengthRule = (size: number) => 
    (val: any) => (val && val.length >= size) || `Insira no mínimo ${size} caracteres`

export const maxLengthRule = (size: number) => 
    (val: any) => (val && val.length <= size) || `Insira no máximo ${size} caracteres`

export const confirmPasswordRule = (val: any, compare: any) => (val == compare) || `As senhas não coincidem`

export const emailRule = (val: any) => (val && EMAIL_REGEX.test(val)) || "Insira um email válido"