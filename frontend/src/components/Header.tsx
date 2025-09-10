import { Heading, HStack, Separator } from "@chakra-ui/react";
import { ColorModeButton } from "@/components/ui/color-mode";

export function Header() {
  return (
    <>
      <HStack justify="space-between" py="4" px="8">
        <Heading size="2xl" pb="1">
          SQL Transpiler
        </Heading>
        <ColorModeButton />
      </HStack>

      <Separator variant="solid" mb="8" />
    </>
  );
}
