import { UPLOADS_PATH } from '@/constants/api';
import { FileInput, Stack, StackProps } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
import { ReactNode } from 'react';

export default function FormImage({
  form,
  label,
  fieldName,
  children,
  ...others
}: {
  form: UseFormReturnType<any>;
  label: string;
  fieldName: string;
  children: ReactNode;
} & StackProps) {
  const handleUpload = async (file: File | null) => {
    if (!file) {
      return;
    }

    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch(UPLOADS_PATH, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw response;

      const data = await response.json();

      console.log(data);
      form.setFieldValue(fieldName, data.file.filename);
    } catch (error) {
      //TODO: handle error
      throw error;
    }
  };

  return (
    <Stack {...others}>
      {children}
      <FileInput
        size="md"
        accept="image/png,image/jpeg"
        label={label}
        onChange={handleUpload}
        placeholder=".jpg/.png"
      />
    </Stack>
  );
}
