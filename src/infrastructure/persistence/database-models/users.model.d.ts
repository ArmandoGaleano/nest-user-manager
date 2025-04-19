interface UsersModel {
  id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  birthdate: string;
  document: string;
  documentType: UserModelDocumentType;
  createdAt: Date;
  updatedAt: Date;
}

type UserModelDocumentType = 'CPF' | 'CNPJ';
