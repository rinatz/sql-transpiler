import { Textarea } from "@chakra-ui/react";

export type WriteSqlAreaProps = {
  sql: string;
};

export function WriteSqlArea({ sql }: WriteSqlAreaProps) {
  return (
    <Textarea
      autoresize
      rows={10}
      value={sql}
      placeholder="Transpiled query"
      variant="subtle"
      readOnly
      _hover={{ cursor: "default" }}
    />
  );
}
