import { Invoice } from "./classes/invoice.js"
import { ListTemplate } from "./classes/ListTemplate.js"
import { Payment } from "./classes/payment.js"
import { HasFormatter } from "./interfaces/HasFormatter.js"

export function main() {
  const form = document.querySelector(".new-item-form") as HTMLFormElement

  const type = document.querySelector("#type") as HTMLSelectElement
  const toFrom = document.querySelector("#tofrom") as HTMLInputElement
  const details = document.querySelector("#details") as HTMLInputElement
  const amount = document.querySelector("#amount") as HTMLInputElement

  const ul = document.querySelector("ul")!
  const list = new ListTemplate(ul)

  form.addEventListener("submit", (e: Event) => {
    e.preventDefault()

    //specifying tuple for better readability
    let values: [string, string, number] = [
      toFrom.value,
      details.value,
      amount.valueAsNumber
    ]

    let doc: HasFormatter
    if (type.value === "invoice") {
      doc = new Invoice(...values)
    } else {
      doc = new Payment(...values)
    }

    list.render(doc, type.value, "end")
  })

  //tackling Generics
  const addUID = <T extends object>(obj: T) => {
    let uid = Math.floor(Math.random() * 100)
    return { ...obj, uid }
  }

  let docOne = addUID({ name: "yoshi", age: 40 })
  console.log(docOne.name)

  interface Resource<T> {
    uid: number
    resourceName: string
    data: T
  }

  const docThree: Resource<object> = {
    uid: 1,
    resourceName: "person",
    data: { name: "shaun" }
  }

  const docFour: Resource<string[]> = {
    uid: 2,
    resourceName: "teacher",
    data: ["ken", "2", "taiwo"]
  }

  //let's tackle Enums
  enum ResourceType {
    BOOK,
    AUTHOR,
    FILM,
    DIRECTOR,
    PERSON
  }

  interface Resources<T> {
    uid: number
    resourceType: ResourceType
    data: T
  }

  const doc1: Resources<object> = {
    uid: 1,
    resourceType: ResourceType.BOOK,
    data: { title: "name of the wind" }
  }

  const doc2: Resources<object> = {
    uid: 10,
    resourceType: ResourceType.PERSON,
    data: { name: "yoshi" }
  }

  //experiment with Tuples

  let arr = ["ryu", 2, true]

  //array item order is fixed in place
  let tup: [string, number, boolean] = ["ryu", 25, false]
}

main()
