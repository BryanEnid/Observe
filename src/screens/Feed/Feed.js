import { ScrollView } from "native-base";
import React from "react";
import { Question } from "./Posts/Question";
import { TopMenu } from "./TopMenu";

export const Feed = () => {
  return (
    <>
      <ScrollView flex={1}>
        <TopMenu />
        <Question />
        <Question />
        <Question />
        <Question />
        <Question />
        <Question />
        <Question />
        <Question />
        <Question />
        <Question />
      </ScrollView>
    </>
  );
};
