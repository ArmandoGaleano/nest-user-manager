/**
 * Valida o CNPJ.
 * @param cnpj - CNPJ em formato string, podendo conter pontuação.
 * @returns true se for um CNPJ válido, false caso contrário.
 */
export function isValidCNPJ(cnpj: string): boolean {
  // Remove quaisquer caracteres que não sejam dígitos.
  const cleaned = cnpj.replace(/\D/g, '');

  // O CNPJ deve ter exatamente 14 dígitos.
  if (cleaned.length !== 14) return false;

  // Verifica se todos os dígitos são iguais (ex.: "00000000000000").
  if (/^(\d)\1{13}$/.test(cleaned)) return false;

  // Função auxiliar para calcular o dígito verificador.
  const calcCheckDigit = (digits: string, weights: number[]): number => {
    let sum = 0;
    for (let i = 0; i < weights.length; i++) {
      sum += parseInt(digits.charAt(i)) * weights[i];
    }
    const remainder = sum % 11;
    return remainder < 2 ? 0 : 11 - remainder;
  };

  // Cálculo do primeiro dígito verificador com os 12 primeiros dígitos.
  const firstWeights = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  const firstCheck = calcCheckDigit(cleaned, firstWeights);
  if (firstCheck !== parseInt(cleaned.charAt(12))) return false;

  // Cálculo do segundo dígito verificador com os 12 primeiros dígitos + primeiro dígito verificador.
  const secondWeights = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  const secondCheck = calcCheckDigit(cleaned, secondWeights);
  if (secondCheck !== parseInt(cleaned.charAt(13))) return false;

  return true;
}
