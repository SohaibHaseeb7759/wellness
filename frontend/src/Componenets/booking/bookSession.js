import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  useToast,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  useDisclosure,
} from "@chakra-ui/react";

const BookSession = () => {
  const [expertId, setExpertId] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = sessionStorage.getItem("token");

    try {
      const response = await axios.post(
        "http://localhost:5000/api/book/book",
        { expertId, date, startTime, endTime },
        {
          headers: {
            "x-auth-token": token,
          },
        }
      );
      console.log("Booking confirmed:", response.data);
      toast({
        title: "Session booked.",
        description: "Your session has been successfully booked.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      onClose();
    } catch (error) {
      console.error(
        "Error booking session:",
        error.response?.data || error.message
      );
      toast({
        title: "Booking failed.",
        description: "There was an error booking your session.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <button className="button" colorScheme="green" onClick={onOpen}>
        Book Session
      </button>
      <Drawer isOpen={isOpen} placement="bottom" onClose={onClose} size={"md"}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">Book a Session</DrawerHeader>

          <DrawerBody>
            <Box p={4}>
              <form onSubmit={handleSubmit}>
                <Stack spacing={4}>
                  <FormControl isRequired>
                    <FormLabel htmlFor="expertId">Expert ID</FormLabel>
                    <Input
                      id="expertId"
                      type="text"
                      placeholder="Enter expert ID"
                      value={expertId}
                      onChange={(e) => setExpertId(e.target.value)}
                    />
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel htmlFor="date">Date</FormLabel>
                    <Input
                      id="date"
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                    />
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel htmlFor="startTime">Start Time</FormLabel>
                    <Input
                      id="startTime"
                      type="time"
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                    />
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel htmlFor="endTime">End Time</FormLabel>
                    <Input
                      id="endTime"
                      type="time"
                      value={endTime}
                      onChange={(e) => setEndTime(e.target.value)}
                    />
                  </FormControl>

                  <Button colorScheme="green" type="submit">
                    Book Session
                  </Button>
                </Stack>
              </form>
            </Box>
          </DrawerBody>

          <DrawerFooter borderTopWidth="1px">
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default BookSession;
