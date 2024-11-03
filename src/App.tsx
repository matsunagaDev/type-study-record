import './App.css';
import { Button, ChakraProvider, defaultSystem } from '@chakra-ui/react';

export const App = () => {
  return (
    <ChakraProvider value={defaultSystem}>
      <h1>Home</h1>
      <Button colorScheme="teal">ボタン</Button>
    </ChakraProvider>
  );
};
