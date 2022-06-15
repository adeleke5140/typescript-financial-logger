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

    let doc: HasFormatter
    if (type.value === "invoice") {
      doc = new Invoice(toFrom.value, details.value, amount.valueAsNumber)
    } else {
      doc = new Payment(toFrom.value, details.value, amount.valueAsNumber)
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
}

main()
