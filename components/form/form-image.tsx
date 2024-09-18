import { FileInput, Stack } from '@mantine/core';
import CoverImage from '../ui/cover-image';
import { UseFormReturnType } from '@mantine/form';

export default function FormImage({ form }: { form: UseFormReturnType<any> }) {
  const handleUpload = async (file: File | null) => {
    if (!file) {
      //if image file is already present it doesn't change
      form.setFieldValue('image_url', '');
      return;
    }

    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch(`http://localhost:3001/uploads`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw response;

      const data = await response.json();

      console.log(data);
      form.setFieldValue('image_url', data.file.filename);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Stack>
      <CoverImage
        src={`http://localhost:3001/uploads/${form.getValues().image_url}`}
      />
      <FileInput
        onChange={handleUpload}
        label="Upload portrait"
        placeholder=".jpg/.png"
      />
    </Stack>
  );
}
