import { Stack } from "@chakra-ui/react";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Pane } from "@/components/Pane";

export function App() {
  return (
    <Stack minH="100vh">
      <Header />
      <Pane />
      <Footer />
    </Stack>
  );
}
