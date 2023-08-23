import { Customer } from '../types/Customer'

export const fetchCustomers = (): Promise<Customer[]> => {
  return new Promise((resolve) => {
    resolve([
      {
        id: '1',
        fullName: 'John Doe',
        isActive: true,
        totalSpending: 3000,
      },
      {
        id: '2',
        fullName: 'John Cena',
        isActive: false,
        totalSpending: 5000,
      },
    ])
  })
}
