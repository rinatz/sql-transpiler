import { Box, Flex, Heading, HStack, Separator } from "@chakra-ui/react";
import { ColorModeButton } from "@/components/ui/color-mode";
import { useSqlTranspiler } from "@/hooks/useSqlTranspiler";
import { ReadSqlArea } from "./components/ReadSqlArea";
import { WriteSqlArea } from "./components/WriteSqlArea";
import { dialects } from "./constants/dialects";

export function App() {
  const { sql, setSql, read, setRead, write, setWrite, transpiledSql, error } =
    useSqlTranspiler({
      defaultRead: dialects.MySQL,
      defaultWrite: dialects.PostgreSQL,
    });

  return (
    <>
      <HStack justify="space-between" py="4" px="8">
        <Heading size="2xl" pb="1">
          SQL Transpiler
        </Heading>
        <ColorModeButton />
      </HStack>

      <Separator variant="solid" mb="8" />

      <Box p="4" maxW="1200px" mx="auto">
        <Flex gap="16" justify="space-around">
          <ReadSqlArea
            dialect={read}
            sql={sql}
            error={error}
            onDialectChange={setRead}
            onSqlChange={setSql}
          />
          <WriteSqlArea
            dialect={write}
            sql={transpiledSql}
            onDialectChange={setWrite}
          />
        </Flex>
      </Box>
    </>
  );
}
