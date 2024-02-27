import { Box, Flex, Text, Link } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

function NavBar() {
  return (
    <Flex as="nav" align="center" justify="space-between" wrap="wrap" padding="1.5rem" bg="teal.500" color="white">
      <Flex align="center" mr={5}>
        <Text fontSize="lg" fontWeight="bold">
          DocTrail
        </Text>
      </Flex>

      <Box display="flex" width="auto" alignItems="center">
        <Link as={RouterLink} to="/appointments" px="3">
          Appointments
        </Link>
        <Link as={RouterLink} to="/doctors" px="3">
          Doctors
        </Link>
        <Link as={RouterLink} to="/map" px="3">
          Map
        </Link>
      </Box>
    </Flex>
  );
}

export default NavBar;
