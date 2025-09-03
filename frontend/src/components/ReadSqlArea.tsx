import { useCallback } from "react";
import { Box, Field, HStack, Textarea } from "@chakra-ui/react";

const maxTextLength = 5000;

function getTextLength(text: string): number {
  const segmenter = new Intl.Segmenter("ja", { granularity: "grapheme" });
  return [...segmenter.segment(text)].length;
}

export type ReadSqlAreaProps = {
  sql: string;
  error: string;
  onSqlChange: (value: string) => void;
} & React.ComponentProps<typeof Field.Root>;

export function ReadSqlArea({
  sql,
  error,
  onSqlChange,
  ...props
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
    <Field.Root invalid={!!error} gap="1" {...props}>
      <Textarea
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
  );
}
