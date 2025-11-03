/**
 * Utilitários para geração de dados de teste
 */
export class DataGenerator {
  /**
   * Gera um email aleatório
   */
  static generateEmail(): string {
    const timestamp = Date.now()
    return `user${timestamp}@example.com`
  }

  /**
   * Gera uma senha aleatória
   */
  static generatePassword(length: number = 8): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*'
    let password = ''
    for (let i = 0; i < length; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return password
  }

  /**
   * Gera um nome aleatório
   */
  static generateName(): string {
    const firstNames = ['Ana', 'João', 'Maria', 'Pedro', 'Carla', 'Lucas', 'Fernanda', 'Rafael']
    const lastNames = ['Silva', 'Santos', 'Oliveira', 'Souza', 'Lima', 'Costa', 'Pereira', 'Rodrigues']
    
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)]
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)]
    
    return `${firstName} ${lastName}`
  }

  /**
   * Gera um número de telefone brasileiro
   */
  static generatePhoneNumber(): string {
    const ddd = Math.floor(Math.random() * (99 - 11 + 1)) + 11
    const number = Math.floor(Math.random() * 900000000) + 100000000
    return `(${ddd}) 9${number}`
  }

  /**
   * Gera um CPF válido
   */
  static generateCPF(): string {
    const cpf = []
    for (let i = 0; i < 9; i++) {
      cpf.push(Math.floor(Math.random() * 10))
    }
    
    // Cálculo do primeiro dígito verificador
    let sum = 0
    for (let i = 0; i < 9; i++) {
      sum += cpf[i] * (10 - i)
    }
    const firstDigit = 11 - (sum % 11)
    cpf.push(firstDigit >= 10 ? 0 : firstDigit)
    
    // Cálculo do segundo dígito verificador
    sum = 0
    for (let i = 0; i < 10; i++) {
      sum += cpf[i] * (11 - i)
    }
    const secondDigit = 11 - (sum % 11)
    cpf.push(secondDigit >= 10 ? 0 : secondDigit)
    
    return cpf.join('')
  }
}