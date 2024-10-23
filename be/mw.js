import { z } from "zod"
const participantSchema = z.object({
    name: z.string().min(3).max(10),
    age: z.number({
        required_error: "Please enter your age",
        invalid_type_error: "please enter a valid number"
    }).min(18, {
        message: " You are under age, get older"
    }).max(25, {
        message: "You are too old, get younger"
    })

})
const test = participantSchema.safeParse({
    name: "jaamac",
    age: 15
})
if (!test.success) {
    test.error.issues.forEach(issue => {
        console.log(`${issue.path}: ${issue.message}`);

    })
}
else {
    console.log(test.data);
}


