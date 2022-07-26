import { writable } from "svelte/store"

const EditorValue = writable("")

const EditorTarget = writable("/home/iamfiasco/deardiary/today.md")

const EditorFType = writable("markdown")

export { EditorValue, EditorTarget, EditorFType }


