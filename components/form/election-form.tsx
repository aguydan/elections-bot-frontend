'use client';

import {
  Group,
  Stack,
  TextInput,
  Button,
  NativeSelect,
  NumberInput,
  SimpleGrid,
  Paper,
  Box,
} from '@mantine/core';
import FormImage from './form-image';
import { useForm, zodResolver } from '@mantine/form';
import { useRouter } from 'next/navigation';
import { electionSchema } from '@/schema/election';
import CoverImage from '../ui/cover-image';
import { UPLOADS_PATH } from '@/constants/api';
import { Election } from '@/types/schema-to-types';

export default function ElectionForm({
  initialValues,
  action,
}: {
  initialValues: Election;
  action: (
    data: Election,
  ) => Promise<{ message: string; error: boolean } | void>;
}) {
  const router = useRouter();

  const form = useForm<Election>({
    mode: 'uncontrolled',
    initialValues: initialValues,
    validate: zodResolver(electionSchema),
  });

  const handleSubmit = async (data: typeof form.values) => {
    console.log(await action(data));
  };

  return (
    <Box p={{ base: '5rem 1rem 2rem', xs: '3.5rem 2rem 2rem' }} c="black">
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack align="center" gap="xl" c="black">
          <FormImage
            form={form}
            fieldName="flag_url"
            w="14rem"
            label="Upload country flag"
          >
            <Paper
              pos="relative"
              h="calc(14rem * (2/3))"
              radius="lg"
              bg="white"
              style={{
                clipPath: 'inset(0 round 1rem)',
              }}
            >
              <CoverImage
                src={`${UPLOADS_PATH}/${form.getValues().flag_url}`}
                alt="Country flag"
              />
            </Paper>
          </FormImage>
          <SimpleGrid w="100%" cols={{ base: 1, xs: 2 }}>
            <NativeSelect
              size="md"
              withAsterisk
              label="Election type"
              data={['presidential', 'general']}
              key={form.key('type')}
              {...form.getInputProps('type')}
            />
            <TextInput
              size="md"
              label="Name"
              withAsterisk
              key={form.key('name')}
              {...form.getInputProps('name')}
            />
            <TextInput
              size="md"
              label="Country"
              withAsterisk
              description="The country where the elections take place"
              key={form.key('country')}
              {...form.getInputProps('country')}
            />
            <TextInput
              size="md"
              label="Date"
              description="Has to be in the format 'DAY MONTH YEAR'"
              key={form.key('date')}
              {...form.getInputProps('date')}
            />

            <NumberInput
              size="md"
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
              size="md"
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
        <Group pos="absolute" right="2rem" top="1rem">
          <Button
            onClick={() => router.back()}
            radius="md"
            c="black"
            color="black"
            variant="subtle"
          >
            Cancel
          </Button>
          <Button type="submit" radius="md" variant="white" c="black">
            Save
          </Button>
        </Group>
      </form>
    </Box>
  );
}
