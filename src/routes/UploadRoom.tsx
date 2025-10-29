import useProtectedPage from "../lib/useProtectedPage";
import useHostOnlyPage from "../lib/useHostOnlyPage";
import {
  Box,
  Button,
  Checkbox,
  CheckboxGroup,
  Container,
  Field,
  Fieldset,
  Grid,
  Heading,
  Input,
  InputGroup,
  NativeSelect,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { FaBed, FaToilet } from "react-icons/fa";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getAmenities,
  getCategories,
  IUploadRoomVariables,
  uploadRoom,
} from "../api";
import { IAmenity, ICategory, IRoomDetail } from "@/types";
import { Controller, useForm } from "react-hook-form";
import { toaster } from "../components/ui/toaster";
import { useNavigate } from "react-router-dom";

export default function UploadRoom() {
  useProtectedPage();
  useHostOnlyPage();

  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: uploadRoom,
    onSuccess: (data: IRoomDetail) => {
      toaster.create({
        description: "Room is created",
        type: "success",
      });
      navigate(`/rooms/${data.id}`);
    },
    onError: () => {
      toaster.create({
        description: "Failed",
        type: "error",
      });
    },
  });

  const { data: amenities, isLoading: isAmenitiesLoading } = useQuery<
    IAmenity[]
  >({
    queryKey: ["amenities"],
    queryFn: getAmenities,
  });

  const { data: categories, isLoading: isCategoriesLoading } = useQuery<
    ICategory[]
  >({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  const { register, control, handleSubmit } = useForm<IUploadRoomVariables>({
    defaultValues: {
      pet_friendly: false,
    },
  });

  const onSubmit = (data: IUploadRoomVariables) => {
    console.log(data);
    mutation.mutate(data);
  };

  return (
    <Box pb={40} mt={5} px={{ base: 10, lg: 40 }}>
      <Container>
        <Heading textAlign={"center"}>Upload Room</Heading>
        <VStack gap={5} mt={5} as={"form"} onSubmit={handleSubmit(onSubmit)}>
          <Field.Root required>
            <Field.Label>
              Name
              <Field.RequiredIndicator />
            </Field.Label>
            <Input {...register("name", { required: true })} type="text" />
            <Field.HelperText>Write the name of your room</Field.HelperText>
          </Field.Root>
          <Field.Root required>
            <Field.Label>
              Country
              <Field.RequiredIndicator />
            </Field.Label>
            <Input {...register("country", { required: true })} type="text" />
          </Field.Root>
          <Field.Root required>
            <Field.Label>
              City
              <Field.RequiredIndicator />
            </Field.Label>
            <Input {...register("city", { required: true })} type="text" />
          </Field.Root>
          <Field.Root required>
            <Field.Label>
              Address
              <Field.RequiredIndicator />
            </Field.Label>
            <Input {...register("address", { required: true })} type="text" />
          </Field.Root>
          <Field.Root required>
            <Field.Label>
              Price
              <Field.RequiredIndicator />
            </Field.Label>
            <InputGroup startAddon="$" endAddon="USD">
              <Input
                {...register("price", { required: true })}
                type="number"
                min={0}
              />
            </InputGroup>
          </Field.Root>
          <Field.Root required>
            <Field.Label>
              Rooms
              <Field.RequiredIndicator />
            </Field.Label>
            <InputGroup startElement={<FaBed />}>
              <Input
                {...register("rooms", { required: true })}
                type="number"
                min={0}
              />
            </InputGroup>
          </Field.Root>
          <Field.Root required>
            <Field.Label>
              Toilets
              <Field.RequiredIndicator />
            </Field.Label>
            <InputGroup startElement={<FaToilet />}>
              <Input
                {...register("toilets", { required: true })}
                type="number"
                min={0}
              />
            </InputGroup>
          </Field.Root>
          <Field.Root required>
            <Field.Label>
              Description
              <Field.RequiredIndicator />
            </Field.Label>
            <Textarea {...register("description", { required: true })} />
          </Field.Root>
          <Controller
            name="pet_friendly"
            control={control}
            render={({ field }) => (
              <Field.Root>
                <Checkbox.Root checked={field.value} onChange={field.onChange}>
                  <Checkbox.HiddenInput />
                  <Checkbox.Control />
                  <Checkbox.Label>Pet friendly?</Checkbox.Label>
                </Checkbox.Root>
              </Field.Root>
            )}
          />
          <Controller
            name="kind"
            control={control}
            render={({ field }) => (
              <Field.Root required>
                <Field.Label>
                  Kind of room
                  <Field.RequiredIndicator />
                </Field.Label>
                <NativeSelect.Root onChange={field.onChange}>
                  <NativeSelect.Field placeholder="Select a kind">
                    <option value="enter_place">Entire Place</option>
                    <option value="private_room">Private Room</option>
                    <option value="shared_room">Shared Room</option>
                  </NativeSelect.Field>
                  <NativeSelect.Indicator />
                </NativeSelect.Root>
                <Field.HelperText>
                  What kind of room are you renting?
                </Field.HelperText>
              </Field.Root>
            )}
          />
          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <Field.Root required>
                <Field.Label>
                  Category of room
                  <Field.RequiredIndicator />
                </Field.Label>
                <NativeSelect.Root onChange={field.onChange}>
                  <NativeSelect.Field placeholder="Select a category">
                    {categories?.map((category) => (
                      <option key={category.pk} value={category.pk}>
                        {category.name}
                      </option>
                    ))}
                  </NativeSelect.Field>
                  <NativeSelect.Indicator />
                </NativeSelect.Root>
                <Field.HelperText>
                  What category describes your room?
                </Field.HelperText>
              </Field.Root>
            )}
          />
          <Fieldset.Root>
            <Fieldset.Legend>Amenities</Fieldset.Legend>
            <CheckboxGroup>
              <Fieldset.Content>
                <Grid templateColumns={"1fr 1fr"} w={"100%"} gap={5}>
                  {amenities?.map((amenity) => (
                    <Field.Root key={amenity.pk}>
                      <Box>
                        <Checkbox.Root
                          {...register("amenities", { required: true })}
                          value={amenity.pk.toString()}
                        >
                          <Checkbox.HiddenInput />
                          <Checkbox.Control />
                          <Checkbox.Label>{amenity.name}</Checkbox.Label>
                        </Checkbox.Root>
                      </Box>
                      <Field.HelperText>{amenity.description}</Field.HelperText>
                    </Field.Root>
                  ))}
                </Grid>
              </Fieldset.Content>
            </CheckboxGroup>
          </Fieldset.Root>
          {mutation.isError ? (
            <Text color={"red.500"}>{mutation.error.message}</Text>
          ) : null}
          <Button
            loading={mutation.isPending}
            type="submit"
            colorPalette={"red"}
            size={"lg"}
            w={"100%"}
            mt={10}
          >
            Upload Room
          </Button>
        </VStack>
      </Container>
    </Box>
  );
}
