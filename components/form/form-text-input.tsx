import { TextInput, TextInputProps } from '@mantine/core';
import styles from './form-text-input.module.css';

export default function FormTextInput(props: TextInputProps) {
  return <TextInput classNames={{ ...styles }} {...props} />;
}
