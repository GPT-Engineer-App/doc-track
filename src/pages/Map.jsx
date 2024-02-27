import { Box, Text, VStack } from "@chakra-ui/react";

function Map() {
  return (
    <VStack spacing={4} p={5} align="center">
      <Text fontSize="2xl" fontWeight="bold">
        Google Map
      </Text>
      <Box p={10} bg="gray.200" w="100%" h="400px" borderRadius="md">
        <Text>Google Map would go here</Text>
        <Text fontSize="sm">Displaying current location</Text>
      </Box>
    </VStack>
  );
}

export default Map;
