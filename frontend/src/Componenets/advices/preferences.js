import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { savePreferences } from "../../Reducers/profileSlice";
import {
  Button,
  FormControl,
  FormLabel,
  Stack,
  Box,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Select,
} from "@chakra-ui/react";

const PreferenceSettings = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile);
  const [categories, setCategories] = useState([]);
  const [focusAreas, setFocusAreas] = useState([]);

  useEffect(() => {
    if (profile && profile.preferences) {
      setCategories(profile.preferences.categories || []);
      setFocusAreas(profile.preferences.focusAreas || []);
    }
  }, [profile]);

  const categoryOptions = [
    "Health",
    "Fitness",
    "Nutrition",
    "Mental Well-being",
  ];
  const focusAreaOptions = [
    "Cardio",
    "Strength",
    "Flexibility",
    "Diet",
    "Stress Management",
  ];

  const handleCategoryChange = (index, value) => {
    const newCategories = [...categories];
    newCategories[index] = value;
    setCategories(newCategories);
  };

  const handleFocusAreaChange = (index, value) => {
    const newFocusAreas = [...focusAreas];
    newFocusAreas[index] = value;
    setFocusAreas(newFocusAreas);
  };

  const addCategory = () => setCategories([...categories, ""]);
  const addFocusArea = () => setFocusAreas([...focusAreas, ""]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(profile);
    if (profile) {
      dispatch(savePreferences(categories, focusAreas));
    }
    onClose();
  };

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <button onClick={onOpen} className="button">
        Add Preferences
      </button>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size={"md"}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px" fontSize="1.5rem">
            Update Advice Preferences
          </DrawerHeader>

          <DrawerBody>
            <form onSubmit={handleSubmit}>
              <Stack spacing="24px">
                <Box>
                  <FormControl>
                    <FormLabel fontSize="1.2rem">Categories</FormLabel>
                    {categories.map((category, index) => (
                      <Select
                        key={index}
                        placeholder="Select category"
                        value={category}
                        onChange={(e) =>
                          handleCategoryChange(index, e.target.value)
                        }
                        mb={2}
                        fontSize="1rem"
                      >
                        {categoryOptions.map((option, i) => (
                          <option
                            key={i}
                            value={option}
                            style={{
                              fontSize: "1rem",
                              backgroundColor: "black",
                              color: "white",
                            }}
                          >
                            {option}
                          </option>
                        ))}
                      </Select>
                    ))}
                    <Button
                      type="button"
                      onClick={addCategory}
                      mt={2}
                      fontSize="1rem"
                    >
                      Add Category
                    </Button>
                  </FormControl>
                </Box>
                <Box>
                  <FormControl>
                    <FormLabel fontSize="1.2rem">Focus Areas</FormLabel>
                    {focusAreas.map((focusArea, index) => (
                      <Select
                        key={index}
                        placeholder="Select focus area"
                        value={focusArea}
                        onChange={(e) =>
                          handleFocusAreaChange(index, e.target.value)
                        }
                        mb={2}
                        fontSize="1rem"
                      >
                        {focusAreaOptions.map((option, i) => (
                          <option
                            key={i}
                            value={option}
                            style={{
                              fontSize: "1rem",
                              backgroundColor: "black",
                              color: "white",
                            }}
                          >
                            {option}
                          </option>
                        ))}
                      </Select>
                    ))}
                    <Button
                      type="button"
                      onClick={addFocusArea}
                      mt={2}
                      fontSize="1rem"
                    >
                      Add Focus Area
                    </Button>
                  </FormControl>
                </Box>
              </Stack>
              <DrawerFooter borderTopWidth="1px">
                <Button
                  variant="outline"
                  mr={3}
                  onClick={onClose}
                  fontSize="1rem"
                >
                  Cancel
                </Button>
                <Button type="submit" fontSize="1rem">
                  Submit
                </Button>
              </DrawerFooter>
            </form>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default PreferenceSettings;
