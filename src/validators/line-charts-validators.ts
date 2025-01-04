import { z } from "zod";

const FirstStepSchema = z.object({
  number_of_fields: z
    .number()
    .positive({ message: "Enter positive value" })
    .lte(5, { message: "Value must be less than or equal to 5" }),
});
export { FirstStepSchema };
