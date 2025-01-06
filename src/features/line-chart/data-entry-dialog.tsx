"use client";
import {
  Box,
  Button,
  Checkbox,
  Dialog,
  Flex,
  Grid,
  Tabs,
  Text,
  TextField,
} from "@radix-ui/themes";
import { useEffect, useId, useState } from "react";
import {
  firstStepSchema,
  secondStepSchema,
  thirdStepSchema,
} from "@/validators/line-charts-validators";
import { z } from "zod";
import {
  useForm,
  SubmitHandler,
  useFieldArray,
  Controller,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import generateRandomColor from "@/utils/generateRandomColor";
import SelectComponent from "@/components/ui/select-component";
import { TbTrash } from "react-icons/tb";
import { PiPlus } from "react-icons/pi";
import { v4 as uuidv4 } from "uuid";

type FirstFormType = z.infer<typeof firstStepSchema>;
type SecondStepForm = z.infer<ReturnType<typeof secondStepSchema>>;
type ThirdStepForm = z.infer<ReturnType<typeof thirdStepSchema>>;

const lineTypes = [
  { label: "solid", value: "solid" },
  { label: "dashed", value: "dashed" },
];

const DataEntryDialog = ({
  setDataArray,
}: {
  setDataArray: React.SetStateAction<React.Dispatch<any[]>>;
}) => {
  const formStepEnum = {
    numberOfFields: "Select number of fields",
    nameOfFields: "Enter name for each fields",
    individualData: "Enter individual data",
  };

  const [fieldCount, setFieldCount] = useState<number | null>(null);
  const [secondFormArray, setSecondFormArray] = useState<string[]>([]);

  const [currentTab, setCurrentTab] =
    useState<keyof typeof formStepEnum>("numberOfFields");
  const [isOpen, setIsOpen] = useState(false);

  const secondFormResolverSchema = (length: number) =>
    z.object({
      fields: secondStepSchema(length),
    });

  const thirdFormResolverSchema = (secondArray: string[]) =>
    z.object({
      fields: thirdStepSchema(secondArray),
    });

  const firstForm = useForm<FirstFormType>({
    resolver: zodResolver(firstStepSchema),
    defaultValues: { number_of_fields: 1, show_cartesian_grid: true },
  });

  const secondForm = useForm<{ fields: SecondStepForm }>({
    resolver: fieldCount
      ? zodResolver(secondFormResolverSchema(fieldCount))
      : undefined,
    defaultValues: {
      fields: Array(fieldCount || 0)
        .fill(null)
        .map(() => ({
          name: "",
          color: generateRandomColor(),
          line_type: "solid",
        })),
    },
  });

  const thirdForm = useForm<{ fields: ThirdStepForm }>({
    resolver: zodResolver(thirdFormResolverSchema(secondFormArray)),
  });

  const onSubmitFirstForm: SubmitHandler<FirstFormType> = (
    data: FirstFormType
  ) => {
    setFieldCount(data.number_of_fields);
    setCurrentTab("nameOfFields");
    secondForm.reset();
  };

  const { fields } = useFieldArray({
    control: secondForm.control,
    name: "fields",
  });

  const {
    fields: thirdField,
    append,
    remove,
  } = useFieldArray({
    control: thirdForm.control,
    name: "fields",
  });

  const onSubmitSecondForm = (data: { fields: SecondStepForm }) => {
    setCurrentTab("individualData");
    setSecondFormArray(data.fields.map((item) => item.name));
    thirdForm.reset();
  };

  const onSubmitThirdForm = (data: { fields: ThirdStepForm }) => {
    // console.log(data);
    //@ts-ignore
    setDataArray([data.fields]);
    setIsOpen(false);
  };

  console.log(thirdForm.getValues());

  useEffect(() => {
    if (fieldCount !== null) {
      secondForm.reset({
        fields: Array(fieldCount)
          .fill(null)
          .map(() => ({
            name: "",
            color: generateRandomColor(),
            line_type: "solid",
          })),
      });
    }
  }, [fieldCount, secondForm]);

  useEffect(() => {
    if (secondFormArray.length !== 0) {
      thirdForm.reset({
        fields: [
          {
            name: "",
            ...Object.fromEntries(secondFormArray.map((key) => [key, 0])),
          },
        ],
      });
    }
  }, [secondFormArray, thirdForm]);

  return (
    <>
      <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
        <Dialog.Trigger>
          <Button className="!ml-auto !cursor-pointer">Add data</Button>
        </Dialog.Trigger>

        <Dialog.Content maxWidth="600px">
          <Dialog.Title>Add data</Dialog.Title>
          <Dialog.Description size="2" mb="4">
            {formStepEnum[currentTab] || ""}
          </Dialog.Description>

          <Tabs.Root
            value={currentTab}
            onValueChange={(value) =>
              setCurrentTab(value as keyof typeof formStepEnum)
            }
          >
            <Box pt="0">
              <Tabs.Content value="numberOfFields">
                <form onSubmit={firstForm.handleSubmit(onSubmitFirstForm)}>
                  <Flex direction="column" gap="3">
                    <label>
                      <Text as="div" size="2" mb="1" weight="bold">
                        Number of fields(Same number of lines will be displayed)
                      </Text>
                      <TextField.Root
                        type="number"
                        placeholder="Enter number of values"
                        {...firstForm.register("number_of_fields")}
                      />
                      {firstForm.formState.errors.number_of_fields && (
                        <Text color="red" size="2" mt="1">
                          {firstForm.formState.errors.number_of_fields.message}
                        </Text>
                      )}
                    </label>
                  </Flex>
                  <Flex direction="column" gap="3" mt="5">
                    <Flex gap="3">
                      <Controller
                        name="show_cartesian_grid"
                        control={firstForm.control}
                        render={({ field: { onChange, value } }) => (
                          <Checkbox
                            checked={value}
                            onCheckedChange={(checked) => {
                              onChange(checked === true);
                            }}
                            className="rounded-md p-1 border border-solid border-black dark:border-white"
                          />
                        )}
                      />
                      <Text as="div" size="2" mb="1" weight="bold">
                        Show cartesian grid
                      </Text>
                    </Flex>
                    {firstForm.formState.errors.show_cartesian_grid && (
                      <Text color="red" size="2" mt="1">
                        {firstForm.formState.errors.show_cartesian_grid.message}
                      </Text>
                    )}
                  </Flex>
                  <Flex gap="3" mt="4" justify="end">
                    <Button
                      variant="soft"
                      color="gray"
                      type="button"
                      onClick={() => setIsOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button type="submit">Next</Button>
                  </Flex>
                </form>
              </Tabs.Content>

              <Tabs.Content value="nameOfFields">
                <form onSubmit={secondForm.handleSubmit(onSubmitSecondForm)}>
                  {fields.map((field, index) => (
                    <Flex gap="8" mb="2" key={field.id} align="center">
                      <label>
                        <Text as="div" size="2" mb="1" weight="bold">
                          Field {index + 1}
                        </Text>
                        <TextField.Root
                          {...secondForm.register(`fields.${index}.name`)}
                          placeholder={`Name ${index + 1}`}
                        />
                        {secondForm.formState.errors.fields?.[index]?.name && (
                          <Text color="red" size="2" mt="1">
                            {secondForm.formState.errors.fields[index]?.name
                              ?.message || ""}
                          </Text>
                        )}
                      </label>
                      <Flex direction="column">
                        <label>Line Color</label>
                        <input
                          placeholder="Line Color"
                          type="color"
                          className="w-20 rounded-md p-1 border border-solid border-black dark:border-white"
                          tabIndex={-1}
                          {...secondForm.register(`fields.${index}.color`)}
                        />
                      </Flex>

                      <Controller
                        name={`fields.${index}.line_type`}
                        control={secondForm.control}
                        render={({ field: { onChange, value } }) => (
                          <div
                            onClick={(e) => {
                              e.stopPropagation();
                            }}
                          >
                            <SelectComponent
                              className="w-28"
                              label="Line Type"
                              error={""}
                              size="sm"
                              tabIndex={-1}
                              options={lineTypes}
                              value={lineTypes.find((c) => c.value === value)}
                              onChange={(val) => onChange(val?.value)}
                              defaultValue={lineTypes.find(
                                (c) => c.value === value
                              )}
                            />
                          </div>
                        )}
                      />
                    </Flex>
                  ))}
                  <Flex gap="3" mt="4" justify="between">
                    <Button
                      type="button"
                      onClick={() => {
                        setCurrentTab("numberOfFields");
                      }}
                    >
                      Previous
                    </Button>
                    <Flex gap="3">
                      <Button
                        variant="soft"
                        color="gray"
                        type="button"
                        onClick={() => setIsOpen(false)}
                      >
                        Cancel
                      </Button>
                      <Button type="submit">Next</Button>
                    </Flex>
                  </Flex>
                </form>
              </Tabs.Content>

              <Tabs.Content value="individualData">
                <form onSubmit={thirdForm.handleSubmit(onSubmitThirdForm)}>
                  <Flex align="center" gap="2" mb="2" justify="between">
                    <Text></Text>
                    <Text>Name</Text>
                    {secondFormArray.map((item, index) => (
                      <Text key={index}>{item}</Text>
                    ))}
                    <p></p>
                  </Flex>
                  {thirdField.map((field, index) => {
                    return (
                      <Flex
                        key={index}
                        align="center"
                        gap="2"
                        mb="2"
                        justify="between"
                      >
                        <Button
                          type="button"
                          color="red"
                          onClick={() => remove(index)}
                          className="h-5 !rounded-xl !bg-red-400"
                        >
                          <TbTrash />
                        </Button>
                        <label className="grid-cols-1">
                          <TextField.Root
                            {...thirdForm.register(`fields.${index}.name`)}
                            placeholder={`Name ${index + 1}`}
                          />
                          {thirdForm.formState.errors.fields?.[index]?.name && (
                            <Text color="red" size="2" mt="1">
                              {thirdForm.formState.errors.fields[index]?.name
                                ?.message || ""}
                            </Text>
                          )}
                        </label>

                        {Object.keys(field).map((key) => {
                          if (key === "id" || key === "name") return null;

                          return (
                            <>
                              <Controller
                                name={
                                  `fields.${index}.${key}` as
                                    | "fields"
                                    | `fields.${number}`
                                    | `fields.${number}.name`
                                }
                                control={thirdForm.control}
                                render={({ field: { onChange, value } }) => (
                                  <Flex direction="column">
                                    <TextField.Root
                                      type="number"
                                      placeholder={key}
                                      step="any"
                                      onChange={(e) =>
                                        onChange(
                                          e.target.value
                                            ? Number(e.target.value)
                                            : 0
                                        )
                                      }
                                    />
                                  </Flex>
                                )}
                              />
                              {/* <Flex direction="column">
                                  <TextField.Root
                                    type="number"
                                    placeholder={key}
                                    step="any"
                                    {...thirdForm.register(
                                      `fields.${index}.${key}` as
                                        | "fields"
                                        | `fields.${number}`
                                        | `fields.${number}.name`
                                    )}
                                  />
                                </Flex> */}
                            </>
                          );
                        })}
                      </Flex>
                    );
                  })}
                  <Button
                    type="button"
                    onClick={() =>
                      append({
                        name: "",
                        ...Object.fromEntries(
                          secondFormArray.map((key) => [key, 0])
                        ),
                      })
                    }
                  >
                    <PiPlus />
                  </Button>
                  <Flex gap="3" mt="4" justify="between">
                    <Button
                      type="button"
                      onClick={() => {
                        setCurrentTab("nameOfFields");
                      }}
                    >
                      Previous
                    </Button>
                    <Flex gap="3">
                      <Button
                        variant="soft"
                        color="gray"
                        type="button"
                        onClick={() => setIsOpen(false)}
                      >
                        Cancel
                      </Button>
                      <Button type="submit">Next</Button>
                    </Flex>
                  </Flex>
                </form>
              </Tabs.Content>
            </Box>
          </Tabs.Root>
        </Dialog.Content>
      </Dialog.Root>
    </>
  );
};
export default DataEntryDialog;
