import { Invoice } from "./classes/invoice.js";
import { ListTemplate } from "./classes/ListTemplate.js";
import { Payment } from "./classes/payment.js";
export function main() {
    const form = document.querySelector(".new-item-form");
    const type = document.querySelector("#type");
    const toFrom = document.querySelector("#tofrom");
    const details = document.querySelector("#details");
    const amount = document.querySelector("#amount");
    const ul = document.querySelector("ul");
    const list = new ListTemplate(ul);
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        let doc;
        if (type.value === "invoice") {
            doc = new Invoice(toFrom.value, details.value, amount.valueAsNumber);
        }
        else {
            doc = new Payment(toFrom.value, details.value, amount.valueAsNumber);
        }
        list.render(doc, type.value, "end");
    });
    //tackling Generics
    const addUID = (obj) => {
        let uid = Math.floor(Math.random() * 100);
        return Object.assign(Object.assign({}, obj), { uid });
    };
    let docOne = addUID({ name: "yoshi", age: 40 });
    console.log(docOne.name);
    const docThree = {
        uid: 1,
        resourceName: "person",
        data: { name: "shaun" }
    };
    const docFour = {
        uid: 2,
        resourceName: "teacher",
        data: ["ken", "2", "taiwo"]
    };
}
main();
