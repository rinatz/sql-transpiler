import { useState, useRef } from "react";
import {
  Listbox,
  Button,
  Popover,
  Portal,
  useFilter,
  useListCollection,
  useListbox,
  HStack,
  Box,
} from "@chakra-ui/react";
import { LuChevronDown } from "react-icons/lu";
import { dialects } from "@/constants/dialects";

export type DialectListboxProps = {
  name?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
};

export function DialectListbox({
  name,
  defaultValue,
  onValueChange,
}: DialectListboxProps) {
  const [inputValue, setInputValue] = useState("");
  const [open, setOpen] = useState(false);

  const { contains } = useFilter({ sensitivity: "base" });
  const triggerRef = useRef<HTMLButtonElement>(null);

  const { collection, filter } = useListCollection({
    initialItems: Object.entries(dialects).map(([label, value]) => ({
      label,
      value,
    })),
    filter: contains,
  });

  const listbox = useListbox({
    collection,
    onValueChange(e) {
      onValueChange?.(e.value[0]);
      setOpen(false);
      setInputValueFn("");
      triggerRef.current?.focus();
    },
    defaultValue: defaultValue ? [defaultValue] : [],
  });

  const setInputValueFn = (value: string) => {
    setInputValue(value);
    filter(value);
  };

  const selectedItem = listbox.selectedItems[0];

  return (
    <Popover.Root open={open} onOpenChange={(e) => setOpen(e.open)}>
      <Popover.Trigger asChild>
        <Button size="sm" ref={triggerRef} variant="outline" w="140px">
          <HStack justify="space-between" w="100%">
            <Box>{selectedItem ? selectedItem.label : "Select dialect"}</Box>
            <LuChevronDown />
          </HStack>
        </Button>
      </Popover.Trigger>

      <Portal>
        <Popover.Positioner>
          <Popover.Content _closed={{ animation: "none" }}>
            <Popover.Body p="0">
              <Listbox.RootProvider value={listbox} gap="0" overflow="hidden">
                <Listbox.Input
                  name={name}
                  minH="10"
                  px="3"
                  roundedTop="l2"
                  bg="transparent"
                  outline="0"
                  value={inputValue}
                  onChange={(e) => setInputValueFn(e.currentTarget.value)}
                />
                <Listbox.Content
                  borderWidth="0"
                  borderTopWidth="1px"
                  roundedTop="0"
                  gap="0"
                >
                  {collection.items.map((item) => (
                    <Listbox.Item item={item} key={item.value} id={item.value}>
                      <Listbox.ItemText>{item.label}</Listbox.ItemText>
                      <Listbox.ItemIndicator />
                    </Listbox.Item>
                  ))}
                </Listbox.Content>
              </Listbox.RootProvider>
            </Popover.Body>
          </Popover.Content>
        </Popover.Positioner>
      </Portal>
    </Popover.Root>
  );
}
