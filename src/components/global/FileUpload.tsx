import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { faFile } from "@fortawesome/pro-solid-svg-icons";
import { useRef } from "react";
import { useController } from "react-hook-form";
import Icon from "./Icon";

type InputFileProps = {
  name: string;
  placeholder: string;
  acceptedFileTypes?: string;
  control: any;
  children: React.ReactNode;
  isRequired?: boolean;
};

export const FileUpload = ({
  name,
  placeholder,
  acceptedFileTypes = "",
  control,
  children,
  isRequired = false,
}: InputFileProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const {
    field: { ref, onChange, value, ...inputProps },
    fieldState: { invalid, isTouched, isDirty },
  } = useController({
    name,
    control,
    rules: { required: isRequired },
  });

  return (
    <FormControl isInvalid={invalid} isRequired>
      <FormLabel htmlFor="writeUpFile">{children}</FormLabel>
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <Icon icon={faFile} />
        </InputLeftElement>
        <input
          type="file"
          onChange={(e) => onChange(e.target.files ? e.target.files[0] : null)}
          accept={acceptedFileTypes}
          {...inputProps}
          name={name}
          ref={inputRef}
          style={{ display: "none" }}
        />
        <Input
          placeholder={placeholder || "Your file ..."}
          onClick={() => inputRef.current && inputRef.current.click()}
          readOnly={true}
          value={(value && value.name) || ""}
        />
      </InputGroup>
      <FormErrorMessage>{invalid}</FormErrorMessage>
    </FormControl>
  );
};

export default FileUpload;
