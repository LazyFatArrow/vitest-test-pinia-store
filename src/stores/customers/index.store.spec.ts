import { beforeEach, describe, expect, it, vi } from 'vitest'
import { useCustomers } from './index.store'
import { createPinia, setActivePinia } from 'pinia'
import { fetchCustomers } from '../../services/customers.service'
import { Customer } from '../../types/Customer'

vi.mock('../../services/customers.service')

const getCustomers = (): Customer[] => [
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
]

describe('Customers Store', () => {
  beforeEach(() => {
    vi.mocked(fetchCustomers).mockReset()
    setActivePinia(createPinia())
  })

  describe('getters', () => {
    describe('activeCustomersCount', () => {
      it('returns the number of active customers', () => {
        const store = useCustomers()

        store.customers = getCustomers()

        expect(store.activeCustomersCount).toBe(1)
      })
    })

    describe('totalCustomersSpending', () => {
      it('returns the total spending of all customers', () => {
        const store = useCustomers()

        store.customers = getCustomers()

        expect(store.totalCustomersSpending).toBe(8000)
      })
    })
  })

  describe('actions', () => {
    describe('fetchCustomers', () => {
      it('calls fetchCustomers service method to fetches customers', async () => {
        const store = useCustomers()
        const customers = getCustomers()

        vi.mocked(fetchCustomers).mockResolvedValue(customers)

        await store.fetchCustomers()

        expect(fetchCustomers).toHaveBeenCalled()
        expect(store.customers).toStrictEqual(customers)
      })
    })
  })
})
