import { checkbox } from "@mui/material"
import { useState } from "react"

const [emailReminder, setEmailReminder] = useState  (false)
<form>
    <><input type="checkbox" id="emailReminder" name="emailReminder" />
    <label for="emailReminder">Would you like to get email reminders?</label></>
</form>
let checkbox = document.querySelector("emailReminder")
console.log(checkbox.checked)
function emailReminder(email) {

}