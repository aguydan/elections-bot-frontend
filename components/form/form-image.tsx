import { UPLOADS_PATH } from '@/constants/api';
import { safeFetch } from '@/lib/fetch-utils';
import { FileInput, Stack, StackProps } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
import { ReactNode } from 'react';
import { toast } from 'react-toastify';

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
  const handleUpload = async (file: File) => {
    const formData = new FormData();
    formData.append('image', file);

    const result = await safeFetch<{ file: { filename: string } }>(
      UPLOADS_PATH,
      {
        method: 'POST',
        body: formData,
      },
    );

    if (!result.data) {
      console.error(result.error);

      throw new Error('Upload failed');
    }

    form.setFieldValue(fieldName, result.data.file.filename);

    return { message: 'File was successfully uploaded' };
  };

  const handleChange = (file: File | null) => {
    if (!file) {
      return;
    }

    //write a wrapper for this thing
    toast.promise(handleUpload(file), {
      pending: 'Uploading the file...',
      success: {
        render({ data }) {
          return data.message;
        },
      },

      error: {
        render({ data }) {
          return data.message;
        },
      },
    });
  };

  return (
    <Stack {...others}>
      {children}
      <FileInput
        size="md"
        accept="image/png,image/jpeg"
        label={label}
        onChange={handleChange}
        placeholder=".jpg/.png"
      />
    </Stack>
  );
}
