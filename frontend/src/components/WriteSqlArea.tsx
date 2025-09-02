import { Textarea, VStack } from "@chakra-ui/react";
import { DialectListbox } from "@/components/DialectListbox";

export type WriteSqlAreaProps = {
  dialect: string;
  sql: string;
  onDialectChange: (value: string) => void;
};

export function WriteSqlArea({
  dialect,
  sql,
  onDialectChange,
}: WriteSqlAreaProps) {
  return (
    <VStack flexBasis="50%" gap="4">
      <DialectListbox
        name="write"
        defaultValue={dialect}
        onValueChange={onDialectChange}
      />

      <Textarea
        name="write"
        autoresize
        rows={10}
        value={sql}
        placeholder="Transpiled query"
        variant="subtle"
        readOnly
        _hover={{ cursor: "default" }}
      />
    </VStack>
  );
}
