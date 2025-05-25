export interface UsersModel {
  id: string; // UUID
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  birthdate: string; // YYYY-MM-DD
  document: string; // CPF string or CNPJ string
  documentType: UserModelDocumentType; // 'CPF' or 'CNPJ'
  createdAt: Date;
  updatedAt: Date;
}

export type UserModelDocumentType = 'CPF' | 'CNPJ';
