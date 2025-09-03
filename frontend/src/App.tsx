import {
  Box,
  Flex,
  Heading,
  HStack,
  Separator,
  VStack,
} from "@chakra-ui/react";
import { ColorModeButton } from "@/components/ui/color-mode";
import { DialectListbox } from "@/components/DialectListbox";
import { dialects } from "@/constants/dialects";
import { useSqlTranspiler } from "@/hooks/useSqlTranspiler";
import { ReadSqlArea } from "./components/ReadSqlArea";
import { WriteSqlArea } from "./components/WriteSqlArea";

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
          <VStack flexBasis="50%" gap="4">
            <DialectListbox
              name="read"
              defaultValue={read}
              onValueChange={setRead}
            />

            <ReadSqlArea sql={sql} error={error} onSqlChange={setSql} />
          </VStack>

          <VStack flexBasis="50%" gap="4">
            <DialectListbox
              name="write"
              defaultValue={write}
              onValueChange={setWrite}
            />

            <WriteSqlArea sql={transpiledSql} />
          </VStack>{" "}
        </Flex>
      </Box>
    </>
  );
}
