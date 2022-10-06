import { useNavigationState } from "@react-navigation/native";

export const useRouteName = () => {
  const routeName = useNavigationState(
    (state) => state.routes[state.index].name
  );

  return { routeName };
};
