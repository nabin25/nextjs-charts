"use client";
import {
  Box,
  Button,
  Checkbox,
  Dialog,
  Flex,
  Tabs,
  Text,
  TextField,
} from "@radix-ui/themes";
import { useEffect, useState } from "react";
import {
  firstStepSchema,
  secondStepSchema,
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

type FirstFormType = z.infer<typeof firstStepSchema>;
type SecondStepForm = z.infer<ReturnType<typeof secondStepSchema>>;

const lineTypes = [
  { label: "solid", value: "solid" },
  { label: "dashed", value: "dashed" },
];

const DataEntryDialog = () => {
  const formStepEnum = {
    numberOfFields: "Select number of fields",
    nameOfFields: "Enter name for each fields",
    individualData: "Enter individual data",
  };

  const [fieldCount, setFieldCount] = useState<number | null>(null);

  const [currentTab, setCurrentTab] =
    useState<keyof typeof formStepEnum>("numberOfFields");
  const [isOpen, setIsOpen] = useState(false);

  const secondFormResolverSchema = (length: number) =>
    z.object({
      fields: secondStepSchema(length),
    });

  const firstForm = useForm<FirstFormType>({
    resolver: zodResolver(firstStepSchema),
    defaultValues: { number_of_fields: 1, show_cartesian_grid: true },
  });

  const onSubmitFirstForm: SubmitHandler<FirstFormType> = (
    data: FirstFormType
  ) => {
    setFieldCount(data.number_of_fields);
    setCurrentTab("nameOfFields");
    secondForm.reset();
  };

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

  const { fields, append, remove } = useFieldArray({
    control: secondForm.control,
    name: "fields",
  });

  const onSubmitSecondForm = (data: { fields: SecondStepForm }) => {
    setCurrentTab("individualData");
  };

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

  console.log(firstForm.getValues());

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
            </Box>
          </Tabs.Root>
        </Dialog.Content>
      </Dialog.Root>
    </>
  );
};
export default DataEntryDialog;
