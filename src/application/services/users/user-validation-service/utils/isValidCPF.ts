/**
 * Valida o CPF.
 * @param cpf - CPF em formato string, podendo conter pontos e traço.
 * @returns true se for um CPF válido, false caso contrário.
 */
export function isValidCPF(cpf: string): boolean {
  // Remove quaisquer caracteres que não sejam dígitos.
  const cleaned = cpf.replace(/\D/g, '');

  // O CPF deve ter exatamente 11 dígitos.
  if (cleaned.length !== 11) return false;

  // Verifica se todos os dígitos são iguais (ex.: "11111111111").
  if (/^(\d)\1{10}$/.test(cleaned)) return false;

  // Validação do primeiro dígito verificador.
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cleaned.charAt(i)) * (10 - i);
  }
  let firstCheck = 11 - (sum % 11);
  if (firstCheck >= 10) firstCheck = 0;
  if (firstCheck !== parseInt(cleaned.charAt(9))) return false;

  // Validação do segundo dígito verificador.
  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cleaned.charAt(i)) * (11 - i);
  }
  let secondCheck = 11 - (sum % 11);
  if (secondCheck >= 10) secondCheck = 0;
  if (secondCheck !== parseInt(cleaned.charAt(10))) return false;

  return true;
}
