import { Field, HStack, Skeleton, Textarea } from "@chakra-ui/react";

export type WriteSqlAreaProps = {
  sql: string;
  loading: boolean;
} & React.ComponentProps<typeof Field.Root>;

export function WriteSqlArea({ sql, loading, ...props }: WriteSqlAreaProps) {
  return (
    <Field.Root gap="1" {...props}>
      <Skeleton loading={loading} w="100%">
        <Textarea
          w="100%"
          autoresize
          rows={10}
          value={sql}
          placeholder="Transpiled query"
          variant="subtle"
          readOnly
          _hover={{ cursor: "default" }}
        />
      </Skeleton>

      {/* <ReadSqlArea>と高さを揃えるために入れておく */}
      <HStack>
        <Field.ErrorText />
        <Field.HelperText />
      </HStack>
    </Field.Root>
  );
}
