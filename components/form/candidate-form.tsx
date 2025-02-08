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
  Flex,
} from '@mantine/core';
import FormImage from './form-image';
import { candidateSchema } from '@/schema/candidate';
import { candidateScoreEmojis, candidateScoreNames } from '@/lang/constants';
import { useForm, zodResolver } from '@mantine/form';
import { useRouter } from 'next/navigation';
import CoverImage from '../ui/cover-image';
import { UPLOADS_PATH } from '@/constants/api';
import { Candidate } from '@/types/schema-to-types';
import { toast } from 'react-toastify';

export default function CandidateForm({
  initialValues,
  action,
}: {
  initialValues: Candidate;
  action: (
    data: Candidate,
  ) => Promise<{ message: string; error: boolean; redirect: boolean }>;
}) {
  const router = useRouter();

  const form = useForm<Candidate>({
    mode: 'uncontrolled',
    initialValues: initialValues,
    validate: zodResolver(candidateSchema),
  });

  //make this and delete a utility function
  const handleSubmit = async (data: typeof form.values) => {
    try {
      const result = await action(data);

      if (result.error) {
        toast.error(result.message);

        return;
      }

      toast.success(result.message);

      if (result.redirect) {
        router.push('/candidates');
      }
    } catch (error) {
      console.error(error);

      toast.error("Couldn't connect to the server");
    }
  };

  return (
    <Box p={{ base: '5rem 1rem 2rem', xs: '3.5rem 2rem 2rem' }} c="black">
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Flex
          gap="xl"
          mb="2rem"
          direction={{ base: 'column', sm: 'row' }}
          align="center"
        >
          <FormImage
            w="min(calc(0.75 * 18rem), 100%)"
            form={form}
            fieldName="image_url"
            key={form.key('image_url')}
            label="Upload portrait"
          >
            <Paper
              pos="relative"
              h="18rem"
              bg="white"
              style={{
                clipPath: 'inset(0 round 1rem)',
              }}
            >
              <CoverImage
                src={`${UPLOADS_PATH}/${form.getValues().image_url}`}
                alt="Candidate portrait"
              />
            </Paper>
          </FormImage>
          <Stack flex={1} w="100%">
            <Stack
              gap={0}
              h={{ base: 'auto', xs: '18rem' }}
              justify="space-between"
            >
              <TextInput
                size="md"
                label="Name"
                description="Candidate's name or party's name"
                withAsterisk
                key={form.key('name')}
                {...form.getInputProps('name')}
              />
              <Flex
                my={{ base: 'md', xs: 0 }}
                gap="md"
                wrap="nowrap"
                align={{ base: 'normal', xss: 'start' }}
                direction={{ base: 'column', xss: 'row' }}
              >
                <ColorInput
                  flex="100%"
                  size="md"
                  label="Campaign color"
                  withAsterisk
                  key={form.key('color')}
                  {...form.getInputProps('color')}
                />
                <TextInput
                  flex="100%"
                  size="md"
                  label="Origin"
                  key={form.key('origin')}
                  {...form.getInputProps('origin')}
                />
              </Flex>
              <TextInput
                size="md"
                label="Political party"
                description="Leave empty for general elections and use the name field instead"
                key={form.key('party')}
                {...form.getInputProps('party')}
              />
            </Stack>
            <TextInput
              size="md"
              label="Running mate"
              key={form.key('running_mate')}
              {...form.getInputProps('running_mate')}
            />
          </Stack>
        </Flex>
        <Fieldset
          variant="unstyled"
          legend="Candidate score"
          display="flex"
          style={{
            flexDirection: 'column',
            gap: '1.4rem',
          }}
        >
          {Object.entries(candidateScoreNames).map((entry) => {
            const [label, value] = entry;

            return (
              <Stack key={label} gap={0}>
                <Group gap="0.6rem" mb="0.4rem">
                  <Text>{candidateScoreEmojis[label]}</Text>
                  <Text fw={600}>{value}</Text>
                </Group>
                <Slider
                  size="lg"
                  step={0.01}
                  max={1}
                  key={form.key('score.' + label)}
                  {...form.getInputProps('score.' + label)}
                />
              </Stack>
            );
          })}
        </Fieldset>
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
