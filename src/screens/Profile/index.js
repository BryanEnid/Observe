// import ConicalGradient from '../../components/ConicalGradient/ConicalGradient';
import React, { useEffect, useState } from "react";
import { useWindowDimensions, StatusBar } from "react-native";
import { Box, Spinner } from "native-base";

import { Loading } from "../../components/Loading";
import dimensions from "./dimensions";
import Navbar from "./Components/Navbar";
import Header from "./Components/Header";
import MyModal from "./Components/Modal";
import UserSection from "./Components/UserSection/UserSection";
import SubScreenSection from "./Components/SubScreenSection";

import { useRandomUsers } from "../../hooks/query/useRandomUsers";
import useProfileAnimations from "./hooks/useProfileAnimations";
import useGetStyles from "./hooks/useGetStyles";
import { useUser } from "../../hooks/useUser";

export const Profile = () => {
  // Hooks
  const { data: profile } = useRandomUsers({
    select: ({ results }) => ({
      ...results[0],
      quote: "Seagulls are the eagles of the sea.",
    }),
    key: ["user", { amount: 1 }],
  });

  const { pictureUrl, setPictureUrl } = useUser();
  const [isLoading, setIsloading] = useState(false);

  const { width, height } = useWindowDimensions();
  const styles = useGetStyles({ width });
  const [updatePicModalOpen, setUpdatePicModalOpen] = useState(false);
  const animations = useProfileAnimations({ width });

  if (!profile?.name) return <></>;

  return (
    <>
      <MyModal
        updatePicModalOpen={updatePicModalOpen}
        setUpdatePicModalOpen={setUpdatePicModalOpen}
        profile={profile}
        styles={styles}
        userPicture={pictureUrl}
        setPictureUrl={setPictureUrl}
        setIsloading={setIsloading}
      />
      <Box overflowX={"hidden"} flex={1} backgroundColor="white">
        <StatusBar barStyle={"dark-content"} />

        {/* User */}
        <UserSection styles={styles} profile={profile} {...animations} />

        {/* Navbar */}
        <Navbar width={width} styles={styles} {...animations} />

        {/* RENDER SUB SCREENS */}
        <SubScreenSection height={height} width={width} {...animations} />

        {/* Profile */}
        {/* This is at the end so the "on" events triggers */}
        <Header
          styles={styles}
          profile={profile}
          userPicture={pictureUrl}
          {...animations}
          setUpdatePicModalOpen={setUpdatePicModalOpen}
        />
      </Box>
      {isLoading && <Loading />}
    </>
  );
};
