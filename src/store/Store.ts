import { action, computed, observable } from "mobx";

export interface Item {
  name: string
  age: number
  salary: number
}

// type NewType = Item;

export default class GlobalStore {
  // @observable listEmployes: {name: string; age: number; salary: number}[] = []
  @observable listEmployes: {name: string; age: number; salary: number}[] = [{name: 'aaa', age: 13, salary: 10}, {name: 'wow', age: 18, salary: 15}]
  /**
   * Use mobx manager editedItem, defaultItem,
   * => FAIL: no use state.editedItem.name, age or salary. 
   */
  @observable editedIndex = -1
  @observable dialog = false
  @observable dialogDelete = false

  /**
   * computed
   */
  @computed get sumSalary() : number {
    let sum = 0
    this.listEmployes.forEach((employes) => {
      sum += Number(employes.salary)
    })
    return sum
  }

  @computed get oldestEmployee() : string {
    let maxOld = 0
    let nameMaxOld = ''
    this.listEmployes.forEach((employes) => {
      if(employes.age > maxOld){
        maxOld = employes.age
        nameMaxOld = employes.name
      }
    })
    return nameMaxOld
  }

  @computed get formTitle() {
    return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
  }
  
}

export const Store = new GlobalStore() 