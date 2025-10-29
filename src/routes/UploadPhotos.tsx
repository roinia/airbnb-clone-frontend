import useHostOnlyPage from "../lib/useHostOnlyPage";
import useProtectedPage from "../lib/useProtectedPage";
import {
  Box,
  Button,
  Container,
  Field,
  FileUpload,
  Float,
  Heading,
  useFileUploadContext,
  VStack,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { LuFileImage, LuX } from "react-icons/lu";
import { useMutation } from "@tanstack/react-query";
import { createPhoto, uploadImage } from "../api";
import { toaster } from "../components/ui/toaster";
import { error } from "console";

interface IForm {
  file: FileList;
}

export default function UploadPhotos() {
  useProtectedPage();
  useHostOnlyPage();

  const { register, watch, handleSubmit, reset } = useForm<IForm>();
  const { roomPk } = useParams();
  const createPhotoMutation = useMutation({
    mutationFn: createPhoto,
    onSuccess: () => {
      toaster.create({
        title: "Image uploaded!",
        description: "Feel free to upload more images.",
        type: "success",
        closable: true,
      });
      reset();
    },
  });
  const uploadImageMutation = useMutation({
    mutationFn: uploadImage,
    onSuccess: ({ url }) => {
      if (roomPk) {
        createPhotoMutation.mutate({
          roomPk,
          file: url,
          description: "Room Photo",
        });
        console.log(url);
      }
    },
  });

  const onSubmit = (data: any) => {
    const files = watch("file");
    if (files && files[0]) {
      uploadImageMutation.mutate(files);
    } else {
      toaster.create({ description: "No file", type: "error", closable: true });
    }
  };

  const FileUploadList = () => {
    const fileUpload = useFileUploadContext();
    const files = fileUpload.acceptedFiles;
    if (files.length === 0) return null;
    return (
      <FileUpload.ItemGroup>
        {files.map((file) => (
          <FileUpload.Item
            w="auto"
            boxSize="20"
            p="2"
            file={file}
            key={file.name}
          >
            <FileUpload.ItemPreviewImage />
            <Float placement="top-end">
              <FileUpload.ItemDeleteTrigger boxSize="4" layerStyle="fill.solid">
                <LuX />
              </FileUpload.ItemDeleteTrigger>
            </Float>
          </FileUpload.Item>
        ))}
      </FileUpload.ItemGroup>
    );
  };

  return (
    <Box pb={40} mt={10} px={{ base: 10, lg: 40 }}>
      <Container>
        <Heading textAlign={"center"}>Upload a Photo</Heading>
        <VStack as={"form"} onSubmit={handleSubmit(onSubmit)} gap={5} mt={10}>
          <Field.Root>
            <FileUpload.Root {...register("file")} accept="image/*">
              <FileUpload.HiddenInput />
              <FileUpload.Trigger asChild>
                <Button variant="outline" size="sm">
                  <LuFileImage /> Upload Images
                </Button>
              </FileUpload.Trigger>
              <FileUploadList />
            </FileUpload.Root>
          </Field.Root>
          <Button
            type="submit"
            loading={
              uploadImageMutation.isPending || createPhotoMutation.isPending
            }
            w="full"
            colorPalette={"red"}
          >
            Upload photos
          </Button>
        </VStack>
      </Container>
    </Box>
  );
}
