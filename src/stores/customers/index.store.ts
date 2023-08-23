import { defineStore } from 'pinia'
import { fetchCustomers } from '../../services/customers.service'
import { Customer } from '../../types/Customer'

type State = {
  customers: Customer[]
  isRequestPending: boolean
}

export const useCustomers = defineStore('customers', {
  state: (): State => ({
    customers: [],
    isRequestPending: false,
  }),
  getters: {
    activeCustomersCount({ customers }) {
      return customers.filter(({ isActive }) => isActive).length
    },
    totalCustomersSpending({ customers }) {
      return customers.reduce((totalSpending, customer) => {
        return totalSpending + customer.totalSpending
      }, 0)
    },
  },
  actions: {
    async fetchCustomers(): Promise<void> {
      this.isRequestPending = true
      this.customers = await fetchCustomers()
      this.isRequestPending = false
    },
  },
})
