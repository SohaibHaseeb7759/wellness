import React, { useState, useEffect } from "react";
import {
  Button,
  Box,
  Input,
  Stack,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  FormLabel,
  Select,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import "../../CSS/Profile/updateProfile.css";

function DrawerExample() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const firstField = React.useRef();

  const profileFromStore = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    age: "",
    gender: "",
    wellnessGoals: "",
    healthCondition: "",
    achievements: [{ title: "", description: "", date: "" }],
    profilePicture: null,
  });

  useEffect(() => {
    if (profileFromStore) {
      setProfile(profileFromStore);
    }
  }, [profileFromStore]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setProfile((prevProfile) => ({
      ...prevProfile,
      profilePicture: e.target.files[0],
    }));
  };

  const handleAchievementChange = (index, e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => {
      const newAchievements = [...prevProfile.achievements];
      newAchievements[index][name] = value;
      return { ...prevProfile, achievements: newAchievements };
    });
  };

  const addAchievement = () => {
    setProfile((prevProfile) => ({
      ...prevProfile,
      achievements: [
        ...prevProfile.achievements,
        { title: "", description: "", date: "" },
      ],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(profile).forEach((key) => {
      if (key === "achievements") {
        formData.append(key, JSON.stringify(profile[key]));
      } else if (key === "profilePicture") {
        formData.append(key, profile[key]);
      } else {
        formData.append(key, profile[key]);
      }
    });
    const token = sessionStorage.getItem("token");

    try {
      const response = await axios.put(
        "http://localhost:5000/api/profiles/update",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "x-auth-token": token,
          },
        }
      );
      console.log("Profile updated:", response.data);
      onClose();
    } catch (error) {
      console.error("Error updating profile:", error.response.data);
    }
  };

  return (
    <>
      <button className="update_btn " onClick={onOpen}>
        Update Profile
      </button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        initialFocusRef={firstField}
        onClose={onClose}
        size={"lg"}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">Update Profile</DrawerHeader>

          <DrawerBody>
            <Stack spacing="24px">
              <Box>
                <FormLabel htmlFor="firstName">First Name</FormLabel>
                <Input
                  ref={firstField}
                  id="firstName"
                  name="firstName"
                  placeholder="Please enter your first name"
                  value={profile.firstName}
                  onChange={handleChange}
                />
              </Box>

              <Box>
                <FormLabel htmlFor="lastName">Last Name</FormLabel>
                <Input
                  id="lastName"
                  name="lastName"
                  placeholder="Please enter your last name"
                  value={profile.lastName}
                  onChange={handleChange}
                />
              </Box>

              <Box>
                <FormLabel htmlFor="age">Age</FormLabel>
                <Input
                  type="number"
                  id="age"
                  name="age"
                  placeholder="Please enter your age"
                  value={profile.age}
                  onChange={handleChange}
                />
              </Box>

              <Box>
                <FormLabel htmlFor="gender">Gender</FormLabel>
                <Input
                  id="gender"
                  name="gender"
                  placeholder="Please enter your gender"
                  value={profile.gender}
                  onChange={handleChange}
                />
              </Box>

              <Box>
                <FormLabel htmlFor="wellnessGoals">Wellness Goals</FormLabel>
                <Input
                  id="wellnessGoals"
                  name="wellnessGoals"
                  placeholder="Please enter your wellness goals"
                  value={profile.wellnessGoals}
                  onChange={handleChange}
                />
              </Box>

              <Box>
                <FormLabel htmlFor="healthCondition">
                  Health Condition
                </FormLabel>
                <Input
                  id="healthCondition"
                  name="healthCondition"
                  placeholder="Please enter your health condition"
                  value={profile.healthCondition}
                  onChange={handleChange}
                />
              </Box>

              <Box>
                <FormLabel>Achievements:</FormLabel>
                {profile.achievements.map((achievement, index) => (
                  <Box key={index} mb={3}>
                    <Input
                      type="text"
                      name="title"
                      placeholder="Title"
                      value={achievement.title}
                      onChange={(e) => handleAchievementChange(index, e)}
                      mb={2}
                    />
                    <Input
                      type="text"
                      name="description"
                      placeholder="Description"
                      value={achievement.description}
                      onChange={(e) => handleAchievementChange(index, e)}
                      mb={2}
                    />
                    <Input
                      type="date"
                      name="date"
                      value={achievement.date}
                      onChange={(e) => handleAchievementChange(index, e)}
                    />
                  </Box>
                ))}
                <Button colorScheme="teal" onClick={addAchievement}>
                  Add Achievement
                </Button>
              </Box>

              <Box>
                <FormLabel htmlFor="profilePicture">Profile Picture</FormLabel>
                <Input
                  type="file"
                  id="profilePicture"
                  name="profilePicture"
                  onChange={handleFileChange}
                />
              </Box>
            </Stack>
          </DrawerBody>

          <DrawerFooter borderTopWidth="1px">
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="green" onClick={handleSubmit}>
              Update Profile
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default DrawerExample;
