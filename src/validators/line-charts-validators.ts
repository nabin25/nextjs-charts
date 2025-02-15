import { z } from "zod";

const firstStepSchema = z.object({
  number_of_fields: z.coerce
    .number({ message: "Only numbers are allowed" })
    .int()
    .positive({ message: "Enter positive value" })
    .lte(5, { message: "Value must be less than or equal to 5" }),
  show_cartesian_grid: z.boolean(),
});

const secondStepSchema = (length: number) =>
  z
    .array(
      z.object({
        name: z
          .string()
          .min(1, { message: "Field name is required" })
          .max(8, { message: "Cannot exceed 8 chars" })
          .refine((value) => value.toLowerCase() !== "name", {
            message: `"name" is reserved word`,
          }),
        color: z.string(),
        line_type: z.string().min(1, { message: "Select type" }),
      })
    )
    .length(length, { message: `Exactly ${length} fields are required` })
    .refine(
      (items) =>
        new Set(items.map((item) => item.name.toLowerCase())).size ===
        items.length,
      { message: "Field names must be unique", path: [] }
    );

export default secondStepSchema;

const thirdStepSchema = (keyArray: string[]) =>
  z.array(
    z.object({
      name: z.string().optional(),
      ...Object.fromEntries(keyArray.map((key) => [key, z.number()])),
    })
  );

export { firstStepSchema, secondStepSchema, thirdStepSchema };
