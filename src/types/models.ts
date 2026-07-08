export type Owner = {
    _id: string;
    name: string;
    lastname: string;
    email: string;
    active: boolean;
}

export type Verification = {
    state: boolean;
    code?: string;
    createdAt: string;
    updatedAt: string;
}

export type Branch = {
    _id: string,
    ownerId: string,
    nit: string,
    name: string,
    location: string,
    contacts: string,
    logoUrl: string,
    createdAt: string,
    updatedAt: string,
}

export type Brand = {
    _id: string,
    branchId: string,
    name: string,
    origin?: string,
    active: boolean,
    createdAt: string,
    updatedAt: string,
}

export type Category = {
    _id: string,
    branchId: string,
    name: string,
    description: string,
    active: boolean,
    createdAt: string,
    updatedAt: string,
}

export type MeasurementUnit = {
  _id?: string,
  branchId?: string,
  code: string,
  name: string,
  abbreviation: string,
  description: string,
  createdAt?: string,
  updatedAt?: string,
}