import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateProgress } from "../../Reducers/progressSlice";
import {
  Box,
  Button,
  FormLabel,
  Input,
  Stack,
  Textarea,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
} from "@chakra-ui/react";

const UpdateAdvice = () => {
  const [metrics, setMetrics] = useState({});
  const [achievements, setAchievements] = useState([
    { title: "", description: "", date: "" },
  ]);
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleMetricChange = (e) => {
    const { name, value } = e.target;
    setMetrics((prevMetrics) => ({
      ...prevMetrics,
      [name]: value,
    }));
  };

  const handleAchievementChange = (index, e) => {
    const { name, value } = e.target;
    setAchievements((prevAchievements) => {
      const newAchievements = [...prevAchievements];
      newAchievements[index][name] = value;
      return newAchievements;
    });
  };

  const addAchievement = () => {
    setAchievements((prevAchievements) => [
      ...prevAchievements,
      { title: "", description: "", date: "" },
    ]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProgress(metrics, achievements));
    onClose(); // Close the drawer after submission
  };

  return (
    <>
      <button className="button" colorScheme="teal" onClick={onOpen}>
        Update Progress
      </button>
      <Drawer isOpen={isOpen} placement="left" onClose={onClose} size={"md"}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px" style={{ fontSize: "1.5rem" }}>
            Update Your Progress
          </DrawerHeader>

          <DrawerBody>
            <Stack spacing="24px">
              <Box>
                <FormLabel htmlFor="steps" style={{ fontSize: "1.2rem" }}>
                  Steps
                </FormLabel>
                <Input
                  type="number"
                  id="steps"
                  name="steps"
                  placeholder="Steps"
                  onChange={handleMetricChange}
                />
              </Box>
              <Box>
                <FormLabel
                  htmlFor="caloriesBurned"
                  style={{ fontSize: "1.2rem" }}
                >
                  Calories Burned
                </FormLabel>
                <Input
                  type="number"
                  id="caloriesBurned"
                  name="caloriesBurned"
                  placeholder="Calories Burned"
                  onChange={handleMetricChange}
                />
              </Box>

              <Box>
                <FormLabel
                  htmlFor="achievements"
                  style={{ fontSize: "1.3rem" }}
                >
                  Achievements
                </FormLabel>
                {achievements.map((achievement, index) => (
                  <Box key={index} mb="4">
                    <FormLabel
                      htmlFor={`title-${index}`}
                      style={{ fontSize: "1.2rem" }}
                    >
                      Title
                    </FormLabel>
                    <Input
                      id={`title-${index}`}
                      name="title"
                      placeholder="Title"
                      value={achievement.title}
                      onChange={(e) => handleAchievementChange(index, e)}
                    />
                    <FormLabel
                      htmlFor={`description-${index}`}
                      mt="2"
                      style={{ fontSize: "1.2rem" }}
                    >
                      Description
                    </FormLabel>
                    <Input
                      id={`description-${index}`}
                      name="description"
                      placeholder="Description"
                      value={achievement.description}
                      onChange={(e) => handleAchievementChange(index, e)}
                    />
                    <FormLabel
                      htmlFor={`date-${index}`}
                      mt="2"
                      style={{ fontSize: "1.2rem" }}
                    >
                      Date
                    </FormLabel>
                    <Input
                      type="date"
                      id={`date-${index}`}
                      name="date"
                      value={achievement.date}
                      onChange={(e) => handleAchievementChange(index, e)}
                    />
                  </Box>
                ))}
                <Button
                  type="button"
                  onClick={addAchievement}
                  style={{ fontSize: "1.2rem" }}
                >
                  Add Achievement
                </Button>
              </Box>
            </Stack>
          </DrawerBody>

          <DrawerFooter borderTopWidth="1px">
            <Button
              variant="outline"
              mr={3}
              onClick={onClose}
              style={{ fontSize: "1.2rem" }}
            >
              Cancel
            </Button>
            <Button
              colorScheme="green"
              onClick={handleSubmit}
              style={{ fontSize: "1.2rem" }}
            >
              Update Progress
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default UpdateAdvice;
