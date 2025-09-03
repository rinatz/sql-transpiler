import { Field, HStack, Skeleton, Textarea } from "@chakra-ui/react";

export type WriteSqlAreaProps = {
  sql: string;
  isLoading: boolean;
} & React.ComponentProps<typeof Field.Root>;

export function WriteSqlArea({ sql, isLoading, ...props }: WriteSqlAreaProps) {
  return (
    <Field.Root gap="1" {...props}>
      {isLoading ? (
        <Skeleton w="100%" h="90%" />
      ) : (
        <Textarea
          autoresize
          rows={10}
          value={sql}
          placeholder="Transpiled query"
          variant="subtle"
          readOnly
          _hover={{ cursor: "default" }}
        />
      )}

      {/* <ReadSqlArea>と高さを揃えるために入れておく */}
      <HStack>
        <Field.ErrorText />
        <Field.HelperText />
      </HStack>
    </Field.Root>
  );
}
