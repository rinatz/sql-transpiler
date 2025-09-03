import {
  Box,
  Flex,
  Heading,
  HStack,
  Separator,
  useBreakpointValue,
} from "@chakra-ui/react";
import { ColorModeButton } from "@/components/ui/color-mode";
import { DialectListbox } from "@/components/DialectListbox";
import { dialects } from "@/constants/dialects";
import { useSqlTranspiler } from "@/hooks/useSqlTranspiler";
import { ReadSqlArea } from "./components/ReadSqlArea";
import { WriteSqlArea } from "./components/WriteSqlArea";

export function App() {
  const {
    sql,
    setSql,
    read,
    setRead,
    write,
    setWrite,
    isLoading,
    transpiledSql,
    error,
  } = useSqlTranspiler({
    defaultRead: dialects.MySQL,
    defaultWrite: dialects.PostgreSQL,
  });

  const isBaseBreakpoint = useBreakpointValue({ base: true, md: false });

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
        <HStack
          justify={{ base: "center", md: "space-around" }}
          gap="8"
          mb="12px"
        >
          <DialectListbox
            name="read"
            defaultValue={read}
            onValueChange={setRead}
          />
          <DialectListbox
            name="write"
            defaultValue={write}
            onValueChange={setWrite}
          />
        </HStack>

        <Flex justify="space-around" wrap="wrap" gap="8">
          <ReadSqlArea
            sql={sql}
            error={error}
            onSqlChange={setSql}
            maxW={{ md: "40%" }}
          />

          {(!isBaseBreakpoint || (isBaseBreakpoint && transpiledSql)) && (
            <WriteSqlArea
              sql={transpiledSql}
              isLoading={isLoading}
              maxW={{ md: "40%" }}
            />
          )}
        </Flex>
      </Box>
    </>
  );
}
