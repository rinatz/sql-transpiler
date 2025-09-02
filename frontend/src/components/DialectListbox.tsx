import { useState, useRef } from "react";
import {
  Listbox,
  Button,
  Popover,
  Portal,
  useFilter,
  useListCollection,
  useListbox,
} from "@chakra-ui/react";
import { LuChevronDown } from "react-icons/lu";

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
    initialItems: [
      { label: "Athena", value: "athena" },
      { label: "BigQuery", value: "bigquery" },
      { label: "ClickHouse", value: "clickhouse" },
      { label: "Databricks", value: "databricks" },
      { label: "Doris", value: "doris" },
      { label: "Dremio", value: "dremio" },
      { label: "Drill", value: "drill" },
      { label: "Druid", value: "druid" },
      { label: "DuckDB", value: "duckdb" },
      { label: "Dune", value: "dune" },
      { label: "Exasol", value: "exasol" },
      { label: "Fabric", value: "fabric" },
      { label: "Hive", value: "hive" },
      { label: "Materialize", value: "materialize" },
      { label: "MySQL", value: "mysql" },
      { label: "Oracle", value: "oracle" },
      { label: "PostgreSQL", value: "postgres" },
      { label: "Presto", value: "presto" },
      { label: "PRQL", value: "prql" },
      { label: "Redshift", value: "redshift" },
      { label: "RisingWave", value: "risingwave" },
      { label: "SingleStore", value: "singlestore" },
      { label: "Snowflake", value: "snowflake" },
      { label: "Spark", value: "spark" },
      { label: "Spark2", value: "spark2" },
      { label: "SQLite", value: "sqlite" },
      { label: "StarRocks", value: "starrocks" },
      { label: "Tableau", value: "tableau" },
      { label: "Teradata", value: "teradata" },
      { label: "Trino", value: "trino" },
      { label: "TSQL", value: "tsql" },
    ],
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
        <Button size="sm" ref={triggerRef} variant="outline">
          {selectedItem ? selectedItem.label : "Select dialect"}{" "}
          <LuChevronDown />
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
