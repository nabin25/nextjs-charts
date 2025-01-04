"use client";
import {
  Box,
  Button,
  Dialog,
  Flex,
  Tabs,
  Text,
  TextField,
} from "@radix-ui/themes";
import { useState } from "react";
import { FirstStepSchema } from "@/validators/line-charts-validators";
import { z } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";

type firstFormType = z.infer<typeof FirstStepSchema>;

const DataEntryDialog = () => {
  const formStepArray = [
    { name: "numberOfFields", desc: "Select number of fields" },
    { name: "nameOfFields", desc: "Enter name for each fields" },
    { name: "individualData", desc: "Enter individual data" },
  ];
  const [currentTab, setCurrentTab] = useState("numberOfFields");
  const firstForm = useForm<firstFormType>();
  const onSubmitFirstForm: SubmitHandler<firstFormType> = (
    data: firstFormType
  ) => {
    const currentStep = formStepArray.findIndex(
      (step) => step.name === currentTab
    );
    if (currentStep < formStepArray.length) {
    } else {
      setCurrentTab(formStepArray[currentStep].name);
    }
  };

  return (
    <>
      <Dialog.Root>
        <Dialog.Trigger>
          <Button className="!ml-auto">Add data</Button>
        </Dialog.Trigger>

        <Dialog.Content maxWidth="600px">
          <Dialog.Title>Add data</Dialog.Title>
          <Dialog.Description size="2" mb="4">
            {formStepArray.find((step) => step.name === currentTab)?.desc}
          </Dialog.Description>

          <Tabs.Root value={currentTab} onValueChange={setCurrentTab}>
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
                        defaultValue="1"
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
                    <Dialog.Close>
                      <Button variant="soft" color="gray" type="button">
                        Cancel
                      </Button>
                    </Dialog.Close>
                    <Button type="submit">Next</Button>
                  </Flex>
                </form>
              </Tabs.Content>

              <Tabs.Content value="nameOfFields">
                <Text size="2">Access and update your documents.</Text>
              </Tabs.Content>

              <Tabs.Content value="individualData">
                <Text size="2">
                  Edit your profile or update contact information.
                </Text>
              </Tabs.Content>
            </Box>
          </Tabs.Root>
        </Dialog.Content>
      </Dialog.Root>
    </>
  );
};
export default DataEntryDialog;
