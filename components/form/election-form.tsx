'use client';

import {
  Group,
  Stack,
  TextInput,
  Button,
  NativeSelect,
  NumberInput,
  SimpleGrid,
} from '@mantine/core';
import FormImage from './form-image';
import { z } from 'zod';
import { useForm, zodResolver } from '@mantine/form';
import { useRouter } from 'next/navigation';
import { electionSchema } from '@/schema/election';
import CoverImage from '../ui/cover-image';
import { UPLOADS_PATH } from '@/constants/api';

export default function ElectionForm({
  initialValues,
  action,
}: {
  initialValues: z.infer<typeof electionSchema>;
  action: (data: z.infer<typeof electionSchema>) => Promise<{ error: any }>;
}) {
  const router = useRouter();

  const form = useForm<z.infer<typeof electionSchema>>({
    mode: 'uncontrolled',
    initialValues: initialValues,
    validate: zodResolver(electionSchema),
  });

  const handleSubmit = async (data: typeof form.values) => {
    console.log(await action(data));
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack align="center" gap="xl">
        <FormImage form={form} fieldName="flag_url" label="Upload country flag">
          <CoverImage
            h="8rem"
            w="12rem"
            src={`${UPLOADS_PATH}/${form.getValues().flag_url}`}
            alt="Country flag"
          />
        </FormImage>
        <SimpleGrid w="100%" cols={2}>
          <NativeSelect
            withAsterisk
            label="Election type"
            data={['presidential', 'general']}
            key={form.key('type')}
            {...form.getInputProps('type')}
          />
          <TextInput
            label="Name"
            withAsterisk
            key={form.key('name')}
            {...form.getInputProps('name')}
          />
          <TextInput
            label="Country"
            withAsterisk
            description="The country where the elections take place"
            key={form.key('country')}
            {...form.getInputProps('country')}
          />
          <TextInput
            label="Date"
            description="Has to be in the format 'DAY MONTH YEAR'"
            key={form.key('date')}
            {...form.getInputProps('date')}
          />

          <NumberInput
            label="Electorate"
            withAsterisk
            description="The number of potential voters"
            thousandSeparator=","
            clampBehavior="strict"
            min={1}
            key={form.key('electorate')}
            {...form.getInputProps('electorate')}
          />
          <NumberInput
            label="Turnout"
            description="The % of people that actually voted"
            clampBehavior="strict"
            decimalScale={2}
            suffix="%"
            min={0}
            max={100}
            key={form.key('turnout')}
            {...form.getInputProps('turnout')}
          />
        </SimpleGrid>
      </Stack>
      <Group mt="xl" justify="space-between">
        <Button onClick={() => router.back()} variant="outline" size="md">
          Cancel
        </Button>
        <Button type="submit" size="md">
          Save election
        </Button>
      </Group>
    </form>
  );
}
