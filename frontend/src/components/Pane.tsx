import { Box, Flex, HStack, useBreakpointValue } from "@chakra-ui/react";
import { DialectListbox } from "@/components/DialectListbox";
import { ReadSqlArea } from "@/components/ReadSqlArea";
import { WriteSqlArea } from "@/components/WriteSqlArea";
import { dialects } from "@/constants/dialects";
import { useSqlTranspiler } from "@/hooks/useSqlTranspiler";

export function Pane() {
  const {
    sql,
    setSql,
    read,
    setRead,
    write,
    setWrite,
    loading,
    transpiledSql,
    error,
  } = useSqlTranspiler({
    defaultRead: dialects.MySQL,
    defaultWrite: dialects.PostgreSQL,
  });

  const maxW = {
    base: "100%",
    sm: "100%",
    md: "100%",
    lg: "40%",
    xl: "40%",
  };

  const hidden = useBreakpointValue({
    base: !transpiledSql,
    sm: !transpiledSql,
    md: !transpiledSql,
    lg: false,
    xl: false,
  });

  return (
    <Box p="4" w="100%" maxW="1200px" flex="1" alignSelf="center">
      <HStack
        justify={{ base: "center", lg: "space-around" }}
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
        <ReadSqlArea sql={sql} error={error} onSqlChange={setSql} maxW={maxW} />

        <WriteSqlArea
          sql={transpiledSql}
          loading={loading}
          maxW={maxW}
          hidden={hidden}
        />
      </Flex>
    </Box>
  );
}
