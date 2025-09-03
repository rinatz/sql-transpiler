import { Field, HStack, Textarea } from "@chakra-ui/react";

export type WriteSqlAreaProps = {
  sql: string;
} & React.ComponentProps<typeof Field.Root>;

export function WriteSqlArea({ sql, ...props }: WriteSqlAreaProps) {
  return (
    <Field.Root gap="1" {...props}>
      <Textarea
        autoresize
        rows={10}
        value={sql}
        placeholder="Transpiled query"
        variant="subtle"
        readOnly
        _hover={{ cursor: "default" }}
      />

      {/* <ReadSqlArea>と高さを揃えるために入れておく */}
      <HStack>
        <Field.ErrorText />
        <Field.HelperText />
      </HStack>
    </Field.Root>
  );
}
