import * as React from "react";
import { Button, Input, Flex, Checkbox, Heading, Box } from "@chakra-ui/react";
import { useStore } from "effector-react";

import $store, { update, toggle, remove, TodoListStore } from "../store";

function TodoListItems(): JSX.Element {
  const store = useStore<TodoListStore>($store);

  return (
    <>
      {store.todos.map((todo) => (
        <Flex pt={2} key={todo.id}>
          <Checkbox checked={todo.status} onClick={() => toggle(todo.id)} />
          <Input
            mx={2}
            value={todo.text}
            onChange={(event) => update({ id: todo.id, text: event.target.value })}
          />
          <Button onClick={() => remove(todo.id)}>x</Button>
        </Flex>
      ))}
    </>
  );
}

export default function TodoList(): JSX.Element {
  return (
    <>
      <Box marginBottom={6}>
        <Heading marginBottom={6}>Todo List</Heading>
        <TodoListItems />
      </Box>
    </>
  );
}
