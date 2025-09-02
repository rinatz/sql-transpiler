import { Box, Field, HStack, Textarea, VStack } from "@chakra-ui/react";
import { DialectListbox } from "@/components/DialectListbox";
import { useCallback } from "react";

const maxTextLength = 5000;

function getTextLength(text: string): number {
  const segmenter = new Intl.Segmenter("ja", { granularity: "grapheme" });
  return [...segmenter.segment(text)].length;
}

export type ReadSqlAreaProps = {
  dialect: string;
  sql: string;
  error: string;
  onDialectChange: (value: string) => void;
  onSqlChange: (value: string) => void;
};

export function ReadSqlArea({
  dialect,
  sql,
  error,
  onDialectChange,
  onSqlChange,
}: ReadSqlAreaProps) {
  const onSqlChangeFn = useCallback(
    (value: string) => {
      const handler = setTimeout(() => {
        onSqlChange(value);
      }, 300);

      return () => clearTimeout(handler);
    },
    [onSqlChange]
  );

  return (
    <VStack flexBasis="50%" gap="4">
      <DialectListbox
        name="read"
        defaultValue={dialect}
        onValueChange={onDialectChange}
      />

      <Field.Root invalid={!!error} gap="1">
        <Textarea
          name="read"
          autoresize
          rows={10}
          onChange={(e) => onSqlChangeFn(e.target.value)}
        />
        <HStack justify="space-between" width="100%">
          <Field.ErrorText>{error}</Field.ErrorText>
          <Box>
            {/* ErrorText が表示されていないときに HelperText が左寄せにならないようにするための空要素 */}
          </Box>
          <Field.HelperText>
            {getTextLength(sql)}/{maxTextLength}
          </Field.HelperText>
        </HStack>
      </Field.Root>
    </VStack>
  );
}
