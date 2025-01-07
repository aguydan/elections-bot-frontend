'use client';

import {
  Group,
  Stack,
  TextInput,
  Text,
  ColorInput,
  Fieldset,
  Slider,
  Button,
  Box,
  Paper,
} from '@mantine/core';
import { Fragment } from 'react';
import FormImage from './form-image';
import { candidateSchema } from '@/schema/candidate';
import { candidateScoreNames } from '@/lang/constants';
import { useForm, zodResolver } from '@mantine/form';
import { useRouter } from 'next/navigation';
import CoverImage from '../ui/cover-image';
import { UPLOADS_PATH } from '@/constants/api';
import { Candidate } from '@/types/schema-to-types';

export default function CandidateForm({
  initialValues,
  action,
}: {
  initialValues: Candidate;
  action: (data: Candidate) => Promise<{ error: any }>;
}) {
  const router = useRouter();

  const form = useForm<Candidate>({
    mode: 'uncontrolled',
    initialValues: initialValues,
    validate: zodResolver(candidateSchema),
  });

  const handleSubmit = async (data: typeof form.values) => {
    console.log(await action(data));
  };

  return (
    <Box p={{ base: '4rem 2rem 0', xs: '3.5rem 2rem 0' }} c="black">
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Group align="start" gap="xl">
          <FormImage
            w="min(calc(0.75 * 18rem), 100%)"
            form={form}
            fieldName="image_url"
            key={form.key('image_url')}
            label="Upload portrait"
          >
            <Paper pos="relative" h="18rem" radius="lg" bg="white">
              <CoverImage
                radius="lg"
                src={`${UPLOADS_PATH}/${form.getValues().image_url}`}
                alt="Candidate portrait"
              />
            </Paper>
          </FormImage>
          <Stack flex={1}>
            <TextInput
              size="md"
              label="Name"
              description="Candidate's name (presidential elections) or party's name (general)"
              withAsterisk
              key={form.key('name')}
              {...form.getInputProps('name')}
            />
            <ColorInput
              size="md"
              label="Campaign color"
              withAsterisk
              key={form.key('color')}
              {...form.getInputProps('color')}
            />
            <TextInput
              size="md"
              label="Origin"
              key={form.key('origin')}
              {...form.getInputProps('origin')}
            />
            <TextInput
              size="md"
              label="Running mate"
              key={form.key('running_mate')}
              {...form.getInputProps('running_mate')}
            />
            <TextInput
              size="md"
              label="Political party"
              description="Leave empty for general elections and use the name field instead"
              key={form.key('party')}
              {...form.getInputProps('party')}
            />
            <Fieldset legend="Candidate score">
              {Object.entries(candidateScoreNames).map((name, index) => (
                <Fragment key={name[0]}>
                  <Text mt={index === 0 ? 0 : 'md'}>{name[1]}</Text>
                  <Slider
                    size="lg"
                    step={0.01}
                    max={1}
                    key={form.key('score.' + name[0])}
                    {...form.getInputProps('score.' + name[0])}
                  />
                </Fragment>
              ))}
            </Fieldset>
          </Stack>
        </Group>
        <Group mt="xl" justify="space-between">
          <Button onClick={() => router.back()} variant="outline" size="md">
            Cancel
          </Button>
          <Button type="submit" size="md">
            Save candidate
          </Button>
        </Group>
      </form>
    </Box>
  );
}
