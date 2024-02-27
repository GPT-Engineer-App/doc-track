import React, { useState } from "react";
import { ChakraProvider, Box, VStack, HStack, Heading, Text, FormControl, FormLabel, Input, Button, Textarea, List, ListItem, ListIcon, IconButton, useToast } from "@chakra-ui/react";
import { FaStethoscope, FaUserMd, FaRegTrashAlt, FaRegEdit, FaSignInAlt, FaSave } from "react-icons/fa";

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [note, setNote] = useState("");
  const toast = useToast();

  const handleLogin = () => {
    // TODO: Validate credentials against a back-end service
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername("");
    setPassword("");
    setAppointments([]);
    setSelectedAppointment(null);
    setNote("");
  };

  const addAppointment = () => {
    const newAppointment = { id: Date.now(), doctorName: "", notes: "" };
    setAppointments([...appointments, newAppointment]);
    setSelectedAppointment(newAppointment);
  };

  const deleteAppointment = (appointmentId) => {
    const updatedAppointments = appointments.filter((appointment) => appointment.id !== appointmentId);
    setAppointments(updatedAppointments);
  };

  const saveNote = () => {
    const updatedAppointments = appointments.map((appointment) => {
      if (appointment.id === selectedAppointment.id) {
        return { ...appointment, notes: note };
      }
      return appointment;
    });
    setAppointments(updatedAppointments);
    toast({
      title: "Note saved.",
      description: "We've saved your note for this doctor.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const selectAppointment = (appointment) => {
    setSelectedAppointment(appointment);
    setNote(appointment.notes);
  };

  return (
    <ChakraProvider>
      <Box p={5}>
        <VStack spacing={4}>
          {!isLoggedIn ? (
            <VStack as="form" spacing={4} onSubmit={handleLogin}>
              <Heading>Doctor's Appointment Tracker</Heading>
              <FormControl id="username" isRequired>
                <FormLabel>Username</FormLabel>
                <Input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
              </FormControl>
              <Button leftIcon={<FaSignInAlt />} colorScheme="teal" onClick={handleLogin}>
                Login
              </Button>
            </VStack>
          ) : (
            <>
              <HStack justifyContent="space-between" width="full">
                <Heading>Appointments</Heading>
                <Button leftIcon={<FaStethoscope />} colorScheme="teal" onClick={addAppointment}>
                  Add Appointment
                </Button>
              </HStack>
              <List spacing={3} width="full">
                {appointments.map((appointment) => (
                  <ListItem key={appointment.id} p={2} shadow="md">
                    <HStack justifyContent="space-between">
                      <Text fontWeight="bold">
                        <ListIcon as={FaUserMd} color="green.500" />
                        {appointment.doctorName || "New Appointment"}
                      </Text>
                      <HStack>
                        <IconButton icon={<FaRegEdit />} variant="ghost" onClick={() => selectAppointment(appointment)} />
                        <IconButton icon={<FaRegTrashAlt />} variant="ghost" onClick={() => deleteAppointment(appointment.id)} />
                      </HStack>
                    </HStack>
                  </ListItem>
                ))}
              </List>
              {selectedAppointment && (
                <VStack align="start" spacing={3}>
                  <Heading size="md">Notes</Heading>
                  <Textarea placeholder="Enter notes about the doctor or appointment" value={note} onChange={(e) => setNote(e.target.value)} />
                  <Button leftIcon={<FaSave />} colorScheme="green" onClick={saveNote}>
                    Save Note
                  </Button>
                </VStack>
              )}
              <Button colorScheme="red" onClick={handleLogout}>
                Logout
              </Button>
            </>
          )}
        </VStack>
      </Box>
    </ChakraProvider>
  );
};

export default Index;
