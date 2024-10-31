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
} from '@mantine/core';
import { Fragment } from 'react';
import FormImage from './form-image';
import { candidateSchema } from '@/schema/candidate';
import { candidateScoreNames } from '@/lang/constants';
import { z } from 'zod';
import { useForm, zodResolver } from '@mantine/form';
import { useRouter } from 'next/navigation';
import CoverImage from '../ui/cover-image';
import { UPLOADS_PATH } from '@/constants/api';

export default function CandidateForm({
  initialValues,
  action,
}: {
  initialValues: z.infer<typeof candidateSchema>;
  action: (data: z.infer<typeof candidateSchema>) => Promise<{ error: any }>;
}) {
  const router = useRouter();

  const form = useForm<z.infer<typeof candidateSchema>>({
    mode: 'uncontrolled',
    initialValues: initialValues,
    validate: zodResolver(candidateSchema),
  });

  const handleSubmit = async (data: typeof form.values) => {
    console.log(await action(data));
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Group align="flex-start" gap="xl">
        <FormImage
          w="12rem"
          form={form}
          fieldName="image_url"
          label="Upload portrait"
        >
          <CoverImage
            src={`${UPLOADS_PATH}/${form.getValues().image_url}`}
            w="12rem"
            h="16rem"
            alt="Candidate portrait"
          />
        </FormImage>
        <Stack flex={1}>
          <TextInput
            label="Name"
            description="Candidate's name (presidential elections) or party's name (general)"
            withAsterisk
            key={form.key('name')}
            {...form.getInputProps('name')}
          />
          <ColorInput
            label="Campaign color"
            withAsterisk
            key={form.key('color')}
            {...form.getInputProps('color')}
          />
          <TextInput
            label="Origin"
            key={form.key('origin')}
            {...form.getInputProps('origin')}
          />
          <TextInput
            label="Running mate"
            key={form.key('running_mate')}
            {...form.getInputProps('running_mate')}
          />
          <TextInput
            label="Political party"
            description="Leave empty for general elections and use the name field instead"
            key={form.key('party')}
            {...form.getInputProps('party')}
          />
          <Fieldset legend="Candidate score">
            {Object.entries(candidateScoreNames).map((name, index) => (
              <Fragment key={index}>
                <Text mt={index === 0 ? '' : 'md'}>{name[1]}</Text>
                <Slider
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
  );
}
