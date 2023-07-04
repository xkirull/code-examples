import * as React from "react";
import { ChakraProvider, Box, theme, ColorModeScript } from "@chakra-ui/react";
import TodoList from "./components/TodoList";
import TodoAdd from "./components/TodoAdd";
import { ColorModeSwitcher } from "./components/ColorModeSwitcher";
import { loadTodoList } from "./store";

export function App() {
  React.useEffect(() => { loadTodoList() }, []);

  return (
    <>
      <ColorModeScript />
      <ChakraProvider theme={theme}>
        <ColorModeSwitcher />
        <Box maxWidth="8xl" marginTop={28} margin="auto" p={10}>
          <TodoList />
          <TodoAdd />
        </Box>
      </ChakraProvider>
    </>
  );
}
