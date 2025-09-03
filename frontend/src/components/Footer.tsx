import { Link, Text } from "@chakra-ui/react";

declare const VITE_APP_VERSION: string;

export function Footer() {
  return (
    <Text w="100%" textAlign="center" position="fixed" bottom="16px">
      {`version ${VITE_APP_VERSION}, powered by `}
      <Link
        href="https://sqlglot.com/sqlglot.html"
        color="blue.500"
        target="_blank"
      >
        SQLGlot
      </Link>
    </Text>
  );
}
